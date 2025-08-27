using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VisionFlow_Web_API.Interfaces.IServices;
using VisionFlow_Web_API.Models;

namespace VisionFlow_Web_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserManagementController : ControllerBase
    {
        //Current User and Role id parameters are hardcoded for now
        private readonly IUserManagementService _UserManagementService;
        public UserManagementController(IUserManagementService service)
        {
            _UserManagementService = service;
        }

        [HttpPost("RegisterUser")]
        public async Task<IActionResult> RegisterUser([FromBody] DTO_UserRegister userDto)
        {
            int userId = await _UserManagementService.RegisterUser(userDto);
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

        [HttpGet("GetUserList")]
        public async Task<IActionResult> GetUserList()
        {
            var users = await _UserManagementService.GetUserList();

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

        [HttpGet("GetRoles")]
        public async Task<IActionResult> GetRoles()
        {
            var roles = await _UserManagementService.GetRoles();

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
        [HttpPut("UpdateUser")]
        public async Task<IActionResult> UpdateUser([FromBody] DTO_UserRegister userDto)
        {
            int userId = await _UserManagementService.UpdateUser(userDto);
            if (userId == 0)
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
        [HttpDelete("DeleteUser/{id}")]
        public async Task<IActionResult> DeleteUser([FromRoute] int Id)
        {
            int userId = await _UserManagementService.DeleteUser(Id);
            if (userId == 0)
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
    }
}