using VisionFlow_Web_API.Models;

namespace VisionFlow_Web_API.Interfaces.IServices
{
    public interface ITaskService
    {
        Task<List<DTO_TaskDetails>> GetTaskListByPid(int projectId);
        Task<List<DTO_TaskDetails>> GetTaskListByUid(int userId,int roleId);
        Task<int> CreateTask(int userId,int roleId,DTO_TaskDetails taskDto);
        Task<int> DeleteTask(DTO_TaskDetails taskDto);
        Task<int> UpdateTask(DTO_TaskDetails taskDto);

    }
}
