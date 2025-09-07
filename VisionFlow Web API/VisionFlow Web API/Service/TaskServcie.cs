using VisionFlow_Web_API.Interfaces.IRepositories;
using VisionFlow_Web_API.Interfaces.IServices;
using VisionFlow_Web_API.Models;

namespace VisionFlow_Web_API.Service
{
    public class TaskServcie:ITaskService
    {

        public readonly ITaskRepository _TaskRepository;

        public TaskServcie(ITaskRepository repo) {
            _TaskRepository = repo;
        }

        public Task<List<DTO_TaskDetails>> GetTaskListByPid(int projectId)
        {
            return _TaskRepository.GetTaskListByPid(projectId);
        }


    }
}
