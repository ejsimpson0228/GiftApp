using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GiftAppWebAPI.Data.Interfaces;
using GiftAppWebAPI.Models.Application;
using GiftAppWebAPI.Models.Auth;
using GiftAppWebAPI.Models.DTOs;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace GiftAppWebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GiftsController : ControllerBase
    {
        private UserManager<ApplicationUser> _userManager;
        private IGiftRepo _giftRepo;

        public GiftsController(UserManager<ApplicationUser> userManager, IGiftRepo giftRepo)
        {
            _userManager = userManager;
            _giftRepo = giftRepo;
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("MyGifts")]
        public async Task<Object> GetMyGifts()
        {
            var user = await GetUser();

            return await _giftRepo.GetUserReceivedGifts(user.UserName);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("MyRequestedGifts")]
        public async Task<Object> GetMyRequestedGifts()
        {
            var user = await GetUser();

            return await _giftRepo.GetUserRequestedGifts(user.UserName);
        }


        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("GiftsGiven")]
        public async Task<Object> GetGivenGifts()
        {
            var user = await GetUser();

            return await _giftRepo.GetUserGivenGifts(user.UserName);
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("GiftsGivenTo/{usernameTo}")]
        public async Task<List<Gift>> GetGivenGiftsToPerson(string usernameTo)
        {
            var user = await GetUser();

            var gifts = await _giftRepo.GetUserGivenGifts(user.UserName, usernameTo);

            return gifts.ToList();
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("Requests")]
        public async Task<Object> GetTheirRequestedGifts()
        {
            var user = await GetUser();

            return await _giftRepo.GetUserGivenGiftsRequested(user.UserName);
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("Give")]
        public async Task<ActionResult> GiveGift(NewGiftDTO newGiftDTO)
        {
            var user = await GetUser();

            var giftToGive = new Gift()
            {
                Name = newGiftDTO.GiftName,
                Quantity = newGiftDTO.Quantity,
                ReceiverUsername = newGiftDTO.ReceiverUserName,
                GiverUsername = user.UserName,
                IsNew = true
            };

            if (await _giftRepo.GiveGift(giftToGive))
                return Ok(giftToGive);
            else
                return (BadRequest("Could not give gift"));
        }

        [HttpPut]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("Edit")]
        public async Task<ActionResult> EditGift(EditGiftDTO editGiftDTO)
        {
            var editedGift = await _giftRepo.EditGift(editGiftDTO);

            if (editedGift != null)
                return Ok(editedGift);
            else
                return BadRequest("Error editing gift");
        }

        [HttpPut]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("AddQuantity")]
        public async Task<ActionResult> AddQuantity(AddQuantityDTO addQuantityDTO)
        {
            var gift = await _giftRepo.AddQuantityToGift(addQuantityDTO.GiftId, addQuantityDTO.QuantityToAdd);

            if (gift != null)
                return Ok(gift);
            else
                return BadRequest("Error adding quantity to gift!");
        }

        [HttpDelete]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("Delete/{giftId}")]
        public async Task<ActionResult> DeleteGift(int giftId)
        {
            if (await _giftRepo.DeleteGift(giftId))
                return Ok("Gift removed successfully");
            else
                return BadRequest("Unable to delete gift");

        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("Request")]
        public async Task<ActionResult> RequestGift(GiftToGiveDTO giftToGive)
        {
            var requestedGift = await _giftRepo.GetGiftById(giftToGive.GiftId);
            if (await _giftRepo.RequestGift(requestedGift, giftToGive.DateRequested))
                return Ok($"Gift requested for {giftToGive.DateRequested.ToShortDateString()}");

            return BadRequest("Requested gift was invalid");
        }

        [HttpPut]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [Route("Cancel")]
        public async Task<ActionResult> CancelGiftRequest(CancelGiftRequestDTO cancelRequest)
        {
            if (cancelRequest.Id > 0 && await _giftRepo.CancelRequest(cancelRequest))
            {
                return Ok("Gift request was canceled");
            }
            else
                return BadRequest("Error canceling gift");
        }

        private async Task<ApplicationUser> GetUser()
        {
            string userId = User.Claims.First(c => c.Type == "UserId").Value;
            return await _userManager.FindByIdAsync(userId);
        }
    }
}