using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
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

        [Authorize]
        [HttpPost("GetProjectList")]
        public async Task<IActionResult> GetProjectList([FromBody] int userId)
        {

            var uid = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "0");
            var loginName = User.Identity?.Name;

            var projects = await _ProjectService.GetProjectList(userId);

            if (projects == null)
            {
                return Ok(new { success = false, message = "Could not fetch project details.", data = projects });
            }

            if (!projects.Any())
            {
                return Ok(new { success = false, message = "No Projects Found.", data = projects });
            }

            return Ok(new { success = true, data = projects });
        }


        [HttpPost("CreateProject")]
        public async Task<IActionResult> CreateProject([FromBody] DTO_ProjectDetails projectDto)
        {
            int projectId = await _ProjectService.CreateProject(projectDto);
            if (projectId == 0)
            {
                return BadRequest(new
                {
                    success = false,
                    message = "Project registration failed."
                });
            }
            return Ok(new
            {
                success = true,
                message = "Project created successfully.",
                data = new { projectId }
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
                    message = "Delete failed. Project not found."
                });
            }
            return Ok(new
            {
                success = true,
                message = "Project deleted successfully."
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
                    message = "Update failed. Project not found."
                });
            }
            return Ok(new
            {
                success = true,
                message = "Project updated successfully."
            });
        }

    }
}
