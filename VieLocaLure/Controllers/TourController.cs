using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VieLocaLure.Data;
using VieLocaLure.Models;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace VieLocaLure.Controllers
{
    [Route("api/tour")]
    [ApiController]
    public class TourController : ControllerBase
    {
        private readonly VieLocaLureDB _db;

        public TourController(VieLocaLureDB db)
        {
            _db = db;
        }
        // GET: api/tour
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Object>>> GetTours([FromQuery]int page)
        {
            int pagesize = 10;//sl item
                var query = _db.tours
                    .Include(t => t.TourDetail)
                    .Include(t => t.TourDestination)
                    .ThenInclude(td => td.Destination)
                    .ThenInclude(d => d.Image)
                    .Select(t => new TourLastDTO
                    {
                        image = t.TourDestination.FirstOrDefault().Destination.Image.FirstOrDefault().url,
                        adultPrice = t.TourDetail.OrderByDescending(td => td.departureDate).FirstOrDefault().adultPrice,
                        childPrice = t.TourDetail.OrderByDescending(td => td.departureDate).FirstOrDefault().childPrice,
                        infantPrice = t.TourDetail.OrderByDescending(td => td.departureDate).FirstOrDefault().infantPrice,
                        province_en = t.TourDestination.FirstOrDefault().Destination.Province.name_en,
                        province_vi = t.TourDestination.FirstOrDefault().Destination.Province.name_vi,
                        title_en = t.title_en,
                        title_vi = t.title_vi,
                        duration_en = t.duration_en,
                        duration_vi = t.duration_vi,
                        transport_en = t.transport_en,
                        transport_vi = t.transport_vi,
                        url = t.url
                    });

            int skip = (page - 1) * pagesize;
            query = query.Skip(skip).Take(pagesize);

            var tours = await query.ToListAsync();
            return Ok(tours);

        }

        [HttpGet("filter")]
        public async Task<ActionResult<IEnumerable<Object>>> FilterTours([FromQuery] string key, [FromQuery] int max)// [FromQuery] int province
        {
            if (key == "hottest")
            {
                var banners = await _db.banners.Take(max).ToListAsync();
                return Ok(banners);
            }
            else if (key == "latest")
            {
                var query = _db.tours.OrderByDescending(t => t.Id)
                    .Include(t => t.TourDetail)
                    .Include(t => t.TourDestination)
                    .ThenInclude(td => td.Destination)
                    .ThenInclude(d => d.Image)
                    .Select(t => new TourLastDTO
                    {
                        image = t.TourDestination.FirstOrDefault().Destination.Image.FirstOrDefault().url,
                        adultPrice = t.TourDetail.OrderByDescending(td => td.departureDate).FirstOrDefault().adultPrice,
                        childPrice = t.TourDetail.OrderByDescending(td => td.departureDate).FirstOrDefault().childPrice,
                        infantPrice = t.TourDetail.OrderByDescending(td => td.departureDate).FirstOrDefault().infantPrice,
                        province_en = t.TourDestination.FirstOrDefault().Destination.Province.name_en,
                        province_vi = t.TourDestination.FirstOrDefault().Destination.Province.name_vi,
                        title_en = t.title_en,
                        title_vi = t.title_vi,
                        duration_en = t.duration_en,
                        duration_vi = t.duration_vi,
                        transport_en = t.transport_en,
                        transport_vi = t.transport_vi,
                        url = t.url
                    })
                    .Take(max);

                var tours = await query.ToListAsync();
                return Ok(tours);
            }
/*            else if (province != 0)
            {
                var tours = await _db.tours
                    .Where(d => d.TourDestination.Any(t => t.Destination.ProvinceId == province))
                    .Include(d => d.TourDetail)
                    .Include(d => d.TourDestination)
                    .ThenInclude(t => t.Destination)
                    .ThenInclude(td => td.Image)
                    .Select(d => new TourProvinceDTO
                    {
                        title_en = d.TourDestination.FirstOrDefault().Destination.name_en,
                        title_vi = d.TourDestination.FirstOrDefault().Destination.name_vi,
                        image = d.TourDestination.FirstOrDefault().Destination.Image.FirstOrDefault().url,
                        duration_en = d.duration_en,
                        duration_vi = d.duration_vi,
                        transport_en = d.transport_en,
                        transport_vi = d.transport_vi,
                        description_en = d.content_en,
                        description_vi = d.content_vi,
                        adultPrice = d.TourDetail.FirstOrDefault().adultPrice,
                        childPrice = d.TourDetail.FirstOrDefault().childPrice,
                        infantPrice = d.TourDetail.FirstOrDefault().infantPrice,
                        schedule = d.TourDetail.Select(td => td.departureDate).ToList()
                    })
                    .ToListAsync();

                return Ok(tours);
            }*/
            else
            {
                return BadRequest("Invalid parameters.");
            }
        }

        [HttpGet("search")]
        // Tham số không xuất hiện khi không có key
        public ActionResult<IEnumerable<Object>> SearchTours(
    [FromQuery(Name = "keywords")] string keywords = "",
    [FromQuery(Name = "from")] DateTime? from = null,
    [FromQuery(Name = "to")] DateTime? to = null,
    [FromQuery(Name = "area")] int? area = null,
    [FromQuery(Name = "page")] int page = 1) // Thêm tham số cho số trang, mặc định là trang 1
        {
            int pageSize = 10; // Số lượng tour trên mỗi trang

            IQueryable<Tour> query = _db.tours;

            if (!string.IsNullOrEmpty(keywords))
            {
                keywords = keywords.ToLower();
                query = query.Where(p => p.title_vi.ToLower().Contains(keywords) || p.title_en.ToLower().Contains(keywords));
            }

            if (from.HasValue)
            {
                query = query.Where(p => p.TourDetail.Any(x => x.departureDate >= from));
            }

            if (to.HasValue)
            {
                query = query.Where(p => p.TourDetail.Any(y => y.departureDate <= to));
            }

            if (area.HasValue)
            {
                query = query.Where(p => p.TourDestination.Any(z => z.Destination.Province.AreaId == area));
            }

            // Áp dụng phân trang
            int skip = (page - 1) * pageSize;
            query = query.Skip(skip).Take(pageSize);

            var tours = query.Include(d => d.TourDetail)
                .Include(d => d.TourDestination)
                .ThenInclude(t => t.Destination)
                .ThenInclude(td => td.Image)
                .Select(d => new TourProvinceDTO
                {
                    title_en = d.TourDestination.FirstOrDefault().Destination.name_en,
                    title_vi = d.TourDestination.FirstOrDefault().Destination.name_vi,
                    image = d.TourDestination.FirstOrDefault().Destination.Image.FirstOrDefault().url,
                    duration_en = d.duration_en,
                    duration_vi = d.duration_vi,
                    transport_en = d.transport_en,
                    transport_vi = d.transport_vi,
                    description_en = d.content_en,
                    description_vi = d.content_vi,
                    adultPrice = d.TourDetail.FirstOrDefault().adultPrice,
                    childPrice = d.TourDetail.FirstOrDefault().childPrice,
                    infantPrice = d.TourDetail.FirstOrDefault().infantPrice,
                    schedule = d.TourDetail.Select(td => td.departureDate).ToList()
                })
                .ToList();

            return Ok(tours);
        }

    }
}