using VisionFlow_Web_API.Models.Auth;

namespace VisionFlow_Web_API.Interfaces.IRepositories.Auth
{
    public interface IUserRepository
    {
        Task<DTO_User?> ValidateUserAsync(string Username, string Password);
        //Task<DTO_User> GetUserByIdAsync(int userId);


    }
}
