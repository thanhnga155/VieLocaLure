using Microsoft.AspNetCore.Mvc;
using System.Linq;
using VieLocaLure.Data;
using VieLocaLure.Models;

namespace VieLocaLure.Controllers
{
    public class TourController : ControllerBase
    {
        private VieLocaLureDB _db;
        public TourController (VieLocaLureDB db)
        {
            _db = db;
        }

        [HttpGet]
        [Route("api/tour/filter")]
        public IActionResult GetTours(string key = "", int max = 0, int province = 0, int id = 0)
        {
            IQueryable<Tour> tours = _db.tours;

            // Lọc theo key (hottest hoặc latest)
            if (key == "hottest")
            {
                tours = tours.OrderByDescending(t => t.Id);
            }
            else if (key == "latest")
            {
                tours = tours.OrderBy(t => t.Id);
            }

            // Lấy tối đa số lượng tour
            if (max > 0)
            {
                tours = tours.Take(max);
            }

/*            // Lọc theo province và id
            if (province > 0)
            {
                tours = tours.Where(t => t.Id_destination == province);
            }*/

            if (id > 0)
            {
                tours = tours.Where(t => t.Id == id);
            }

            // Lấy danh sách tour theo các điều kiện lọc
            var result = tours.ToList();
            return Ok(result);
        }
    }
}