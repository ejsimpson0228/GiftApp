using GiftAppWebAPI.Models.Application;
using GiftAppWebAPI.Models.Auth;
using GiftAppWebAPI.Models.Logging;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace GiftAppWebAPI.Models
{
    public class DatabaseContext : IdentityDbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options):base(options)
        {

        }

        public DbSet<ApplicationUser> ApplicationUsers { get; set; }
        public DbSet<Gift> Gifts { get; set; }
        public DbSet<ClaimedGift> ClaimedGifts { get; set; }
        public DbSet<FriendRequest> FriendRequests { get; set; }
        public DbSet<Friend> Friends { get; set; }
        public DbSet<Log> Logs { get; set; }
    }
}
