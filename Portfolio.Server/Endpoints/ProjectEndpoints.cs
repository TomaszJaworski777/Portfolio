using Portfolio.Server.Models;

namespace Portfolio.Server.Endpoints;

public static class ProjectEndpoints
{
    public static void MapProjectEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/api/projects", () =>
        {
            var projects = new List<ProjectData>();

            for(int i = 0; i < 30; i++)
            {
                var tech = new List<TechData>();

                if( i % 2 == 0 ) {
                    tech.Add( new TechData { Name = "C#", IconUrl = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg", Category = "language", LightColor = "#68217a", DarkColor = "#a179dc" } );
                    tech.Add( new TechData { Name = "ASP.NET", IconUrl = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dot-net/dot-net-original.svg", Category = "framework", LightColor = "#512bd4", DarkColor = "#a68aee" } );
                }
                else {
                    tech.Add( new TechData { Name = "Rust", IconUrl = "src/assets/rust.svg", Category = "language", LightColor = "#d15b36", DarkColor = "#FF7043" } );
                }

                if( i % 3 == 0 ) {
                    tech.Add( new TechData { Name = "Docker", IconUrl = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg", Category = "devops", LightColor = "#1a70b2", DarkColor = "#2496ed" } );
                }

                if( i % 4 == 0 ) {
                    tech.Add( new TechData { Name = "Unity", IconUrl = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unity/unity-original.svg", Category = "framework", LightColor = "#000000", DarkColor = "#ffffff" } );
                }
                
                projects.Add( new ProjectData
                {
                    Id = i + 1,
                    Order = i,
                    Name = $"Project {i + 1}",
                    Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                    GithubUrl = "",
                    DemoUrl = "",
                    Technologies = tech,
                } );
            }

            projects.Sort((a, b) => a.Order.CompareTo(b.Order));

            Thread.Sleep(150);

            return projects;
        })  
        .WithName("GetProjects");
    }
}
