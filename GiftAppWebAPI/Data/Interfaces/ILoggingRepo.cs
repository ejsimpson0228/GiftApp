using GiftAppWebAPI.Models.Logging;

namespace GiftAppWebAPI.Data.Interfaces
{
    public interface ILoggingRepo
    {
        void Log(Log log);
    }
}
