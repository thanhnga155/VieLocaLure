using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VieLocaLure.Data;

namespace VieLocaLure.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BannerController : ControllerBase
    {
            private VieLocaLureDB _db;
            public BannerController(VieLocaLureDB db)
            {
                _db = db;
            }
            [HttpGet]
            public IActionResult Get()
            {
                var listBanner = _db.banners.ToList();
                return Ok(listBanner);
            }
    };
}
