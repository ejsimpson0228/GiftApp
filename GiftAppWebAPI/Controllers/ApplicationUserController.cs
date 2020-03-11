using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using GiftAppWebAPI.Data.Interfaces;
using GiftAppWebAPI.Models;
using GiftAppWebAPI.Models.Auth;
using GiftAppWebAPI.Models.Logging;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace GiftAppWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationUserController : ControllerBase
    {
        private UserManager<ApplicationUser> _userManager;
        private SignInManager<ApplicationUser> _signInManager;
        private IFriendRepo _friendRepo;
        private readonly ApplicationSettings _appSettings;
        private IUserRepo _userRepo;
        private ILoggingRepo _loggingRepo;

        public ApplicationUserController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, IFriendRepo friendRepo, IOptions<ApplicationSettings> appSettings, IUserRepo userRepo, ILoggingRepo loggingRepo)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _friendRepo = friendRepo;
            _appSettings = appSettings.Value; // used to update hardcoded secret code, able to use from the line under the comment in Startup.cs that reads "Inject AppSettings"
            _userRepo = userRepo;
            _loggingRepo = loggingRepo;
        }

        [HttpPost]
        [HttpOptions]
        [Route("Register")]
        //POST: /api/ApplicationUser/Register
        public async Task<IActionResult> Register(ApplicationUserModel model)
        {
            var applicationUser = new ApplicationUser()
            {
                UserName = model.Username.ToLower(),
                Email = model.Email.ToLower()
            };

            try
            {
                var result = await _userManager.CreateAsync(applicationUser, model.Password);
                return Ok(result);
            }
            catch (Exception ex)
            {
                _loggingRepo.Log(new Log { Message = ex.Message, Date = DateTime.Now });
                return BadRequest(new { message = "Something went wrong. Please try again later." });
            }
        }

        [HttpPost]
        [HttpOptions]
        [Route("Login")]
        //POST: /api/ApplicationUser/Register
        public async Task<IActionResult> Login(LoginModel model)
        {
            try
            {
                var user = await _userManager.FindByNameAsync(model.Username.ToLower());

                if (user != null && await _userManager.CheckPasswordAsync(user, model.Password))
                {
                    var tokenDescriptor = new SecurityTokenDescriptor
                    {
                        Subject = new ClaimsIdentity(new Claim[]
                        {
                        new Claim("UserId", user.Id.ToString())
                        }),
                        Expires = DateTime.UtcNow.AddHours(3),
                        SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_appSettings.JWT_Secret)), SecurityAlgorithms.HmacSha256Signature)
                    };
                    var tokenHandler = new JwtSecurityTokenHandler();
                    var securityToken = tokenHandler.CreateToken(tokenDescriptor);
                    var token = tokenHandler.WriteToken(securityToken);
                    return Ok(new { token });
                }
                else
                    return BadRequest(new { message = "Username or password is incorrect." });
            }
            catch (Exception ex)
            {
                _loggingRepo.Log(new Log { Message = ex.Message, Date = DateTime.Now });
                return BadRequest(new { message = "Something went wrong. Please try again later." });
            }
            
        }

        
    }
}