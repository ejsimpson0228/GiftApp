using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GiftAppWebAPI.Models.Auth;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace GiftAppWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserProfileController : ControllerBase
    {
        private UserManager<ApplicationUser> _userManager;

        public UserProfileController(UserManager<ApplicationUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet]
        [Authorize]
        //GET: /api/UserProfile
        public async Task<Object> GetUserProfile()
        {
            string userId = User.Claims.First(c => c.Type == "UserId").Value; //We gave the token the UserId type in the login method of the ApplicationUserController
            var user = await _userManager.FindByIdAsync(userId);

            return new
            {
                user.FullName,
                user.Email,
                user.UserName
            };
        }
    }
}