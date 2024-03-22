using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using VieLocaLure.Data;
using VieLocaLure.Models;

namespace VieLocaLure.Controllers
{
    [Route("api/province")]
    [ApiController]
    public class ProvinceController : ControllerBase
    {
        private readonly VieLocaLureDB _db;

        public ProvinceController(VieLocaLureDB db)
        {
            _db = db;
        }

        // GET: api/province
        [HttpGet]
        public ActionResult<IEnumerable<Province>> GetProvinces()
        {
            var provinces = _db.provinces.Select(p => new Province
            {
                Id = p.Id,
                name_en = p.name_en,
                name_vi = p.name_vi
            }).ToList();

            return provinces;
        }

        // GET: api/province/filter?area=0
        [HttpGet("filter")]
        public ActionResult<IEnumerable<Province>> GetProvincesByArea(int area)
        {
            var provinces = _db.provinces
                .Where(p => p.AreaId == area)
                .Select(p => new Province
                {
                    Id = p.Id,
                    name_en = p.name_en,
                    name_vi = p.name_vi
                })
                .ToList();

            return provinces;
        }
    }
}
