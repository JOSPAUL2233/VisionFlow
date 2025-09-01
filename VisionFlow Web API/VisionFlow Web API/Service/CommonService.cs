using VisionFlow_Web_API.Interfaces.IRepositories;
using VisionFlow_Web_API.Interfaces.IServices;
using VisionFlow_Web_API.Models;

namespace VisionFlow_Web_API.Service
{
    public class CommonService : ICommonService
    {
        private readonly ICommonRepository _CommonRepository;

        public CommonService(ICommonRepository repo)
        {
            _CommonRepository = repo;
        }
        public async Task<List<DTO_RoleDetails>> GetRoles()
        {
            return await _CommonRepository.GetRoles();
        }
        public async Task<List<DTO_ProjectStatus>> GetProjectStatusList()
        {
            return await _CommonRepository.GetProjectStatusList();
        }
        public async Task<List<DTO_AssignedToDetails>> GetAssignedToList(int userId, int roleId)
        {
            return await _CommonRepository.GetAssignedToList(userId, roleId);
        }

    }
}