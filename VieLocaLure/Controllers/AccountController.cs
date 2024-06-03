using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using VieLocaLure.Data;
using VieLocaLure.Models;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace VieLocaLure.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private VieLocaLureDB _db;
        public IConfiguration _config;
        public AccountController(VieLocaLureDB db, IConfiguration configuration)
        {
            _db = db;
            this._config = configuration;
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel loginmodel) // tra ve object {role, jwt, username}. z ok. lam tiep di, để bỏ lên gpt haha

        {
            var existUser = await _db.accounts.FirstOrDefaultAsync(u => u.username == loginmodel.username);
            if (existUser == null)
            {
                return Unauthorized("Invalid username");
            }

            if (!BCrypt.Net.BCrypt.Verify(loginmodel.password, existUser.password))
            {
                return Unauthorized("Invalid password");
            }

            var authenKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JWT:SecretKey"]));
            var token = new JwtSecurityToken(
                issuer: _config["JWT:ValidIssuer"],
                audience: _config["JWT:ValidAudience"],
                expires: DateTime.Now.AddDays(60),
                signingCredentials: new SigningCredentials(authenKey, SecurityAlgorithms.HmacSha256Signature)
            );

            var returntoken = new JwtSecurityTokenHandler().WriteToken(token);

            var profile = await _db.accounts.Where(u => u.username == loginmodel.username)
                .Select(u => new Login
                {
                    role = u.role,
                    accesstoken = returntoken,
                    username = u.username,

                })
                .FirstOrDefaultAsync();

            if (profile == null)
            {
                return NotFound();
            }

            return Ok(profile);
            return Ok(returntoken);
        }

        [HttpPost("/register")]
        public async Task<IActionResult> Register([FromBody] Account newAccount)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Secure password hashing with BCrypt.Net
            newAccount.password = BCrypt.Net.BCrypt.HashPassword(newAccount.password);

            var existingUser = await _db.accounts.FirstOrDefaultAsync(u => u.username == newAccount.username);
            if (existingUser != null)
            {
                return BadRequest("Username already exists");
            }

            _db.accounts.Add(newAccount);
            await _db.SaveChangesAsync();

            return Ok("Registration successful!");
        }
        [HttpGet("/profile")]
        public async Task<IActionResult> GetProfile()
        {
            int currentUserId = GetCurrentUserId();

            var profile = await _db.accounts.Where(u => u.Id == currentUserId)
                .Select(u => new Profile
                {
                    name = u.name,
                    gmail = u.gmail,
                    phone_number = u.phone_number,
                    gender = u.gender,
                    image = u.image,
                })
                .FirstOrDefaultAsync();

            if (profile == null)
            {
                return NotFound();
            }
            return Ok(profile);
        }

        [HttpPut]
        public async Task<IActionResult> UpdateProfile([FromBody] Profile profile)
        {
            int currentUserId = GetCurrentUserId();

            var existingUser = await _db.accounts.FirstOrDefaultAsync(u => u.Id == currentUserId);

            if (existingUser == null)
            {
                return NotFound();
            }

            existingUser.name = profile.name;
            existingUser.gmail = profile.gmail;
            existingUser.phone_number = profile.phone_number;
            existingUser.gender = profile.gender;
            existingUser.image = profile.image;

            _db.Update(existingUser);
            await _db.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete]
        public async Task<IActionResult> DeleteProfile()
        {
            int currentUserId = GetCurrentUserId();

            var existingUser = await _db.accounts.FirstOrDefaultAsync(u => u.Id == currentUserId);

            if (existingUser == null)
            {
                return NotFound();
            }

            _db.accounts.Remove(existingUser);
            await _db.SaveChangesAsync();

            return NoContent();
        }

        private int GetCurrentUserId()
        {
            throw new NotImplementedException("Implement logic to get current user ID");
        }
    }
}
// dung request body
// tuc la cai endpoint khong co de username voi pasword nhu vay ok