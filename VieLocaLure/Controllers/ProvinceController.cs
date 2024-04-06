using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
        public async Task<ActionResult<IEnumerable<Province>>> GetProvinces()
        {
            var provinces = await _db.provinces.ToListAsync();
            return Ok(provinces);
        }

        // GET: api/province/filter?area=0
        [HttpGet("filter")]
        public async Task<ActionResult<IEnumerable<Province>>> GetProvincesByArea(int area)
        {
            var provinces = await _db.provinces
                .Where(p => p.AreaId == area)
                .ToListAsync();

            return Ok(provinces);
        }

        // POST: api/province
        [HttpPost("add")]
        public async Task<ActionResult<Province>> AddProvince(Province province)
        {
            _db.provinces.Add(province);
            await _db.SaveChangesAsync();
            return CreatedAtAction(nameof(GetProvinces), new { id = province.Id }, province);
        }

        // PUT
        [HttpPut("update/id= {id}")]
        public async Task<IActionResult> UpdateProvince(int id, Province province)
        {
            if (id != province.Id)
            {
                return BadRequest("IDs do not match.");
            }

            _db.Entry(province).State = EntityState.Modified;

            try
            {
                await _db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProvinceExists(id))
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

        // DELETE
        [HttpDelete("delete/id= {id}")]
        public async Task<IActionResult> DeleteProvince(int id)
        {
            var province = await _db.provinces.FindAsync(id);
            if (province == null)
            {
                return NotFound();
            }

            _db.provinces.Remove(province);
            await _db.SaveChangesAsync();

            return Ok(province);
        }

        private bool ProvinceExists(int id)
        {
            return _db.provinces.Any(e => e.Id == id);
        }
    }
}
