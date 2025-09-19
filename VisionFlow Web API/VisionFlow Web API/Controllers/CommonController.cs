using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using VisionFlow_Web_API.Interfaces.IServices;
using VisionFlow_Web_API.Models;
using VisionFlow_Web_API.Service;

namespace VisionFlow_Web_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommonController : ControllerBase
    {
        //Current User and Role id parameters are hardcoded for now
        private readonly ICommonService _CommonService;
        public CommonController(ICommonService service)
        {
            _CommonService = service;
        }

        [HttpGet("GetRoles")]
        public async Task<IActionResult> GetRoles()
        {
            var roles = await _CommonService.GetRoles();

            if (roles == null)
            {
                return Ok(new
                {
                    success = false,
                    message = "Could not fetch role details.",
                    data = roles
                });
            }

            if (!roles.Any())
            {
                return Ok(new
                {
                    success = false,
                    message = "No roles Found.",
                    data = roles
                });
            }

            return Ok(new
            {
                success = true,
                data = roles
            });
        }
        [HttpPost("GetNavbarList")]
        public async Task<IActionResult> GetNavbarList([FromBody] DTO_User user)
        {

            var navDetails = await _CommonService.GetNavbarList(user.userId, user.roleId);

            if (navDetails == null)
            {
                return Ok(new
                {
                    success = false,
                    message = "Could not fetch Navbar details.",
                    data = navDetails
                });
            }

            if (!navDetails.Any())
            {
                return Ok(new
                {
                    success = false,
                    message = "No Navbar List Found.",
                    data = navDetails
                });
            }

            return Ok(new
            {
                success = true,
                data = navDetails
            });
        }


        [HttpGet("GetProjectStatusList")]
        public async Task<IActionResult> GetProjectStatusList()
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "0");
            var roleId = int.TryParse(User.FindFirst("RoleId")?.Value, out var rId) ? rId : 0;
            var statusList = await _CommonService.GetStatusList("project",userId,roleId);

            if (statusList == null)
            {
                return Ok(new
                {
                    success = false,
                    message = "Could not project status details.",
                    data = statusList
                });
            }

            if (!statusList.Any())
            {
                return Ok(new
                {
                    success = false,
                    message = "No status List Found.",
                    data = statusList
                });
            }

            return Ok(new
            {
                success = true,
                data = statusList
            });
        }
        [HttpGet("GetTaskStatusList")]
        public async Task<IActionResult> GetTaskStatusList()
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "0");
            var roleId = int.TryParse(User.FindFirst("RoleId")?.Value, out var rId) ? rId : 0;
            var statusList = await _CommonService.GetStatusList("task",userId,roleId);

            if (statusList == null)
            {
                return Ok(new
                {
                    success = false,
                    message = "Could not find task status details.",
                    data = statusList
                });
            }

            if (!statusList.Any())
            {
                return Ok(new
                {
                    success = false,
                    message = "No status List Found.",
                    data = statusList
                });
            }

            return Ok(new
            {
                success = true,
                data = statusList
            });
        }

        [HttpPost("GetAssignedToList")]
        public async Task<IActionResult> GetAssignedToList()
        {
            var userId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "0");
            var roleId = int.TryParse(User.FindFirst("RoleId")?.Value, out var rId) ? rId : 0;

            var assignedToList = await _CommonService.GetAssignedToList(userId, roleId);

            if (assignedToList == null)
            {
                return Ok(new
                {
                    success = false,
                    message = "Could not fetch assigned to details.",
                    data = assignedToList
                });
            }

            if (!assignedToList.Any())
            {
                return Ok(new
                {
                    success = false,
                    message = "No list Found.",
                    data = assignedToList
                });
            }

            return Ok(new
            {
                success = true,
                data = assignedToList
            });
        }
    }
}