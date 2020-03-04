using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GiftAppWebAPI.Models.Application
{
    public class Gift
    {
        public int Id { get; set; }
        public string GiverUsername { get; set; }
        public string ReceiverUsername { get; set; }
        public string Name { get; set; }
        public int Quantity { get; set; }
        public bool IsNew { get; set; }
    }
}
