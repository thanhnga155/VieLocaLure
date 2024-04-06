using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VieLocaLure.Data;
using VieLocaLure.Models;

namespace VieLocaLure.Controllers
{
    [Route("api/tourDetails")]
    [ApiController]
    public class TourDetailController : ControllerBase
    {
        private readonly VieLocaLureDB _db;

        public TourDetailController(VieLocaLureDB db)
        {
            _db = db;
        }

        // GET: api/tourDetails
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TourDetail>>> GetTourDetails()
        {
            var tourDetails = await _db.tourDetails.ToListAsync();
            return Ok(tourDetails);
        }


        // POST
        [HttpPost("add")]
        public async Task<ActionResult<TourDetail>> AddTourDetail(TourDetail tourDetail)
        {
            _db.tourDetails.Add(tourDetail);
            await _db.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTourDetails), new { id = tourDetail.Id }, tourDetail);
        }

        // PUT
        [HttpPut("update/id= {id}")]
        public async Task<IActionResult> UpdateTourDetail(int id, TourDetail tourDetail)
        {
            if (id != tourDetail.Id)
            {
                return BadRequest("ID do not match.");
            }

            _db.Entry(tourDetail).State = EntityState.Modified;

            try
            {
                await _db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TourDetailExists(id))
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
        public async Task<IActionResult> DeleteTourDetail(int id)
        {
            var tourDetail = await _db.tourDetails.FindAsync(id);
            if (tourDetail == null)
            {
                return NotFound();
            }

            _db.tourDetails.Remove(tourDetail);
            await _db.SaveChangesAsync();

            return Ok(tourDetail);
        }

        private bool TourDetailExists(int id)
        {
            return _db.tourDetails.Any(e => e.Id == id);
        }
    }
}
