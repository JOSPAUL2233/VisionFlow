using VisionFlow_Web_API.Models.Auth;

namespace VisionFlow_Web_API.Interfaces.IServices.Auth
{
    public interface IUserService
    {
        Task<DTO_User?> ValidateUserAsync(string Username, string Password);
        Task<DTO_User?> GetUserByIdAsync(int userId);
    }
}
