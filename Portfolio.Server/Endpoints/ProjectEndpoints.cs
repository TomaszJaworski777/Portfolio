using Microsoft.EntityFrameworkCore;
using Portfolio.Server.Data;

namespace Portfolio.Server.Endpoints;

public static class ProjectEndpoints
{
    public static void MapProjectEndpoints(this IEndpointRouteBuilder app)
{
        var group = app.MapGroup("/api/projects").WithTags("Projects");

        group.MapGet("/", async (DatabaseContext context) =>
        {
            Thread.Sleep(150);

            return await context.Projects.Include(p => p.Technologies).OrderBy(p => p.Order).ToListAsync();
        })  
        .WithName("GetProjects");
    }
}
