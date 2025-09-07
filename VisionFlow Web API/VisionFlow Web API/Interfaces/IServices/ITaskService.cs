using VisionFlow_Web_API.Models;

namespace VisionFlow_Web_API.Interfaces.IServices
{
    public interface ITaskService
    {
        Task<List<DTO_TaskDetails>> GetTaskListByPid(int projectId);

    }
}
