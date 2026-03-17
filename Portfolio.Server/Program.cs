var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// app.UseHttpsRedirection();

app.MapGet("/api/profile", () =>
{
    var profile = new ProfileData
    {
        Name = "Tomasz Jaworski",
        Title = "Software Engineer",
        Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        Location = "Cracow, Poland (GMT+1/2)",
        Phone = "(+48) 798 412 800",
        Languages = new List<TechData>
        {
            new TechData { Name = "C#", IconUrl = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg", Category = "language", LightColor = "#68217a", DarkColor = "#a179dc" },
            new TechData { Name = "Rust", IconUrl = "src/assets/rust.svg", Category = "language", LightColor = "#d15b36", DarkColor = "#FF7043" }
        },
        Frameworks = new List<TechData>
        {
            new TechData { Name = "Unity", IconUrl = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unity/unity-original.svg", Category = "framework", LightColor = "#000000", DarkColor = "#ffffff" },
            new TechData { Name = ".NET Core", IconUrl = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dotnetcore/dotnetcore-original.svg", Category = "framework", LightColor = "#512bd4", DarkColor = "#a68aee" },
            new TechData { Name = "ASP.NET", IconUrl = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dot-net/dot-net-original.svg", Category = "framework", LightColor = "#512bd4", DarkColor = "#a68aee" }
        },
        Tools = new List<TechData>
        {
            new TechData { Name = "Visual Studio", IconUrl = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/visualstudio/visualstudio-original.svg", Category = "ides & tools", LightColor = "#5C2D91", DarkColor = "#ba7df6" },
            new TechData { Name = "VS Code", IconUrl = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg", Category = "ides & tools", LightColor = "#0078D7", DarkColor = "#3da8ff" },
            new TechData { Name = "Rider", IconUrl = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rider/rider-original.svg", Category = "ides & tools", LightColor = "#E11350", DarkColor = "#ff4d80" },
            new TechData { Name = "Antigravity", IconUrl = "src/assets/antigravity.svg", Category = "ides & tools", LightColor = "#206df0", DarkColor = "#4285F4" }
        },
        Databases = new List<TechData>
        {
            new TechData { Name = "SQL Server", IconUrl = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-original.svg", Category = "database", LightColor = "#b82422", DarkColor = "#CC2927" },
            new TechData { Name = "PostgreSQL", IconUrl = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg", Category = "database", LightColor = "#336791", DarkColor = "#7eb3dd" }
        },
        DevOps = new List<TechData>
        {
            new TechData { Name = "Docker", IconUrl = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg", Category = "devops", LightColor = "#1a70b2", DarkColor = "#2496ed" },
            new TechData { Name = "GitHub Actions", IconUrl = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original.svg", Category = "devops", LightColor = "#2088FF", DarkColor = "#66afff" }
        }
    };

    Thread.Sleep(150);

    return profile;
})
.WithName("GetProfile");

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

app.Run();

class ProfileData
{
    public string Name { get; set; } = string.Empty;
    public string Title { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public List<TechData> Languages { get; set; } = new List<TechData>();
    public List<TechData> Frameworks { get; set; } = new List<TechData>();
    public List<TechData> Tools { get; set; } = new List<TechData>();
    public List<TechData> Databases { get; set; } = new List<TechData>();
    public List<TechData> DevOps { get; set; } = new List<TechData>();
}

class TechData
{
    public string Name { get; set; } = string.Empty;
    public string IconUrl { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;
    public string LightColor { get; set; } = string.Empty;
    public string DarkColor { get; set; } = string.Empty;
}

class ProjectData
{
    public int Id { get; set; }
    public int Order { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string ThumbnailUrl { get; set; } = string.Empty;
    public string GithubUrl { get; set; } = string.Empty;
    public string DemoUrl { get; set; } = string.Empty;
    public List<TechData> Technologies { get; set; } = new List<TechData>();
}