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

        [HttpGet("filter")]
        public async Task<ActionResult<IEnumerable<Object>>> FilterTours([FromQuery] string key, [FromQuery] int max, [FromQuery] int province)
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
            else if (province != 0)
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
            }
            else
            {
                return BadRequest("Invalid parameters.");
            }
        }
    }
}