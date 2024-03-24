using Microsoft.AspNetCore.Mvc;
using System.IO;
using System;
using VieLocaLure.Data;

namespace VieLocaLure.Controllers
{
    [Route("api/Uploads")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private VieLocaLureDB _db;
        public ImageController(VieLocaLureDB db)
        {
            _db = db;
        }
        private readonly string _uploadsDirectory = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");

        [HttpGet("{fileName}")]
        public IActionResult GetFile(string fileName)
        {
            var filePath = Path.Combine(_uploadsDirectory, fileName);
            if (System.IO.File.Exists(filePath))
            {
                var fileBytes = System.IO.File.ReadAllBytes(filePath);
                return File(fileBytes, "application/octet-stream", fileName);
            }
            else
            {
                return NotFound();
            }
        }
    }
}