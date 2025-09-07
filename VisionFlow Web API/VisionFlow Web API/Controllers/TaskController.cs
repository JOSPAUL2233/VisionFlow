using Microsoft.AspNetCore.Mvc;
using VisionFlow_Web_API.Interfaces.IServices;
using VisionFlow_Web_API.Models;

namespace VisionFlow_Web_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : Controller
    {
        public readonly ITaskService _TaskService;
        public TaskController(ITaskService service)
        {
            _TaskService = service;
        }
        //Current User and Role id hardcoded for now in very QUERY
        [HttpPost("GetProjectList")]
        public async Task<IActionResult> GetTaskListByPid([FromBody]int projectId)
        {

            var tasks = await _TaskService.GetTaskListByPid(projectId);

            if (tasks == null)
            {
                return Ok(new
                {
                    success = false,
                    message = "Could not fetch user details.",
                    data = tasks
                });
            }

            if (!tasks.Any())
            {
                return Ok(new
                {
                    success = false,
                    message = "No Users Found.",
                    data = tasks
                });
            }

            return Ok(new
            {
                success = true,
                data = tasks
            });
        }

    }
}
