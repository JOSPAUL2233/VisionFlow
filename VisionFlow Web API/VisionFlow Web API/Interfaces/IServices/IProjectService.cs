using Microsoft.AspNetCore.Mvc;
using VisionFlow_Web_API.Models;

namespace VisionFlow_Web_API.Interfaces.IServices
{
    public interface IProjectService
    {
        Task<List<DTO_ProjectDetails>> GetProjectList(int UserId,int roleId);
        Task<int> CreateProject(DTO_ProjectDetails projectDto,int userId,int roleId);
        Task<int> UpdateProject(DTO_ProjectDetails projectDto);
        Task<int> DeleteProject(DTO_ProjectDetails projectDto);
    }
}
