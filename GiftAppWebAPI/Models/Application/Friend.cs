using GiftAppWebAPI.Models.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GiftAppWebAPI.Models.Application
{
    public class Friend
    {
        public int Id { get; set; }
        public ApplicationUser User { get; set; }
        public ApplicationUser FriendUser { get; set; }
    }
}
