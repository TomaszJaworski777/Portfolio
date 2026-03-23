namespace Portfolio.Server.Models;

public class AnalyticsEvent
{
    public int Id { get; set; }
    public string EventType { get; set; } = string.Empty;
    public string HashedIp { get; set; } = string.Empty;
    public int? ProjectId { get; set; }
    public DateTime Timestamp { get; set; } = DateTime.UtcNow;
}
