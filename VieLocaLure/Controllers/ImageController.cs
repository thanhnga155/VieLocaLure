using Microsoft.AspNetCore.Mvc;
using System.IO;
using System;
using VieLocaLure.Data;
using Microsoft.EntityFrameworkCore;
using VieLocaLure.Models;

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
        // POST
        [HttpPost]
        public async Task<IActionResult> UploadImage([FromBody]Image image)
        {
            // Thêm ảnh vào cơ sở dữ liệu
            _db.images.Add(image);
            await _db.SaveChangesAsync();

            return Ok(image);
        }

        // PUT
        [HttpPut("update/id= {id}")]
        public async Task<IActionResult> UpdateImage(int id, [FromBody] Image image)
        {
            if (id != image.Id)
            {
                return BadRequest("IDs do not match.");
            }

            _db.Entry(image).State = EntityState.Modified;

            try
            {
                await _db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ImageExists(id))
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
        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteImage(int id)
        {
            var image = await _db.images.FindAsync(id);
            if (image == null)
            {
                return NotFound();
            }

            _db.images.Remove(image);
            await _db.SaveChangesAsync();

            return Ok(image);
        }

        private bool ImageExists(int id)
        {
            return _db.images.Any(e => e.Id == id);
        }
    }
}
