using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Security.Cryptography;
using VisionFlow_Web_API.Interfaces.IServices.Auth;
using VisionFlow_Web_API.Models.Auth;


namespace VisionFlow_Web_API.Service
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _config;
        public TokenService(IConfiguration config){
            _config = config;
        }

        public string CreateAccessToken(DTO_User user)
        {
            //--CREATING SECURITY KEY AND GENERATING SIGNATURE--
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            //--GENERATING CLAIM (PAYLOAD)--
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserId.ToString()),
                new Claim(ClaimTypes.Name, user.LoginName ?? ""),
                new Claim(ClaimTypes.Role, user.RoleName ?? "User")
            };

            //--GENERATING TOEKN--
            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(int.Parse(_config["Jwt:AccessTokenExpiryMinutes"])),
                signingCredentials: creds
            );
            var returnVal = new JwtSecurityTokenHandler().WriteToken(token);
            return returnVal;
        }

        public string GenerateRefreshToken()
        {
            var randomBytes = RandomNumberGenerator.GetBytes(64);
            return Convert.ToBase64String(randomBytes); // store hashed version in DB
        }
    }
}
