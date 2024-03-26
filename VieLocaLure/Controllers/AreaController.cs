using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VieLocaLure.Data;
using VieLocaLure.Models;

namespace VieLocaLure.Controllers
{
    [Route("api/area")]
    [ApiController]
    public class AreaController : ControllerBase
    {
        private VieLocaLureDB _db;
        public AreaController(VieLocaLureDB db)
        {
            _db = db;
        }
        //GET: api/area
        [HttpGet]
        public ActionResult<IEnumerable<Object>> GetProvinces()
        {

            var areas = _db.areas.Select(a => new Area
            {
                Id = a.Id,
                name_en = a.name_en,
                name_vi = a.name_vi,
                url = a.url,
                content = a.content
            }).ToList();

            return areas;
        }
        [HttpGet("url")]
        // Get: api/area/url?url=abc
        public ActionResult<IEnumerable<Object>> GetAreaByUrl([FromQuery(Name = "url")] string url)
        {
            var area = _db.areas
                .Where(a => a.url == url)
                .Select(a => new AreaDTO
                {
                    ID = a.Id
                })
                .ToList();

            return area;
        }

    }
}
