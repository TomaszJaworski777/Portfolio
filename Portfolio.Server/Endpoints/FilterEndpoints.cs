using Portfolio.Server.Models;

namespace Portfolio.Server.Endpoints;

public static class FilterEndpoints
{
    public static void MapFilterEndpoints(this IEndpointRouteBuilder app)
    {
        app.MapGet("/api/filters", () =>
        {
            var filters = new List<TechData>
            {
                new TechData { Name = "C#", IconUrl = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg", Category = "language", LightColor = "#68217a", DarkColor = "#a179dc" },
                new TechData { Name = "ASP.NET", IconUrl = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dot-net/dot-net-original.svg", Category = "framework", LightColor = "#512bd4", DarkColor = "#a68aee" },
                new TechData { Name = "React", IconUrl = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", Category = "framework", LightColor = "#0b8da8", DarkColor = "#61dafb" },
                new TechData { Name = "TypeScript", IconUrl = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg", Category = "language", LightColor = "#3178c6", DarkColor = "#6ba5e7" },
                new TechData { Name = "SQL Server", IconUrl = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-original.svg", Category = "database", LightColor = "#b82422", DarkColor = "#CC2927" },
                new TechData { Name = "Docker", IconUrl = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg", Category = "devops", LightColor = "#1a70b2", DarkColor = "#2496ed" },
                new TechData { Name = "Rust", IconUrl = "src/assets/rust.svg", Category = "language", LightColor = "#d15b36", DarkColor = "#FF7043" },
                new TechData { Name = "Unity", IconUrl = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unity/unity-original.svg", Category = "framework", LightColor = "#000000", DarkColor = "#ffffff" },
                new TechData { Name = ".NET Core", IconUrl = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dotnetcore/dotnetcore-original.svg", Category = "framework", LightColor = "#512bd4", DarkColor = "#a68aee" },
                new TechData { Name = "Visual Studio", IconUrl = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/visualstudio/visualstudio-original.svg", Category = "ides & tools", LightColor = "#5C2D91", DarkColor = "#ba7df6" },
                new TechData { Name = "VS Code", IconUrl = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg", Category = "ides & tools", LightColor = "#0078D7", DarkColor = "#3da8ff" },
                new TechData { Name = "Rider", IconUrl = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rider/rider-original.svg", Category = "ides & tools", LightColor = "#E11350", DarkColor = "#ff4d80" },
                new TechData { Name = "Antigravity", IconUrl = "src/assets/antigravity.svg", Category = "ides & tools", LightColor = "#206df0", DarkColor = "#4285F4" },
                new TechData { Name = "PostgreSQL", IconUrl = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg", Category = "database", LightColor = "#336791", DarkColor = "#7eb3dd" },
                new TechData { Name = "GitHub Actions", IconUrl = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original.svg", Category = "devops", LightColor = "#2088FF", DarkColor = "#66afff" }
            };

            filters.Sort((a, b) => string.Compare(a.Name, b.Name, StringComparison.OrdinalIgnoreCase));

            Thread.Sleep(150);

            return filters;
        })
        .WithName("GetFilters");
    }
}
