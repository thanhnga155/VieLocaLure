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

            var areas = _db.areas.ToList();
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
        //thêm 
        [HttpPost("add")]
        public async Task<ActionResult<Area>> AddArea(Area area)
        {
            _db.areas.Add(area);
            await _db.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAreas), new { id = area.Id }, area);
        }
        //sửa
        [HttpPut("update/id= {id}")]
        public async Task<IActionResult> UpdateArea(int id, [FromBody] Area area)
        {
            if (id != area.Id)
            {
                return BadRequest("Id mismatch.");
            }

            var existingArea = await _db.areas.FindAsync(id);
            if (existingArea == null)
            {
                return NotFound("Area not found.");
            }

            // Update existingArea properties with values from the request body
            existingArea.name_en = area.name_en;
            existingArea.name_vi = area.name_vi;
            existingArea.url = area.url;
            existingArea.content = area.content;

            try
            {
                await _db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AreaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        private bool AreaExists(int id)
        {
            return _db.areas.Any(e => e.Id == id);
        }

        //xóa
        [HttpDelete("delete/id= {id}")]
        public async Task<ActionResult<Area>> DeleteArea(int id)
        {
            var area = await _db.areas.FindAsync(id);
            if (!AreaExists(id))
            {
                return NotFound();
            }

            _db.areas.Remove(area);
            await _db.SaveChangesAsync();
            return area;
        }
    }
}