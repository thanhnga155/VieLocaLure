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
        public ActionResult<IEnumerable<AreaDTO>> GetAreas()
        {
            var areas = _db.areas.Select(a => new AreaDTO
            {
                name_en = a.name_en,
                name_vi = a.name_vi,
                url = $"/search?q={a.name_en.Replace(" ", "-").ToLower()}",
                Id = a.Id
            }).ToList();

            return areas;
        }
    };
}
