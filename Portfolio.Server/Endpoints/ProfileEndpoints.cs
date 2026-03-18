using Microsoft.EntityFrameworkCore;
using Portfolio.Server.Data;

namespace Portfolio.Server.Endpoints;

public static class ProfileEndpoints
{
    public static void MapProfileEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/profile").WithTags("Profile");
        
        group.MapGet("/", async (DatabaseContext context) =>
        {
            Thread.Sleep(150);

            var profile = await context.Profiles.Include(p => p.Technologies).FirstOrDefaultAsync();

            if (profile == null)
{
                throw new Exception("Profile not found");
            }

            return Results.Ok(new
            {
                profile.Name,
                profile.Title,
                profile.Description,
                profile.Location,
                profile.Phone,
                Languages = profile.Technologies.Where(t => t.Category == "language"),
                Frameworks = profile.Technologies.Where(t => t.Category == "framework"),
                Tools = profile.Technologies.Where(t => t.Category == "ides & tools"),
                Databases = profile.Technologies.Where(t => t.Category == "database"),
                DevOps = profile.Technologies.Where(t => t.Category == "devops"),
            });
        })
        .WithName("GetProfile");
    }
}
