using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GiftAppWebAPI.Data.Interfaces
{
    public interface IUserRepo
    {
        Task<List<string>> GetUsernames();
    }
}
