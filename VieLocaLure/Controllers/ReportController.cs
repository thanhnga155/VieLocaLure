using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VieLocaLure.Data;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using VieLocaLure.Models;
using System.Net.Mail;
using System.Net;

namespace VieLocaLure.Controllers
{
    [Route("api/report")]
    [ApiController]
    public class ReportController : ControllerBase
    {
        private readonly VieLocaLureDB _db;

        public ReportController(VieLocaLureDB db)
        {
            _db = db;

        }
        [HttpGet("/activity/customer")]
        public IActionResult GetCustomer()
        {
            var listuser = _db.accounts.ToList();

            return Ok(listuser);
        }
        [HttpGet("/booking")]
        public async Task<ActionResult<IEnumerable<Booking>>> GetBookings(int accountId)
        {
            var bookings = await _db.invoiceDetails
                .Include(d => d.Account)
                .Include(t => t.Tour)
                .ThenInclude(td => td.TourDetail)
                .Where(d => d.AccountId == accountId) // Filter by AccountId
                .Select(d => new Booking
                {
                    username = d.Account.username,
                    tourId = d.TourId,
                    paymentMethod = d.payment_method,
                    numAdult = d.count_adult,
                    numChildren = d.count_child,
                    numInfant = d.count_infant,
                    totalPrice = d.Tour.TourDetail.FirstOrDefault().adultPrice * d.count_adult +
                                 d.Tour.TourDetail.FirstOrDefault().childPrice * d.count_child +
                                 d.Tour.TourDetail.FirstOrDefault().infantPrice * d.count_infant
                })
                .ToListAsync();

            return Ok(bookings);
        }
        //POST: api/booking
        [HttpPost]
        public async Task<ActionResult<Object>> AddBooking(InvoiceDetail booking)
        {
             EmailSender.Address = "vielocalure@gmail.com";
             EmailSender.Password = "siur bjxy etyh groa";

             EmailSender email = new EmailSender();
             email.Send("ngacuongnamom@gmail.com", "Confirmation of Your Tour Booking and Payment", "Dear Thanh Nga,\r\n\r\nWe are thrilled to confirm your booking for the Visit of the Mekong 3 days from Ho Chi Minh with us! Your adventure awaits, and we can't wait to share it with you.\r\n\r\nHere are the details of your booking to confirm:\r\n\r\nTour Name: Visit of the Mekong 2 days from Ho Chi Minh\r\nDate: 03/05/2024\r\nDuration: 2 days 1 night\r\nNumber of Guests: 4 (3 adults, 1 child)\r\nTotal Amount: $72.25\r\n\r\nPayment Method: Credit Card\r\n\r\nTo ensure a seamless experience, we've attached a QR code to this email. Simply scan the QR code with your smartphone camera to verify your payment details securely.\r\n\r\n[Image](/Uploads/image.png)\r\n\r\nPlease note that your booking is confirmed only upon successful payment. If you encounter any issues or have questions regarding your booking, feel free to reach out to our customer support team via hotline 1900 1909\r\n\r\nWe're looking forward to welcoming you on board for an unforgettable experience. Should you require any further assistance or have specific preferences for your tour, please don't hesitate to contact us.\r\n\r\nThank you for choosing VieLocaLure for your adventure. We can't wait to create lasting memories with you!\r\n\r\nBest regards,\r\nVieLocaLure");
 
            _db.invoiceDetails.Add(booking);
            await _db.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBookingsAll), new { id = booking.Id }, booking);
        }
        [HttpGet("/report/bookings/tour")]
        public async Task<ActionResult<IEnumerable<Booking>>> GetBookingsAll()
        {
            var bookings = await _db.invoiceDetails
                .Include(d => d.Account)
                .Include(t => t.Tour)
                .ThenInclude(td => td.TourDetail)
                .Select(d => new Booking
                {
                    username = d.Account.username,
                    tourId = d.TourId,
                    paymentMethod = d.payment_method,
                    numAdult = d.count_adult,
                    numChildren = d.count_child,
                    numInfant = d.count_infant,
                    totalPrice = d.Tour.TourDetail.FirstOrDefault().adultPrice * d.count_adult +
                                 d.Tour.TourDetail.FirstOrDefault().childPrice * d.count_child +
                                 d.Tour.TourDetail.FirstOrDefault().infantPrice * d.count_infant
                })
                .ToListAsync();

            return Ok(bookings);
        }



        [HttpGet("/report/bookings/customer")]
        public IActionResult getProfit([FromQuery] string? options, DateTime? startDate, DateTime? endDate)
        {
            if (options == "week")
            {
                DateTime today = DateTime.Today;
                int diff = today.DayOfWeek - DayOfWeek.Sunday;
                startDate = today.AddDays(-diff);
                endDate = startDate?.AddDays(6);
            }
            if (options == "month")
            {
                startDate = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);
                endDate = startDate?.AddMonths(1).AddDays(-1);
            }
            if (options == "year")
            {
                startDate = new DateTime(DateTime.Now.Year, 1, 1);
                endDate = new DateTime(DateTime.Now.Year, 12, 31);
            }

            var allDates = Enumerable.Range(0, (endDate.Value - startDate.Value).Days + 1)
                           .Select(offset => startDate.Value.AddDays(offset))
                           .ToList();
            var groupedInvoices = _db.invoices
             .Where(i => i.createdOn >= startDate && i.createdOn <= endDate)
             .GroupBy(i => i.createdOn.Date)
             .Select(g => new
             {
                 timeline = g.Key,
                 bookings = g.Count(),
                 profit = g.Sum(i => i.amount)
             })
             .ToList();

            var result = allDates
               .GroupJoin(groupedInvoices,
                          date => date,
                          invoice => invoice.timeline,
                          (date, invoices) => new
                          {
                              timeline = date,
                              bookings = invoices.Sum(i => i.bookings),
                              profit = invoices.Sum(i => i.profit)
                          })
               .ToList();

            return Ok(result);

        }

        private string GetTimelineString(DateTime date, string option)
        {
            switch (option)
            {
                case "year":
                    return date.ToString("yyyy");
                case "month":
                    return date.ToString("MMMM yyyy", CultureInfo.InvariantCulture);
                case "day":
                    return date.ToString("yyyy-MM-dd");
                default:
                    throw new ArgumentException("Invalid option: " + option);
            }
        }
        private DateTime minDate()
        {
            return _db.invoices.Min(i => i.createdOn);
        }
        private DateTime maxDate()
        {
            return _db.invoices.Max(i => i.createdOn);
        }
        public class BookingReportData
        {
            public string timeline { get; set; }
            public int bookings { get; set; }
            public float profit { get; set; }
        }


        [HttpGet("/report/profit")]
        public IActionResult getProfit([FromQuery] string? options)
        {
            DateTime startDate = minDate();
            DateTime endDate = maxDate();

            if (options == "week")
            {
                DateTime today = DateTime.Today;
                int diff = today.DayOfWeek - DayOfWeek.Sunday;
                startDate = today.AddDays(-diff);
                endDate = startDate.AddDays(6);
            }
            if (options == "month")
            {
                startDate = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);
                endDate = startDate.AddMonths(1).AddDays(-1);
            }
            if (options == "year")
            {
                startDate = new DateTime(DateTime.Now.Year, 1, 1);
                endDate = new DateTime(DateTime.Now.Year, 12, 31);
            }

            var allDates = Enumerable.Range(0, (endDate - startDate).Days + 1)
                           .Select(offset => startDate.AddDays(offset))
                           .ToList();
            var groupedInvoices = _db.invoices
             .Where(i => i.createdOn >= startDate && i.createdOn <= endDate)
             .GroupBy(i => i.createdOn.Date)
             .Select(g => new
             {
                 timeline = g.Key,
                 bookings = g.Count(),
                 profit = g.Sum(i => i.amount)
             })
             .ToList();

            var result = allDates
               .GroupJoin(groupedInvoices,
                          date => date,
                          invoice => invoice.timeline,
                          (date, invoices) => new
                          {
                              timeline = GetTimelineString(date, options),
                              bookings = invoices.Sum(i => i.bookings),
                              profit = invoices.Sum(i => i.profit)
                          })
               .ToList();

            return Ok(result);

        }
        /*public IActionResult GetProfit([FromQuery] string option)
        {
            // Validate options (add logic for error handling)

            DateTime startDate, endDate;
            switch (option)
            {
                case "year":
                    startDate = new DateTime(DateTime.Now.Year, 1, 1);
                    endDate = new DateTime(DateTime.Now.Year, 12, 31);
                    break;
                case "month":
                    startDate = new DateTime(DateTime.Now.Year, DateTime.Now.Month, 1);
                    endDate = startDate.AddMonths(1).AddDays(-1);
                    break;
                case "day":
                    startDate = endDate = DateTime.Today;
                    break;
                default:
                    throw new ArgumentException("Invalid option: " + option);
            }

            var groupedInvoices = _db.invoices
                .Where(i => i.createdOn >= startDate && i.createdOn <= endDate)
                .Select(i => new
                {
                    revenue = i.amount, 
                })
                .ToList();

            var totalRevenue = groupedInvoices.Sum(i => i.revenue);
            var totalProfit = totalRevenue * 0.6;

            return Ok(new
            {
                timeline = GetTimelineString(startDate, option),
                revenue = totalRevenue,
                profit = totalProfit
            });
                
        }
*/



        //[Authorize]
        /*[HttpGet("activity/booking")]
        public IActionResult GetBookingActivity()
        {
            try
            {
                var totalCustomers = _db.bookings.Count();

                var newCustomers = _db.bookings.Where(b => b.booking_date >= DateTime.Today.AddMonths(-1)).Count();

                // total bookings
                var totalBookings = _db.bookings.Count();

                // total tours
                var totalTours = _db.bookings.Select(b => b.TourId).Distinct().Count();

                // Get booking data by day week
                var bookingWeekly = _db.bookings
                    .Where(b => b.booking_date >= DateTime.Today.AddDays(-(int)DateTime.Today.DayOfWeek))
                    .GroupBy(b => b.booking_date.DayOfWeek)
                    .Select(g => new
                    {
                        title = g.Key.ToString(),
                        booking = g.Count(),
                        //search = // Logic to calculate search count for each day (if applicable)
                    })
                    .ToList();

                // Calculate booking gender
                var bookingGender = _db.bookings
                    .GroupBy(b => b.Account.gender)
                    .Select(g => new
                    {
                        title = g.Key,
                        percent = Math.Round((double)g.Count() / totalCustomers * 100, 2) 
                    })
                    .ToList();

                // Calculate payment method distribution (logic might need adjustment)
                var paymentMethod = _db.invoices
                    .Where(i => i.InvoiceDetail != null) // Filter invoices with InvoiceDetails
                    .GroupBy(i => i.InvoiceDetail)
                    .Select(g => new
                    {
                        title = g.Key,
                        percent = Math.Round((double)g.Count() / totalBookings * 100, 2),
                        //value = ,// Logic to calculate total value for each payment method (if applicable)

                    })
                    .ToList();

                // Combine all data into a single response object
                var response = new
                {
                    totalCustomer = totalCustomers,
                    newCustomer = newCustomers,
                    bookings = totalBookings,
                    tours = totalTours,
                    bookingWeekly = bookingWeekly,
                    bookingGender = bookingGender,
                    paymentMethod = paymentMethod,
                };

                return Ok(response);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message); // Handle exceptions appropriately
            }
        }*/
    }
}