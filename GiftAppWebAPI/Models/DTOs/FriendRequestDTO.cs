using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GiftAppWebAPI.Models.DTOs
{
    public class FriendRequestDTO
    {
        public int Id { get; set; }
        public string UsernameFrom { get; set; }
        public string UsernameTo { get; set; }
    }
}
