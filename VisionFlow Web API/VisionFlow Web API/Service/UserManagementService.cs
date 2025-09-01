using VisionFlow_Web_API.Models;
using VisionFlow_Web_API.Interfaces.IServices;
using VisionFlow_Web_API.Interfaces.IRepositories;
using VisionFlow_Web_API.Repository;

namespace VisionFlow_Web_API.Service
{
    public class UserManagementService : IUserManagementService
    {
        private readonly IUserManagementRepository _UserManagementRepository;

        public UserManagementService(IUserManagementRepository repo)
        {
            _UserManagementRepository = repo;
        }
        public async Task<int> RegisterUser(DTO_UserRegister UserRegisterDto)
        {
            return await _UserManagementRepository.RegisterUser(UserRegisterDto);
        }
        public async Task<int> UpdateUser(DTO_UserRegister UserRegisterDto)
        {
            return await _UserManagementRepository.UpdateUser(UserRegisterDto);
        }
        public async Task<int> DeleteUser(int Id)
        {
            return await _UserManagementRepository.DeleteUser(Id);
        }
        
        public async Task<List<DTO_UserProfile>> GetUserList()
        {
            return await _UserManagementRepository.GetUserList();
        }
    }
}
