using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;
using VieLocaLure.Data;
using VieLocaLure.Models;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;
using static Microsoft.Extensions.Logging.EventSource.LoggingEventSource;

namespace VieLocaLure.Controllers
{
    [Route("api/search")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        private readonly VieLocaLureDB _db;

        public SearchController(VieLocaLureDB db)
        {
            _db = db;
        }


        [HttpGet]
        //tham số ? không xuất hiện khi không có key
        public ActionResult<IEnumerable<Object>> SearchTours(
        [FromQuery(Name = "keywords")] string keywords = "",
        [FromQuery(Name = "from")] DateTime? from = null,
        [FromQuery(Name = "to")] DateTime? to = null,
        [FromQuery(Name = "area")] int? area = null)
        {
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