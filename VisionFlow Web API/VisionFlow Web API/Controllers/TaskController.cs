using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using VisionFlow_Web_API.Interfaces.IServices;
using VisionFlow_Web_API.Models;
using VisionFlow_Web_API.Service;

namespace VisionFlow_Web_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        public readonly ITaskService _TaskService;
        public TaskController(ITaskService service)
        {
            _TaskService = service;
        }
        //Current User and Role id hardcoded for now in very QUERY
        [HttpPost("GetTaskListByPid")]
        public async Task<IActionResult> GetTaskListByPid([FromBody]int projectId)
        {

            var tasks = await _TaskService.GetTaskListByPid(projectId);

            if (tasks == null)
            {
                return Ok(new
                {
                    success = false,
                    message = "Could not fetch task details.",
                    data = tasks
                });
            }

            if (!tasks.Any())
            {
                return Ok(new
                {
                    success = false,
                    message = "No Tasks Found.",
                    data = tasks
                });
            }

            return Ok(new
            {
                success = true,
                data = tasks
            });
        }

        [HttpPost("GetTaskListByUid")]
        public async Task<IActionResult> GetTaskListByUid()
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "0");
            var roleId = int.TryParse(User.FindFirst("RoleId")?.Value, out var rId) ? rId : 0;

            var tasks = await _TaskService.GetTaskListByUid(userId, roleId);

            if (tasks == null)
            {
                return Ok(new
                {
                    success = false,
                    message = "Could not fetch task details.",
                    data = tasks
                });
            }

            if (!tasks.Any())
            {
                return Ok(new
                {
                    success = false,
                    message = "No Tasks Found.",
                    data = tasks
                });
            }

            return Ok(new
            {
                success = true,
                data = tasks
            });
        }

        [HttpPost("CreateTask")]
        public async Task<IActionResult> CreateTask([FromBody] DTO_TaskDetails taskDto)
        {
            int taskId = await _TaskService.CreateTask(taskDto);
            if (taskId == 0)
            {
                return BadRequest(new
                {
                    success = false,
                    message = "Task registration failed."
                });
            }
            return Ok(new
            {
                success = true,
                message = "Task created successfully.",
                data = new { taskId }
            });
        }

        [HttpDelete("DeleteTask")]
        public async Task<IActionResult> DeleteTask([FromBody] DTO_TaskDetails taskDto)
        {
            int taskId = await _TaskService.DeleteTask(taskDto);
            if (taskId == 0)
            {
                return NotFound(new
                {
                    success = false,
                    message = "Delete failed. Task not found."
                });
            }
            return Ok(new
            {
                success = true,
                message = "Task deleted successfully."
            });
        }

        [HttpPut("UpdateTask")]
        public async Task<IActionResult> UpdateTask([FromBody] DTO_TaskDetails taskDto)
        {
            int taskId = await _TaskService.UpdateTask(taskDto);
            if (taskId == 0)
            {
                return BadRequest(new
                {
                    success = false,
                    message = "Update failed. Task not found."
                });
            }
            return Ok(new
            {
                success = true,
                message = "Task updated successfully."
            });
        }
    }
}
