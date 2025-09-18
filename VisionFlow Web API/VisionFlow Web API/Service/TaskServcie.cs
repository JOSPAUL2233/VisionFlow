using VisionFlow_Web_API.Interfaces.IRepositories;
using VisionFlow_Web_API.Interfaces.IServices;
using VisionFlow_Web_API.Models;
using VisionFlow_Web_API.Repository;

namespace VisionFlow_Web_API.Service
{
    public class TaskServcie:ITaskService
    {

        public readonly ITaskRepository _TaskRepository;

        public TaskServcie(ITaskRepository repo) {
            _TaskRepository = repo;
        }

        public async Task<List<DTO_TaskDetails>> GetTaskListByPid(int projectId)
        {
            return await _TaskRepository.GetTaskListByPid(projectId);
        }

        public async Task<List<DTO_TaskDetails>> GetTaskListByUid(int userId, int roleId)
        {
            return await _TaskRepository.GetTaskListByUid(userId,roleId);
        }
        public async Task<int> CreateTask(int userId,int roleId, DTO_TaskDetails taskDto)
        {
            return await _TaskRepository.CreateTask(userId,roleId,taskDto);
        }
        public async Task<int> DeleteTask(DTO_TaskDetails taskDto)
        {
            return await _TaskRepository.DeleteTask(taskDto);
        }
        public async Task<int> UpdateTask(DTO_TaskDetails taskDto)
        {
            return await _TaskRepository.UpdateTask(taskDto);
        }

    }
}
