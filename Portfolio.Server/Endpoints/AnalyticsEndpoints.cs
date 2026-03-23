using System.Security.Cryptography;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Portfolio.Server.Data;
using Portfolio.Server.Models;

namespace Portfolio.Server.Endpoints;

public static class AnalyticsEndpoints
{
    private static string HashIp(string ipAddress)
    {
        if (string.IsNullOrEmpty(ipAddress)) return string.Empty;
        using var sha256 = SHA256.Create();
        var bytes = Encoding.UTF8.GetBytes(ipAddress);
        var hash = sha256.ComputeHash(bytes);
        return Convert.ToBase64String(hash);
    }

    public class ProjectClickDto
    {
        public string Type { get; set; } = string.Empty; // "demo" or "github"
    }

    public static void MapAnalyticsEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/analytics").WithTags("Analytics");

        group.MapPost("/visit", async (HttpContext httpContext, DatabaseContext context) =>
        {
            var ip = httpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown";
            var hashedIp = HashIp(ip);

            var analyticsEvent = new AnalyticsEvent
            {
                EventType = "SiteVisit",
                HashedIp = hashedIp,
                Timestamp = DateTime.UtcNow
            };

            context.AnalyticsEvents.Add(analyticsEvent);
            await context.SaveChangesAsync();

            return Results.Ok();
        })
        .WithName("RecordSiteVisit");

        group.MapPost("/project/{id}/click", async (int id, ProjectClickDto dto, HttpContext httpContext, DatabaseContext context) =>
        {
            var ip = httpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown";
            var hashedIp = HashIp(ip);

            var eventType = dto.Type.ToLower() == "github" ? "ProjectClick_Github" : "ProjectClick_Demo";

            var analyticsEvent = new AnalyticsEvent
            {
                EventType = eventType,
                HashedIp = hashedIp,
                ProjectId = id,
                Timestamp = DateTime.UtcNow
            };

            context.AnalyticsEvents.Add(analyticsEvent);
            await context.SaveChangesAsync();

            return Results.Ok();
        })
        .WithName("RecordProjectClick");
    }
}
