using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GiftAppWebAPI.Models.DTOs
{
    public class CancelGiftRequestDTO
    {
        public int Id { get; set; }
        public DateTime Date { get; set; }
    }
}
