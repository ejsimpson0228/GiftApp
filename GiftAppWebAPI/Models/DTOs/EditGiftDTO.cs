using GiftAppWebAPI.Models.Application;

namespace GiftAppWebAPI.Models.DTOs
{
    public class EditGiftDTO
    {
        public int GiftId { get; set; }
        public string NewGiftName { get; set; }
        public int NewQuantity { get; set; }
        public bool NewIsNew { get; set; }
    }
}
