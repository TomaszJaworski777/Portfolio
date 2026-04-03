using Microsoft.EntityFrameworkCore;
using Portfolio.Server.Data;

namespace Portfolio.Server.Endpoints;

public static class FilterEndpoints
{
    public static void MapFilterEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/filters").WithTags("Filters");

        group.MapGet("/", async (DatabaseContext context) =>
        {

            return await context.Technologies
                .Where(t => context.Projects.Any(p => p.Technologies.Any(tp => tp.Id == t.Id)))
                .OrderBy(t => t.Name.ToLower())
                .ToListAsync();
        })
        .WithName("GetFilters");
    }
}
