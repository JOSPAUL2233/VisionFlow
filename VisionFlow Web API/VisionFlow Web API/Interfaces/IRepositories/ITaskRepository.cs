using VisionFlow_Web_API.Models;

namespace VisionFlow_Web_API.Interfaces.IRepositories
{
    public interface ITaskRepository
    {
        Task<List<DTO_TaskDetails>> GetTaskListByPid(int projectId);
        Task<int> CreateTask(DTO_TaskDetails taskDto);
        Task<int> DeleteTask(DTO_TaskDetails taskDto);
        Task<int> UpdateTask(DTO_TaskDetails taskDto);

    }
}