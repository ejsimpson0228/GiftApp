using GiftAppWebAPI.Models.Auth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GiftAppWebAPI.Models.Application
{
    public class FriendRequest
    {
        public int Id { get; set; }
        public ApplicationUser UserFrom { get; set; }
        public ApplicationUser UserTo { get; set; }
    }
}
