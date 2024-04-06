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
    [Route("api/banner")]
    [ApiController]
    public class BannerController : ControllerBase
    {
        private readonly VieLocaLureDB _db;

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

        [HttpPost("add")]
        public async Task<IActionResult> AddBanner([FromBody] Banner banner)
        {
            _db.banners.Add(banner);
            await _db.SaveChangesAsync();
            return Ok(banner);
        }

        [HttpPut("update/id= {id}")]
        public async Task<IActionResult> UpdateBanner(int id, [FromBody] Banner banner)
        {
            if (id != banner.Id)
            {
                return BadRequest("ID do not match.");
            }

            var existingBanner = await _db.banners.FindAsync(id);
            if (existingBanner == null)
            {
                return NotFound("Banner not found.");
            }

            // Update 
            existingBanner.caption1_en = banner.caption1_en;
            existingBanner.caption2_en = banner.caption2_en;
            existingBanner.caption3_en = banner.caption3_en;
            existingBanner.caption1_vi = banner.caption1_vi;
            existingBanner.caption2_vi = banner.caption2_vi;
            existingBanner.caption3_vi = banner.caption3_vi;
            existingBanner.image = banner.image;
            existingBanner.url = banner.url;

            await _db.SaveChangesAsync();

            return Ok(existingBanner);
        }
        private bool BannerExists(int id)
        {
            return _db.banners.Any(e => e.Id == id);
        }

        [HttpDelete("delete/id= {id}")]
        public async Task<IActionResult> DeleteBanner(int id)
        {
            var banner = await _db.banners.FindAsync(id);
            if (BannerExists(id) == null)
            {
                return NotFound();
            }

            _db.banners.Remove(banner);
            await _db.SaveChangesAsync();

            return Ok(banner);
        }
    }
}
