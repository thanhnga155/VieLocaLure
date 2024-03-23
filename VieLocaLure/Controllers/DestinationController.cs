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
                .Include(d => d.Image) //lấy hình ảnh
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

        // GET: api/destination/filter?area=0
        [HttpGet("filter")]
        public async Task<ActionResult<IEnumerable<DestinationDTO>>> FilterDestinations([FromQuery] int area)
        {
            var destinations = _db.destinations
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
                .ToList();

            return destinations;
        }
    }
 }
