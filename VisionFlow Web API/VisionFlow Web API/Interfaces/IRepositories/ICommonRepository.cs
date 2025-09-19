using VisionFlow_Web_API.Models;

namespace VisionFlow_Web_API.Interfaces.IRepositories
{
    public interface ICommonRepository
    {
        Task<List<DTO_RoleDetails>> GetRoles();
        Task<List<DTO_ProjectStatus>> GetStatusList(string mode, int userId, int roleId);
        Task<List<DTO_AssignedToDetails>> GetAssignedToList(int userId, int roleId);
        Task<List<DTO_NavbarDetails>> GetNavbarList(int userId, int? roleId);

    }
}
