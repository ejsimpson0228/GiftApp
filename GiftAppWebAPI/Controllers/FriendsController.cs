using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GiftAppWebAPI.Data.Interfaces;
using GiftAppWebAPI.Models.Auth;
using GiftAppWebAPI.Models.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace GiftAppWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class FriendsController : ControllerBase
    {
        private IFriendRepo _friendRepo;
        private UserManager<ApplicationUser> _userManager;

        public FriendsController(IFriendRepo friendRepo, UserManager<ApplicationUser> userManager)
        {
            _friendRepo = friendRepo;
            _userManager = userManager;
        }

        [HttpGet]
        [Route("MyFriends")]
        [Authorize]
        public async Task<Object> GetFriends()
        {
            var user = await GetUser();

            return await _friendRepo.GetFriends(user);
        }

        [HttpGet]
        [Route("Requests")]
        [Authorize]
        public async Task<Object> GetFriendRequests()
        {
            var user = await GetUser();

            return await _friendRepo.GetReceivedFriendRequests(user);
        }

        [HttpGet]
        [Route("SentRequests")]
        [Authorize]
        public async Task<Object> GetSentFriendRequests()
        {
            var user = await GetUser();

            return await _friendRepo.GetSentFriendRequests(user);
        }

        [HttpPost]
        [Route("SendRequest/{usernameTo}")]
        [Authorize]
        public async Task<ActionResult> SendFriendRequest(string usernameTo)
        {
            var user = await GetUser();

            // check if user exists
            if (!_friendRepo.UserExists(usernameTo).Result)
                return BadRequest("User does not exist!");

            // check if already friends TODO: make better
            var userFriends = await _friendRepo.GetFriends(user);

            foreach (var friend in userFriends)
            {
                if (friend.UserName.ToLower() == usernameTo.ToLower())
                    return BadRequest("You are already friends with this person");
            }

            var sentRequest = await _friendRepo.SendFriendRequest(user, usernameTo);

            if (sentRequest != null)
                return Ok(sentRequest);
            else
                return BadRequest("Error sending friend request");
        }

        [HttpDelete]
        [Route("Cancel/{requestId}")]
        [Authorize]
        public async Task<ActionResult> CancelSentFriendRequest(int requestId)
        {
            var user = await GetUser();

            if (await _friendRepo.DeleteFriendRequest(requestId))
                return Ok("Friend request canceled");
            else
                return BadRequest("Error canceling request");
        }

        [HttpDelete]
        [Route("Decline/{requestId}")]
        [Authorize]
        public async Task<ActionResult> DeclineReceivedFriendRequest(int requestId)
        {
            var user = await GetUser();

            if (await _friendRepo.DeleteFriendRequest(requestId))
                return Ok("Friend request declined");
            else
                return BadRequest("Error declining request");
        }

        [HttpPost]
        [Route("Confirm/{requestId}")]
        [Authorize]
        public async Task<ActionResult> ConfirmFriendRequest(int requestId)
        {
            var user = await GetUser();

            if (await _friendRepo.ConfirmFriendRequest(requestId))
                return Ok("Friend request confirmed!");
            else
                return BadRequest("Error confirming friend request");
        }

        private async Task<ApplicationUser> GetUser()
        {
            string userId = User.Claims.First(c => c.Type == "UserId").Value;
            return await _userManager.FindByIdAsync(userId);
        }
    }
}