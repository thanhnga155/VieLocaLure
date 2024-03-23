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
        public ActionResult<IEnumerable<Area>> GetAreas()
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
    };
}
