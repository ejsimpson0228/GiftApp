using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GiftAppWebAPI.Models.Application
{
    public class ClaimedGift
    {
        public int Id { get; set; }
        public Gift Gift { get; set; }
        public DateTime DateRequested { get; set; }
    }
}
