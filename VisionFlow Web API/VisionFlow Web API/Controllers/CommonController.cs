using Microsoft.AspNetCore.Mvc;
using VisionFlow_Web_API.Interfaces.IServices;
using VisionFlow_Web_API.Models;

namespace VisionFlow_Web_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommonController : ControllerBase
    {
        ////Current User and Role id parameters are hardcoded for now
        //private readonly ICommonService _CommonService;
        //public CommonController(ICommonService service)
        //{
        //    _CommonService = service;
        //}
    }
}