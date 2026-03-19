using Microsoft.EntityFrameworkCore;
using Portfolio.Server.Models;

namespace Portfolio.Server.Data;

public class DatabaseContext : DbContext
{
    public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
    {
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<ProfileData>()
            .HasMany(p => p.Technologies)
            .WithMany();

        modelBuilder.Entity<ProjectData>()
            .HasMany(p => p.Technologies)
            .WithMany();

        modelBuilder.Entity<TechData>()
            .HasOne<TechCategoryData>()
            .WithMany()
            .HasForeignKey(t => t.Category);

        modelBuilder.Entity<TechCategoryData>().HasData(
            new TechCategoryData { Name = "language" },
            new TechCategoryData { Name = "framework" },
            new TechCategoryData { Name = "database" },
            new TechCategoryData { Name = "devops" },
            new TechCategoryData { Name = "ides & tools" }
        );

        modelBuilder.Entity<TechData>().HasData(
            new TechData { Id = 1, Name = "C#", IconUrl = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg", Category = "language", LightColor = "#68217a", DarkColor = "#a179dc" },
            new TechData { Id = 2, Name = "ASP.NET", IconUrl = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dot-net/dot-net-original.svg", Category = "framework", LightColor = "#512bd4", DarkColor = "#a68aee" },
            new TechData { Id = 3, Name = "React", IconUrl = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", Category = "framework", LightColor = "#0b8da8", DarkColor = "#61dafb" },
            new TechData { Id = 4, Name = "TypeScript", IconUrl = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg", Category = "language", LightColor = "#3178c6", DarkColor = "#6ba5e7" },
            new TechData { Id = 5, Name = "SQL Server", IconUrl = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-original.svg", Category = "database", LightColor = "#b82422", DarkColor = "#CC2927" },
            new TechData { Id = 6, Name = "Docker", IconUrl = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg", Category = "devops", LightColor = "#1a70b2", DarkColor = "#2496ed" },
            new TechData { Id = 7, Name = "Rust", IconUrl = "src/assets/rust.svg", Category = "language", LightColor = "#d15b36", DarkColor = "#FF7043" },
            new TechData { Id = 8, Name = "Unity", IconUrl = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unity/unity-original.svg", Category = "framework", LightColor = "#000000", DarkColor = "#ffffff" },
            new TechData { Id = 9, Name = ".NET Core", IconUrl = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dotnetcore/dotnetcore-original.svg", Category = "framework", LightColor = "#512bd4", DarkColor = "#a68aee" },
            new TechData { Id = 10, Name = "Visual Studio", IconUrl = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/visualstudio/visualstudio-original.svg", Category = "ides & tools", LightColor = "#5C2D91", DarkColor = "#ba7df6" },
            new TechData { Id = 11, Name = "VS Code", IconUrl = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg", Category = "ides & tools", LightColor = "#0078D7", DarkColor = "#3da8ff" },
            new TechData { Id = 12, Name = "Rider", IconUrl = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rider/rider-original.svg", Category = "ides & tools", LightColor = "#E11350", DarkColor = "#ff4d80" },
            new TechData { Id = 13, Name = "Antigravity", IconUrl = "src/assets/antigravity.svg", Category = "ides & tools", LightColor = "#206df0", DarkColor = "#4285F4" },
            new TechData { Id = 14, Name = "PostgreSQL", IconUrl = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg", Category = "database", LightColor = "#336791", DarkColor = "#7eb3dd" },
            new TechData { Id = 15, Name = "GitHub Actions", IconUrl = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original.svg", Category = "devops", LightColor = "#2088FF", DarkColor = "#66afff" }
        );

        modelBuilder.Entity<ProfileData>().HasData(
            new ProfileData
            {
                Id = 1,
                Name = "Tomasz Jaworski",
                Title = "Software Engineer",
                PhotoUrl = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=256&h=256",
                Description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
                Location = "Cracow, Poland",
                Phone = "(+48) 798 412 800",
            }
        );
    }

    public DbSet<ProfileData> Profiles { get; set; }
    public DbSet<ProjectData> Projects { get; set; }
    public DbSet<TechData> Technologies { get; set; }
    public DbSet<TechCategoryData> TechCategories { get; set; }
}