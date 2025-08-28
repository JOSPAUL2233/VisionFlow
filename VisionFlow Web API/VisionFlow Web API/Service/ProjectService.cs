using VisionFlow_Web_API.Interfaces.IRepositories;
using VisionFlow_Web_API.Interfaces.IServices;
using VisionFlow_Web_API.Models;
using VisionFlow_Web_API.Repository;

namespace VisionFlow_Web_API.Service
{
    public class ProjectService:IProjectService
    {
        private readonly IProjectRepository _ProjectRepository;

        public ProjectService(IProjectRepository repo)
        {
            _ProjectRepository = repo;
        }
        public async Task<List<DTO_ProjectDetails>> GetProjectList(int UserId)
        {
            return await _ProjectRepository.GetProjectList(UserId);
        }

        public async Task<int> CreateProject(DTO_ProjectDetails projectDto)
        {
            return await _ProjectRepository.CreateProject(projectDto);
        }
        //public async Task<int> UpdateUser(DTO_UserRegister UserRegisterDto)
        //{
        //    return await _UserManagementRepository.UpdateUser(UserRegisterDto);
        //}
        //public async Task<int> DeleteUser(int Id)
        //{
        //    return await _UserManagementRepository.DeleteUser(Id);
        //}

        //public async Task<List<DTO_RoleDetails>> GetRoles()
        //{
        //    return await _UserManagementRepository.GetRoles();
        //}
    }
}
