using GiftAppWebAPI.Data.Interfaces;
using GiftAppWebAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GiftAppWebAPI.Data.EFRepos
{
    public class UserRepo : IUserRepo
    {
        private DatabaseContext _context;

        public UserRepo(DatabaseContext context)
        {
            _context = context;
        }

        public async Task<List<string>> GetUsernames()
        {
            var names = new List<string>();

            var users = _context.ApplicationUsers;

            foreach (var user in users)
            {
                names.Add(user.UserName);
            }

            return names;
        }
    }
}
