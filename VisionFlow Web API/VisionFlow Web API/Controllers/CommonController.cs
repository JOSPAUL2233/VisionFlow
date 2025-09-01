using Microsoft.AspNetCore.Mvc;
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
        [HttpGet("GetProjectStatusList")]
        public async Task<IActionResult> GetProjectStatusList()
        {
            var statusList = await _CommonService.GetProjectStatusList();

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

        [HttpPost("GetAssignedToList")]
        public async Task<IActionResult> GetAssignedToList([FromBody] DTO_GetAssignedToPARA para)
        {
            var assignedToList = await _CommonService.GetAssignedToList(para.userId, para.roleId);

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