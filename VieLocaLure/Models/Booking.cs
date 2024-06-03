using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace VieLocaLure.Models
{
    public class Booking
    {
        public string username { get; set; }
        public int tourId { get; set; }
        public string paymentMethod { get; set; }
        public int numAdult { get; set; }
        public int numChildren { get; set; }
        public int numInfant { get; set; }
        public float totalPrice { get; set; }


    }
    public class BookingRequest
    {
        public int CountAdult { get; set; }
        public int CountChild { get; set; }
        public int CountInfant { get; set; }
        public string PaymentMethod { get; set; }
        public float TotalPrice { get; set; }
        public int AccountId { get; set; }
        public int TourId { get; set; }
        public string ConfirmationToken { get; set; }

        public string Email { get; set; }
    }
}
