using VisionFlow_Web_API.Models;

namespace VisionFlow_Web_API.Interfaces.IRepositories
{
    public interface ITaskRepository
    {
        Task<List<DTO_TaskDetails>> GetTaskListByPid(int projectId);
        
    }
}
