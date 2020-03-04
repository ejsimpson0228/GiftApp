using GiftAppWebAPI.Data.Interfaces;
using GiftAppWebAPI.Models;
using GiftAppWebAPI.Models.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GiftAppWebAPI.Data.EFRepos
{
    public class LoggingRepoEf : ILoggingRepo
    {
        private DatabaseContext _context;

        public LoggingRepoEf(DatabaseContext context)
        {
            _context = context;
        }
        public void Log(Log log)
        {
            _context.Logs.AddAsync(log);

            _context.SaveChangesAsync();
        }
    }
}
