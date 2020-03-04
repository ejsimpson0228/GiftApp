using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GiftAppWebAPI.Models.DTOs
{
    public class GiftToGiveDTO
    {
        public int GiftId { get; set; }
        public DateTime DateRequested { get; set; }
    }
}
