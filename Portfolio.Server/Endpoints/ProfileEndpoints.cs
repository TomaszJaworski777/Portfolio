using Microsoft.EntityFrameworkCore;
using Portfolio.Server.Data;
using Portfolio.Server.Models;
using System.Linq;

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
                return Results.NotFound();
            }

            return Results.Ok(new
            {
                profile.Name,
                profile.Title,
                profile.PhotoUrl,
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

        group.MapPut("/", async (ProfileUpdateDto dto, DatabaseContext context) =>
        {
            Thread.Sleep(150);

            var profile = await context.Profiles.Include(p => p.Technologies).FirstOrDefaultAsync();

            if (profile == null)
            {
                return Results.NotFound();
            }

            profile.Name = dto.Name;
            profile.Title = dto.Title;
            profile.PhotoUrl = dto.PhotoUrl ?? string.Empty;
            profile.Description = dto.Description;
            profile.Location = dto.Location;
            profile.Phone = dto.Phone;

            var allSelectedNames = (dto.Languages ?? new())
                .Concat(dto.Frameworks ?? new())
                .Concat(dto.Tools ?? new())
                .Concat(dto.Databases ?? new())
                .Concat(dto.DevOps ?? new())
                .Select(t => t.Name)
                .Distinct()
                .ToList();

            profile.Technologies = await context.Technologies
                .Where(t => allSelectedNames.Contains(t.Name))
                .ToListAsync();

            await context.SaveChangesAsync();

            return Results.NoContent();
        })
        .WithName("UpdateProfile");
    }
}

record ProfileUpdateDto(
    string Name,
    string Title,
    string? PhotoUrl,
    string Description,
    string Location,
    string Phone,
    List<TechnologyDto> Languages,
    List<TechnologyDto> Frameworks,
    List<TechnologyDto> Tools,
    List<TechnologyDto> Databases,
    List<TechnologyDto> DevOps
);

 