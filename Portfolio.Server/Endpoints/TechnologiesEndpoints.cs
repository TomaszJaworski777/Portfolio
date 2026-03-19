using Microsoft.EntityFrameworkCore;
using Portfolio.Server.Data;

namespace Portfolio.Server.Endpoints;

public static class TechnologiesEndpoints
{
    public static void MapTechnologiesEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/technologies").WithTags("Technologies");

        group.MapGet("/", async (DatabaseContext context) =>
        {
            Thread.Sleep(150);

            return await context.Technologies.OrderBy(t => t.Name.ToLower()).ToListAsync();
        })
        .WithName("GetTechnologies");
    }
}
