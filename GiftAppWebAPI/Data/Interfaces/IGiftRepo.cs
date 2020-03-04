using GiftAppWebAPI.Models.Application;
using GiftAppWebAPI.Models.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GiftAppWebAPI.Data.Interfaces
{
    public interface IGiftRepo
    {
        Task<IEnumerable<Gift>> GetUserReceivedGifts(string userName);
        Task<IEnumerable<Gift>> GetUserGivenGifts(string userName);
        Task<IEnumerable<Gift>> GetUserGivenGifts(string userNameFrom, string userNameTo);
        Task<IEnumerable<ClaimedGift>> GetUserRequestedGifts(string userName);
        Task<IEnumerable<ClaimedGift>> GetUserGivenGiftsRequested(string userName);
        Task<bool> RequestGift(Gift gift, DateTime dateRequested);
        Task<bool> CancelRequest(CancelGiftRequestDTO cancelRequest);
        Task<bool> GiveGift(Gift gift);
        Task<Gift> GetGiftById(int id);
        Task<Gift> AddQuantityToGift(int giftId, int quantityToAdd);
        Task<Gift> EditGift(EditGiftDTO editGiftDTO);
        Task<bool> DeleteGift(int giftId);
    }
}
