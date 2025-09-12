using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using VisionFlow_Web_API.Interfaces.IRepositories.Auth;
using VisionFlow_Web_API.Interfaces.IServices.Auth;
using VisionFlow_Web_API.Models.Auth;
using Microsoft.IdentityModel.JsonWebTokens; // for JwtRegisteredClaimNames

namespace VisionFlow_Web_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly ITokenService _tokenService;
        private readonly IConfiguration _config;
        private readonly IRefreshTokenRepository _refreshRepo;

        public AuthController(
            IUserService userService,
            ITokenService tokenService,
            IConfiguration config,
            IRefreshTokenRepository refreshRepo)
        {
            _userService = userService;
            _tokenService = tokenService;
            _config = config;
            _refreshRepo = refreshRepo;
        }

        // ------------------------- LOGIN -------------------------
        [AllowAnonymous]
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] DTO_Login logInDto)
        {

            //--CHECKING USER - PASSWORD WITH THE DB--
            var user = await _userService.ValidateUserAsync(logInDto.Username, logInDto.Password);
            if (user == null)
            {
                return Unauthorized(new { success = false, message = "Invalid credentials" });
            }

            //--GENERATING ACCESS AND REFRESH TOKEN--
            var accessToken = _tokenService.CreateAccessToken(user);
            var refreshToken = _tokenService.GenerateRefreshToken();

            //--STORING HASHED REFRESH TOKEN IN DB--
            var hashed = Hash(refreshToken);
            await _refreshRepo.SaveRefreshTokenAsync(
                user.UserId,
                hashed,
                DateTime.UtcNow.AddDays(int.Parse(_config["Jwt:RefreshTokenExpiryDays"]))
            );

            //--CREATING COOKIE  FOR ACCESS-TOKEN WITH EXPIRY
            Response.Cookies.Append("access_token", accessToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = DateTime.UtcNow.AddMinutes(int.Parse(_config["Jwt:AccessTokenExpiryMinutes"]))
            });

            //--CREATING COOKIE  FOR REFRESH-TOKEN WITH EXPIRY
            Response.Cookies.Append("refresh_token", refreshToken, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = DateTime.UtcNow.AddDays(int.Parse(_config["Jwt:RefreshTokenExpiryDays"]))
            });

            //--CREATING COOKIE  FOR XSRF-TOKEN WITH EXPIRY
            Response.Cookies.Append("XSRF-TOKEN", GenerateXsrfToken(), new CookieOptions
            {
                HttpOnly = false,
                Secure = true,
                SameSite = SameSiteMode.None
            });

            return Ok(
                new { 
                    success = true, 
                    user = new { 
                        user.UserId, 
                        user.LoginName, 
                        user.RoleName ,
                    } 
                }
            );
        }

        // ------------------------- Identify Me -------------------------
        [HttpGet("me")]
        public IActionResult Me()
        {
            var uid = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "0");
            var loginName = User.FindFirst(ClaimTypes.Name)?.Value;
            var role = User.FindFirst(ClaimTypes.Role)?.Value;

            return Ok(
            new
            {
                UserId = uid,
                LoginName = loginName,
                RoleName = role,
            });
        }

        // ------------------------- REFRESH -------------------------
        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh()
        {
            if (!Request.Cookies.TryGetValue("refresh_token", out var refreshToken))
                return Unauthorized();

            var hashed = Hash(refreshToken);
            var stored = await _refreshRepo.GetByHashedAsync(hashed);
            if (stored == null || stored.Expiry < DateTime.UtcNow) return Unauthorized();

            // rotate
            var newRefresh = _tokenService.GenerateRefreshToken();
            await _refreshRepo.ReplaceRefreshTokenAsync(
                stored.UserId,
                stored.Id,
                Hash(newRefresh),
                DateTime.UtcNow.AddDays(int.Parse(_config["Jwt:RefreshTokenExpiryDays"]))
            );

            var userDto = await _userService.GetUserByIdAsync(stored.UserId);
            var newAccess = _tokenService.CreateAccessToken(userDto);

            // reset cookies
            Response.Cookies.Append("access_token", newAccess, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = DateTime.UtcNow.AddMinutes(int.Parse(_config["Jwt:AccessTokenExpiryMinutes"]))
            });
            Response.Cookies.Append("refresh_token", newRefresh, new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = DateTime.UtcNow.AddDays(int.Parse(_config["Jwt:RefreshTokenExpiryDays"]))
            });
            Response.Cookies.Append("XSRF-TOKEN", GenerateXsrfToken(), new CookieOptions
            {
                HttpOnly = false,
                Secure = true,
                SameSite = SameSiteMode.None
            });

            return Ok(new { success = true });
        }

        // ------------------------- LOGOUT -------------------------
        [HttpPost("logout")]
        [Authorize]
        public async Task<IActionResult> Logout()
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            await _refreshRepo.DeleteAllForUserAsync(userId);

            Response.Cookies.Delete("access_token");
            Response.Cookies.Delete("refresh_token");
            Response.Cookies.Delete("XSRF-TOKEN");

            return Ok(new { success = true });
        }

        // ------------------------- HELPERS FUNCTIONS -------------------------
        private static string Hash(string input)
        {
            using var sha = SHA256.Create();
            var bytes = sha.ComputeHash(Encoding.UTF8.GetBytes(input));
            return Convert.ToBase64String(bytes);
        }

        private static string GenerateXsrfToken()
        {
            return Convert.ToBase64String(RandomNumberGenerator.GetBytes(32));
        }
    }
}