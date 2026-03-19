using Microsoft.EntityFrameworkCore;
using Portfolio.Server.Data;
using Portfolio.Server.Models;

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

        group.MapPost("/", async (TechData dto, DatabaseContext context) =>
        {
            Thread.Sleep(150);

            var tech = new TechData
            {
                Name = dto.Name,
                Category = dto.Category,
                IconUrl = dto.IconUrl,
                DarkColor = dto.DarkColor,
                LightColor = dto.LightColor
            };

            context.Technologies.Add(tech);
            await context.SaveChangesAsync();

            return Results.Created($"/api/technologies/{tech.Id}", tech);
        })
        .WithName("CreateTechnology");

        group.MapPut("/{id}", async (int id, TechData dto, DatabaseContext context) =>
        {
            Thread.Sleep(150);

            var tech = await context.Technologies.FindAsync(id);

            if (tech == null)
            {
                return Results.NotFound();
            }

            tech.Name = dto.Name;
            tech.Category = dto.Category;
            tech.IconUrl = dto.IconUrl;
            tech.DarkColor = dto.DarkColor;
            tech.LightColor = dto.LightColor;

            await context.SaveChangesAsync();

            return Results.NoContent();
        })
        .WithName("UpdateTechnology");

        group.MapDelete("/{id}", async (int id, DatabaseContext context) =>
        {
            Thread.Sleep(150);

            var tech = await context.Technologies.FindAsync(id);

            if (tech == null)
            {
                return Results.NotFound();
            }

            context.Technologies.Remove(tech);
            await context.SaveChangesAsync();

            return Results.NoContent();
        })
        .WithName("DeleteTechnology");
    }
}

