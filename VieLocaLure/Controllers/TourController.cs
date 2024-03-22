using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using VieLocaLure.Data;
using VieLocaLure.Models;

namespace VieLocaLure.Controllers
{
    [Route("api/tour")]
    [ApiController]
    public class TourController : ControllerBase
    {
        private VieLocaLureDB _db;
        public TourController(VieLocaLureDB db)
        {
            _db = db;
        }
        [HttpGet("filter")]
        public ActionResult<IEnumerable<BannerDTO>> Filter([FromQuery] string key, [FromQuery] int max)
        {
            var tour = _db.tours;
            if (key != "hottest")
            {
                return BadRequest("Invalid key");
            }

            var filterData = tour.Take(max);

            return Ok(filterData);
        }
    }
}
