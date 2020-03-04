using GiftAppWebAPI.Models.Application;
using GiftAppWebAPI.Models.DTOs;
using System.Collections.Generic;

namespace GiftAppWebAPI.Data.Extensions
{
    public static class FriendExtentions
    {
        public static FriendRequestDTO ToFriendRequestDTO (this FriendRequest friendRequest)
        {
            return new FriendRequestDTO()
            {
                Id = friendRequest.Id,
                UsernameTo = friendRequest.UserTo.UserName,
                UsernameFrom = friendRequest.UserFrom.UserName
            };
        }

        public static List<FriendRequestDTO> ToFriendRequestDTOList(this List<FriendRequest> friendRequests)
        {
            var friendRequestDTOs = new List<FriendRequestDTO>();

            foreach (var request in friendRequests)
            {
                var friendRequestDTO = request.ToFriendRequestDTO();
                friendRequestDTOs.Add(friendRequestDTO);
            }

            return friendRequestDTOs;
        }
    }
}
