using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using VieLocaLure.Data;
using VieLocaLure.Models;

namespace VieLocaLure.Controllers
{
    [Route("api/destination")]
    [ApiController]
    public class DestinationController : ControllerBase
    {
        private readonly VieLocaLureDB _db;

        public DestinationController(VieLocaLureDB db)
        {
            _db = db;
        }

        // GET: api/destination
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DestinationListDTO>>> GetDestinations()
        {
            var destinations = await _db.destinations
                .Include(d => d.Image)
                .Select(d => new DestinationListDTO
                {
                    id = d.Id,
                    name_en = d.name_en,
                    name_vi = d.name_vi,
                    image = d.Image.Select(i => i.url).ToList()
                })
                .ToListAsync();

            return destinations;
        }
        [HttpGet("listDestination")]
        public async Task<ActionResult<IEnumerable<Province>>> Getdes()
        {
            var destinations = await _db.destinations.ToListAsync();
            return Ok(destinations);
        }

        // GET: api/destination/filter?area=0
        [HttpGet("filter")]
        public async Task<ActionResult<IEnumerable<DestinationDTO>>> FilterDestinations([FromQuery] int area)
        {
            var destinations = await _db.destinations
                .Where(d => d.Province.AreaId == area)
                .Include(d => d.Image)
                .Include(d => d.TourDestination)
                .Select(d => new DestinationDTO
                {
                    id = d.Id,
                    name_en = d.name_en,
                    name_vi = d.name_vi,
                    image = d.Image.Select(i => i.url).ToList(),
                    numTours = d.TourDestination.Count
                })
                .ToListAsync();

            return destinations;
        }

        // POST: api/destination
        [HttpPost("add")]
        public async Task<ActionResult<Destination>> AddDestination(Destination destination)
        {
            _db.destinations.Add(destination);
            await _db.SaveChangesAsync();
            return CreatedAtAction(nameof(Getdes), new { id = destination.Id }, destination);
        }

        // PUT
        [HttpPut("update/id= {id}")]
        public async Task<IActionResult> UpdateDestination(int id, Destination destination)
        {
            if (id != destination.Id)
            {
                return BadRequest("IDs do not match.");
            }

            _db.Entry(destination).State = EntityState.Modified;

            try
            {
                await _db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DestinationExists(id))
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
        public async Task<IActionResult> DeleteDestination(int id)
        {
            var destination = await _db.destinations.FindAsync(id);
            if (!DestinationExists(id))
            {
                return NotFound();
            }

            _db.destinations.Remove(destination);
            await _db.SaveChangesAsync();

            return Ok(destination);
        }

        private bool DestinationExists(int id)
        {
            return _db.destinations.Any(e => e.Id == id);
        }
    }
}
