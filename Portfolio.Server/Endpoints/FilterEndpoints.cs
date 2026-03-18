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
            Thread.Sleep(150);

            return await context.Technologies.OrderBy(t => t.Name.ToLower()).ToListAsync(); // TODO: filters out technologies that are not used in projects
        })
        .WithName("GetFilters");
    }
}
