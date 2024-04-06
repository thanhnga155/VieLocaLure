using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using VieLocaLure.Data;
using VieLocaLure.Models;
using System.Linq;
using System.Threading.Tasks;

namespace VieLocaLure.Controllers
{
    [Route("api/menuItems")]
    [ApiController]
    public class MenuController : ControllerBase
    {
        private readonly VieLocaLureDB _db;

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

        [HttpPost("add")]
        public async Task<IActionResult> AddMenuItem([FromBody] MenuItem menuItem)
        {
            _db.menuItems.Add(menuItem);
            await _db.SaveChangesAsync();
            return Ok(menuItem);
        }

        [HttpPut("update/id= {id}")]
        public async Task<IActionResult> UpdateMenuItem(int id, [FromBody] MenuItem menuItem)
        {
            if (id != menuItem.Id)
            {
                return BadRequest("IDs do not match.");
            }

            var existingMenuItem = await _db.menuItems.FindAsync(id);
            if (existingMenuItem == null)
            {
                return NotFound("Menu item not found.");
            }

            // Update
            existingMenuItem.name_en = menuItem.name_en;
            existingMenuItem.name_vi = menuItem.name_vi;
            existingMenuItem.level = menuItem.level;
            existingMenuItem.url = menuItem.url;

            await _db.SaveChangesAsync();

            return Ok(existingMenuItem);
        }

        [HttpDelete("delete/id= {id}")]
        public async Task<IActionResult> DeleteMenuItem(int id)
        {
            var menuItem = await _db.menuItems.FindAsync(id);
            if (menuItem == null)
            {
                return NotFound();
            }

            _db.menuItems.Remove(menuItem);
            await _db.SaveChangesAsync();

            return Ok(menuItem);
        }
    }
}
