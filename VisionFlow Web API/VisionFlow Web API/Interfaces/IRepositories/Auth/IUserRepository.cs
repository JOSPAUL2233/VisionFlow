using VisionFlow_Web_API.Models;
using VisionFlow_Web_API.Models.Auth;
using DTO_User = VisionFlow_Web_API.Models.Auth.DTO_User;

namespace VisionFlow_Web_API.Interfaces.IRepositories.Auth
{
    public interface IUserRepository
    {
        Task<DTO_User?> ValidateUserAsync(string Username, string Password);
        Task<DTO_User?> GetUserByIdAsync(int userId);

    }
}
