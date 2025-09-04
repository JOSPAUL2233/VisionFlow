using VisionFlow_Web_API.Models;

namespace VisionFlow_Web_API.Interfaces.IRepositories
{
    public interface IUserManagementRepository
    {
        Task<int> RegisterUser(DTO_UserDetails UserRegisterDto);
        Task<int> UpdateUser(DTO_UserDetails UserRegisterDto);
        Task<int> DeleteUser(int Id);
        Task<List<DTO_UserDetails>> GetUserList();

    }
}
