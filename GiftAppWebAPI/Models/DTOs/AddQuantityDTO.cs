using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GiftAppWebAPI.Models.DTOs
{
    public class AddQuantityDTO
    {
        public int GiftId { get; set; }
        public int QuantityToAdd { get; set; }
    }
}
