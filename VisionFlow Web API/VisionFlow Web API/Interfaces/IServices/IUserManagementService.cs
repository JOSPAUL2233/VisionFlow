using Microsoft.AspNetCore.Mvc;
using VisionFlow_Web_API.Models;

namespace VisionFlow_Web_API.Interfaces.IServices
{
    public interface IUserManagementService
    {
        Task<int> RegisterUser(DTO_UserDetails UserRegisterDto);
        Task<int> UpdateUser(DTO_UserDetails UserRegisterDto);
        Task<int> DeleteUser(int Id);
        Task<List<DTO_UserDetails>> GetUserList();
    }
}