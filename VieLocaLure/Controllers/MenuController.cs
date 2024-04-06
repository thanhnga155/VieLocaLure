using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VieLocaLure.Data;

namespace VieLocaLure.Controllers
{
    [Route("api/menuItems")]
    [ApiController]
    public class MenuController : ControllerBase
    {
        private VieLocaLureDB _db;
        public MenuController(VieLocaLureDB db)
        {
            _db = db;
        }
        [HttpGet]
        public IActionResult Get()
        {
            var listMenu = _db.menuItems.ToList();
            return Ok(listMenu);
        }

        [HttpGet("urls")] 
        public IActionResult GetMenuUrls()
        {
            var urls = _db.menuItems.Select(m => m.url).ToList(); // chỉ lấy url từ menuitems
            return Ok(urls);
        }
    };
}
