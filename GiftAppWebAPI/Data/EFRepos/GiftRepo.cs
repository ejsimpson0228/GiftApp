using GiftAppWebAPI.Data.Interfaces;
using GiftAppWebAPI.Models;
using GiftAppWebAPI.Models.Application;
using GiftAppWebAPI.Models.Auth;
using GiftAppWebAPI.Models.DTOs;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;

namespace GiftAppWebAPI.Data.EFRepos
{
    public class GiftRepo : IGiftRepo
    {
        private DatabaseContext _context;

        public GiftRepo(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<Gift> AddQuantityToGift(int giftId, int quantityToAdd)
        {
            var gift = await GetGiftById(giftId);
            gift.Quantity = gift.Quantity + quantityToAdd;

            if (await _context.SaveChangesAsync() > 0)
                return gift;
            return null;
        }

        public async Task<bool> CancelRequest(CancelGiftRequestDTO cancelRequest)
        {
            try
            {
                var giftToCancel = await GetGiftById(cancelRequest.Id);
                using (var ts = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
                {
                    giftToCancel.Quantity++;

                    var requestToCancel = await _context.ClaimedGifts.FirstOrDefaultAsync(g => g.Gift.Id == cancelRequest.Id && g.DateRequested == cancelRequest.Date);

                    if (requestToCancel != null)
                        _context.ClaimedGifts.Remove(requestToCancel);

                    

                    if (await _context.SaveChangesAsync() > 0)
                    {
                        ts.Complete();
                        return true;
                    }
                    else
                    {
                        ts.Dispose();
                        return false;
                    }
                        
                }
            }
            catch (Exception ex)
            {
                return false;
            }
            
            
        }

        public async Task<bool> DeleteGift(int giftId)
        {
            var claimedGifts = _context.ClaimedGifts.Include(g => g.Gift).Where(g => g.Gift.Id == giftId);
            foreach (var claimedGift in claimedGifts)
            {
                _context.ClaimedGifts.Remove(claimedGift);
            }

            var gift = await GetGiftById(giftId);
            _context.Gifts.Remove(gift);

            try
            {
                if (await _context.SaveChangesAsync() > 0)
                    return true;
                return false;
            }
            catch (Exception ex)
            {
                var exx = ex;
                return false;
            }
            
        }

        public async Task<Gift> EditGift(EditGiftDTO editGiftDTO)
        {
            var giftToEdit = await _context.Gifts.FirstOrDefaultAsync(g => g.Id == editGiftDTO.GiftId);
            if (giftToEdit.Name == editGiftDTO.NewGiftName && giftToEdit.Quantity == editGiftDTO.NewQuantity && giftToEdit.IsNew == editGiftDTO.NewIsNew)
            {
                return giftToEdit;
            }

            giftToEdit.Name = editGiftDTO.NewGiftName;
            giftToEdit.Quantity = editGiftDTO.NewQuantity;
            giftToEdit.IsNew = editGiftDTO.NewIsNew;

            try
            {
                if (await _context.SaveChangesAsync() > 0)
                    return giftToEdit;
                return null;
            }
            catch (Exception ex)
            {
                var exx = ex;
                return null;
            }

        }

        public async Task<Gift> GetGiftById(int id)
        {
            return await _context.Gifts.FirstOrDefaultAsync(g => g.Id == id);
        }

        public async Task<IEnumerable<Gift>> GetUserGivenGifts(string userName)
        {
            return await _context.Gifts.Where(g => g.GiverUsername == userName && g.Quantity > 0).ToListAsync();
        }

        public async Task<IEnumerable<Gift>> GetUserGivenGifts(string userNameFrom, string userNameTo)
        {
            var gifts = await _context.Gifts.Where(g => g.GiverUsername == userNameFrom && g.ReceiverUsername == userNameTo && g.Quantity > 0).ToListAsync();
            return gifts;
        }

        public async Task<IEnumerable<ClaimedGift>> GetUserGivenGiftsRequested(string userName)
        {
            return await _context.ClaimedGifts
                .Include(c => c.Gift)
                .Where(g => g.Gift.GiverUsername == userName && g.DateRequested >= DateTime.Now.Date)
                .OrderBy(g => g.DateRequested)
                .ToListAsync();
        }

        public async Task<IEnumerable<Gift>> GetUserReceivedGifts(string userName)
        {
            return await _context.Gifts.Where(g => g.ReceiverUsername == userName && g.Quantity > 0).ToListAsync();
        }

        public async Task<IEnumerable<ClaimedGift>> GetUserRequestedGifts(string userName)
        {
            return await _context.ClaimedGifts
                .Include(c => c.Gift)
                .Where(g => g.Gift.ReceiverUsername == userName && g.DateRequested >= DateTime.Now.Date)
                .OrderBy(g => g.DateRequested)
                .ToListAsync();
        }

        public async Task<bool> GiveGift(Gift gift)
        {
            var gifts = _context.Gifts;
            gifts.Add(gift);

            if (await _context.SaveChangesAsync() > 0)
                return true;
            return false;
        }

        public async Task<bool> RequestGift(Gift gift, DateTime dateRequested)
        {
            try
            {
                var gifts = _context.Gifts;
                var giftRequested = await _context.Gifts.FirstOrDefaultAsync(g => g.Name == gift.Name && g.GiverUsername == gift.GiverUsername && g.ReceiverUsername == gift.ReceiverUsername);

                using (var ts = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
                {
                    if (giftRequested.Quantity > 0)
                    {
                        giftRequested.Quantity--;
                    }
                    else
                    {
                        return false;
                    }

                    var requestedGifts = _context.ClaimedGifts;

                    var requestedGift = new ClaimedGift()
                    {
                        Gift = giftRequested,
                        DateRequested = dateRequested
                    };

                    requestedGifts.Add(requestedGift);

                    if (await _context.SaveChangesAsync() > 0)
                    {
                        ts.Complete();
                        return true;
                    }
                    else
                    {
                        ts.Dispose();
                        return false;
                    }

                }
            }
            catch (Exception ex)
            {
                return false;
            }
            

            
        }
    }
}
