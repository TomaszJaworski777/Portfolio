using Microsoft.EntityFrameworkCore;
using Portfolio.Server.Data;
using Portfolio.Server.Models;

namespace Portfolio.Server.Endpoints;

public static class ProjectEndpoints
{
    public static void MapProjectEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/projects").WithTags("Projects");

        group.MapGet("/", async (DatabaseContext context) =>
        {
            Thread.Sleep(150);

            var categoryOrder = new Dictionary<string, int>
            {
                { "language", 0 },
                { "framework", 1 },
                { "database", 2 },
                { "devops", 3 },
                { "ides & tools", 4 }
            };
            
            var projects = await context.Projects.Include(p => p.Technologies).OrderBy(p => p.Order).ToListAsync();
            
            var projectIds = projects.Select(p => p.Id).ToList();
            var analytics = await context.AnalyticsEvents
                .Where(a => a.ProjectId != null && projectIds.Contains(a.ProjectId.Value))
                .GroupBy(a => new { a.ProjectId, a.EventType })
                .Select(g => new { 
                    ProjectId = g.Key.ProjectId, 
                    EventType = g.Key.EventType, 
                    UniqueVisits = g.Select(x => x.HashedIp).Distinct().Count() 
                })
                .ToListAsync();

            projects.ForEach(p => {
                p.Technologies = p.Technologies
                    .OrderBy(t => categoryOrder.GetValueOrDefault(t.Category.ToLower(), 99))
                    .ThenBy(t => t.Name)
                    .ToList();
                p.UniqueDemoVisits = analytics.FirstOrDefault(a => a.ProjectId == p.Id && a.EventType == "ProjectClick_Demo")?.UniqueVisits ?? 0;
                p.UniqueGithubVisits = analytics.FirstOrDefault(a => a.ProjectId == p.Id && a.EventType == "ProjectClick_Github")?.UniqueVisits ?? 0;
            });
            return projects;
        })  
        .WithName("GetProjects");

        group.MapPost("/", async (ProjectData dto, DatabaseContext context) =>
        {
            Thread.Sleep(150);

            var project = new ProjectData
            {
                Order = dto.Order,
                Name = dto.Name,
                Description = dto.Description,
                ThumbnailUrl = dto.ThumbnailUrl,
                GithubUrl = dto.GithubUrl,
                DemoUrl = dto.DemoUrl,
            };

            var projectTech = dto.Technologies.Select(t => t.Id).ToList();

            project.Technologies = await context.Technologies.Where( t => projectTech.Contains(t.Id) ).ToListAsync();

            context.Projects.Add(project);
            await context.SaveChangesAsync();

            return Results.Created($"/api/project/{project.Id}", project);
        })
        .WithName("AddProject")
        .AddEndpointFilter<AuthFilter>();

        group.MapPut("/{id}", async (int id, ProjectData dto, DatabaseContext context) =>
        {
            Thread.Sleep(150);

            var project = await context.Projects.Include(p => p.Technologies).FirstOrDefaultAsync(p => p.Id == id);

            if(project == null)
            {
                return Results.NotFound();
            }

            project.Order = dto.Order;
            project.Name = dto.Name;
            project.Description = dto.Description;
            project.ThumbnailUrl = dto.ThumbnailUrl;
            project.GithubUrl = dto.GithubUrl;
            project.DemoUrl = dto.DemoUrl;

            var projectTech = dto.Technologies.Select(t => t.Id).ToList();

            project.Technologies = await context.Technologies.Where( t => projectTech.Contains(t.Id) ).ToListAsync();

            await context.SaveChangesAsync();

            return Results.NoContent();
        })
        .WithName("UpdateProject")
        .AddEndpointFilter<AuthFilter>();

        group.MapDelete("/{id}", async (int id, DatabaseContext context) =>
        {
            Thread.Sleep(150);

            var project = await context.Projects.Include(p => p.Technologies).FirstOrDefaultAsync(p => p.Id == id);

            if(project == null)
            {
                return Results.NotFound();
            }

            var analyticsToRemove = await context.AnalyticsEvents.Where(a => a.ProjectId == id).ToListAsync();
            context.AnalyticsEvents.RemoveRange(analyticsToRemove);

            context.Projects.Remove(project);
            await context.SaveChangesAsync();

            return Results.NoContent();
        })
        .WithName("DeleteProject")
        .AddEndpointFilter<AuthFilter>();
    }
}