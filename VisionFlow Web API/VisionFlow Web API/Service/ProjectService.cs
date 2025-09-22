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
        public async Task<List<DTO_ProjectDetails>> GetProjectList(int UserId,int roleId)
        {
            return await _ProjectRepository.GetProjectList(UserId,roleId);
        }
        public async Task<List<DTO_ProjectDetails>> GetProjectReviewList(int UserId, int roleId)
        {
            return await _ProjectRepository.GetProjectReviewList(UserId, roleId);
        }

        public async Task<int> CreateProject(DTO_ProjectDetails projectDto,int userId,int roleId)
        {
            return await _ProjectRepository.CreateProject(projectDto,userId,roleId);
        }
        public async Task<int> DeleteProject(DTO_ProjectDetails projectDto)
        {
            return await _ProjectRepository.DeleteProject(projectDto);
        }

        public async Task<int> UpdateProject(DTO_ProjectDetails projectDto)
        {
            return await _ProjectRepository.UpdateProject(projectDto);
        }

    }
}
