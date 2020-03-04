using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GiftAppWebAPI.Models.DTOs
{
    public class NewGiftDTO
    {
        public string GiftName { get; set; }
        public int Quantity { get; set; }
        public string ReceiverUserName { get; set; }
    }
}
