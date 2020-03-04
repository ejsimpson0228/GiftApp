using GiftAppWebAPI.Data.Interfaces;
using GiftAppWebAPI.Models;
using GiftAppWebAPI.Models.Application;
using GiftAppWebAPI.Models.Auth;
using GiftAppWebAPI.Models.DTOs;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using GiftAppWebAPI.Data.Extensions;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Transactions;
using System;

namespace GiftAppWebAPI.Data.EFRepos
{
    public class FriendRepoEF : IFriendRepo
    {
        private DatabaseContext _context;
        private UserManager<ApplicationUser> _userManager;

        public FriendRepoEF(DatabaseContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        public async Task<bool> DeleteFriendRequest(int friendRequestId)
        {
            try
            {
                var friendRequestToDelete = await _context.FriendRequests.FirstOrDefaultAsync(r => r.Id == friendRequestId);
                _context.FriendRequests.Remove(friendRequestToDelete);

                if (await _context.SaveChangesAsync() > 0)
                    return true;

                return false;
            }
            catch
            {
                return false;
            }
        }

        public async Task<bool> ConfirmFriendRequest(int requestId)
        {
            try
            {
                var friendRequestToConfirm = await _context.FriendRequests.Include(f => f.UserFrom).FirstOrDefaultAsync(f => f.Id == requestId);

                using (TransactionScope ts = new TransactionScope(TransactionScopeAsyncFlowOption.Enabled))
                {
                    if (friendRequestToConfirm != null)
                        _context.FriendRequests.Remove(friendRequestToConfirm);
                    else
                        return false;

                    await _context.Friends.AddAsync(new Friend()
                    {
                        User = friendRequestToConfirm.UserFrom,
                        FriendUser = friendRequestToConfirm.UserTo
                    });

                    await _context.Friends.AddAsync(new Friend()
                    {
                        User = friendRequestToConfirm.UserTo,
                        FriendUser = friendRequestToConfirm.UserFrom
                    });

                    if (await _context.SaveChangesAsync() > 0)
                    {
                        ts.Complete();
                        return true;
                    }
                    else
                    {
                        return false;
                    }

                }
            }
            catch (Exception ex)
            {
                return false;
            }
            
        }

        public async Task<IEnumerable<ApplicationUser>> GetFriends(ApplicationUser user)
        {
            var friendItems = await _context.Friends.Where(f => f.User == user).Include(f => f.FriendUser).ToListAsync(); 

            List<ApplicationUser> friends = new List<ApplicationUser>();

            foreach (var item in friendItems)
            {
                friends.Add(item.FriendUser);
            }

            return friends;
        }

        public async Task<IEnumerable<FriendRequestDTO>> GetReceivedFriendRequests(ApplicationUser user)
        {
            var receivedRequests = await _context.FriendRequests.Where(f => f.UserTo == user).Include(f => f.UserFrom).ToListAsync();

            return receivedRequests.ToFriendRequestDTOList(); ;
        }

        public async Task<IEnumerable<FriendRequestDTO>> GetSentFriendRequests(ApplicationUser user)
        {
            var sentRequests = await _context.FriendRequests.Where(f => f.UserFrom == user).Include(f => f.UserTo).ToListAsync();

            return sentRequests.ToFriendRequestDTOList();
        }

        public async Task<FriendRequestDTO> SendFriendRequest(ApplicationUser userFrom, string usernameTo)
        {
            if (string.IsNullOrEmpty(usernameTo))
                return null;

            var userTo = await _userManager.FindByNameAsync(usernameTo);

            var sentRequest = new FriendRequest()
            {
                UserFrom = userFrom,
                UserTo = userTo
            };

            _context.FriendRequests.Add(sentRequest);

            if (await _context.SaveChangesAsync() > 0)
                return sentRequest.ToFriendRequestDTO();

            return null;
        }

        public async Task<bool> UserExists(string username)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.UserName == username);

            return user != null;
        }

        
    }
}
