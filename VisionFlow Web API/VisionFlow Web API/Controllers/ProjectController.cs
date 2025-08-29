using Microsoft.AspNetCore.Mvc;
using VisionFlow_Web_API.Interfaces.IServices;
using VisionFlow_Web_API.Models;

namespace VisionFlow_Web_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectController : ControllerBase
    {

        private readonly IProjectService _ProjectService;
        public ProjectController(IProjectService service)
        {
            _ProjectService = service;
        }

        [HttpPost("GetProjectList")]
        public async Task<IActionResult> GetProjectList([FromBody] int userId)
        {
            var users = await _ProjectService.GetProjectList(userId);

            if (users == null)
            {
                return Ok(new
                {
                    success = false,
                    message = "Could not fetch user details.",
                    data = users
                });
            }

            if (!users.Any())
            {
                return Ok(new
                {
                    success = false,
                    message = "No Users Found.",
                    data = users
                });
            }

            return Ok(new
            {
                success = true,
                data = users
            });
        }

        [HttpPost("CreateProject")]
        public async Task<IActionResult> CreateProject([FromBody] DTO_ProjectDetails projectDto)
        {
            int userId = await _ProjectService.CreateProject(projectDto);
            if (userId == 0)
            {
                return BadRequest(new
                {
                    success = false,
                    message = "User registration failed."
                });
            }
            return Ok(new
            {
                success = true,
                message = "User created successfully.",
                data = new { userId }
            });
        }

        [HttpDelete("DeleteProject")]
        public async Task<IActionResult> DeleteProject([FromBody] DTO_ProjectDetails projectDto)
        {
            int projectId = await _ProjectService.DeleteProject(projectDto);
            if (projectId == 0)
            {
                return NotFound(new
                {
                    success = false,
                    message = "Delete failed. User not found."
                });
            }
            return Ok(new
            {
                success = true,
                message = "User deleted successfully."
            });
        }

        [HttpPut("UpdateProject")]
        public async Task<IActionResult> UpdateProject([FromBody] DTO_ProjectDetails projectDto)
        {
            int projectId = await _ProjectService.UpdateProject(projectDto);
            if (projectId == 0)
            {
                return BadRequest(new
                {
                    success = false,
                    message = "Update failed. User not found."
                });
            }
            return Ok(new
            {
                success = true,
                message = "User updated successfully."
            });
        }

    }
}
