using GiftAppWebAPI.Models.Application;
using GiftAppWebAPI.Models.Auth;
using GiftAppWebAPI.Models.DTOs;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace GiftAppWebAPI.Data.Interfaces
{
    public interface IFriendRepo
    {
        Task<IEnumerable<ApplicationUser>> GetFriends(ApplicationUser user);
        Task<FriendRequestDTO> SendFriendRequest(ApplicationUser userFrom, string usernameTo);
        Task<bool> DeleteFriendRequest(int friendRequestId);
        Task<IEnumerable<FriendRequestDTO>> GetReceivedFriendRequests(ApplicationUser user);
        Task<IEnumerable<FriendRequestDTO>> GetSentFriendRequests(ApplicationUser user);
        Task<bool> ConfirmFriendRequest(int friendRequestId);
        Task<bool> UserExists(string username);
    }
}
