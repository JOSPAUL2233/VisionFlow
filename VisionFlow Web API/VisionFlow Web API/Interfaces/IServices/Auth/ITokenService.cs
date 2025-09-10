using VisionFlow_Web_API.Models.Auth;

namespace VisionFlow_Web_API.Interfaces.IServices.Auth
{
    public interface ITokenService
    {
        string CreateAccessToken(DTO_User user);
        string GenerateRefreshToken(); // random string (store hashed server-side)

    }
}