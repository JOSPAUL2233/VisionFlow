using VisionFlow_Web_API.Models;

namespace VisionFlow_Web_API.Interfaces.IRepositories
{
    public interface IProjectRepository
    {
        Task<List<DTO_ProjectDetails>> GetProjectList(int UserId);
        Task<int> CreateProject(DTO_ProjectDetails projectDto);
        Task<int> UpdateProject(DTO_ProjectDetails projectDto);
        Task<int> DeleteProject(DTO_ProjectDetails projectDto);

    }
}
