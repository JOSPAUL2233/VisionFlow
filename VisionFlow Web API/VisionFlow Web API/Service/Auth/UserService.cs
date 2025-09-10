using VisionFlow_Web_API.Interfaces.IRepositories;
using VisionFlow_Web_API.Interfaces.IRepositories.Auth;
using VisionFlow_Web_API.Interfaces.IServices.Auth;
using VisionFlow_Web_API.Models.Auth;
using VisionFlow_Web_API.Repository;

namespace VisionFlow_Web_API.Service.Auth
{
    public class UserService : IUserService
    {

        public readonly IUserRepository _UserRepository;

        public UserService(IUserRepository repo)
        {
            _UserRepository = repo;
        }

        public async Task<DTO_User?> ValidateUserAsync(string Username, string Password)
        {
            return await _UserRepository.ValidateUserAsync(Username, Password);
        }

        //public async Task<DTO_User> GetUserByIdAsync(int userId)
        //{
        //    return await _UserRepository.GetUserByIdAsync(userId);
        //}


    }
}