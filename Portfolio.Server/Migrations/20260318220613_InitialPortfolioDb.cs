using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Portfolio.Server.Migrations
{
    /// <inheritdoc />
    public partial class InitialPortfolioDb : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Profiles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    Location = table.Column<string>(type: "text", nullable: false),
                    Phone = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Profiles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Projects",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Order = table.Column<int>(type: "integer", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    ThumbnailUrl = table.Column<string>(type: "text", nullable: false),
                    GithubUrl = table.Column<string>(type: "text", nullable: false),
                    DemoUrl = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Projects", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Technologies",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    IconUrl = table.Column<string>(type: "text", nullable: false),
                    Category = table.Column<string>(type: "text", nullable: false),
                    LightColor = table.Column<string>(type: "text", nullable: false),
                    DarkColor = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Technologies", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ProfileDataTechData",
                columns: table => new
                {
                    ProfileDataId = table.Column<int>(type: "integer", nullable: false),
                    TechnologiesId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProfileDataTechData", x => new { x.ProfileDataId, x.TechnologiesId });
                    table.ForeignKey(
                        name: "FK_ProfileDataTechData_Profiles_ProfileDataId",
                        column: x => x.ProfileDataId,
                        principalTable: "Profiles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProfileDataTechData_Technologies_TechnologiesId",
                        column: x => x.TechnologiesId,
                        principalTable: "Technologies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProjectDataTechData",
                columns: table => new
                {
                    ProjectDataId = table.Column<int>(type: "integer", nullable: false),
                    TechnologiesId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectDataTechData", x => new { x.ProjectDataId, x.TechnologiesId });
                    table.ForeignKey(
                        name: "FK_ProjectDataTechData_Projects_ProjectDataId",
                        column: x => x.ProjectDataId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProjectDataTechData_Technologies_TechnologiesId",
                        column: x => x.TechnologiesId,
                        principalTable: "Technologies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Profiles",
                columns: new[] { "Id", "Description", "Location", "Name", "Phone", "Title" },
                values: new object[] { 1, "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.", "Cracow, Poland", "Tomasz Jaworski", "(+48) 798 412 800", "Software Engineer" });

            migrationBuilder.InsertData(
                table: "Technologies",
                columns: new[] { "Id", "Category", "DarkColor", "IconUrl", "LightColor", "Name" },
                values: new object[,]
                {
                    { 1, "language", "#a179dc", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg", "#68217a", "C#" },
                    { 2, "framework", "#a68aee", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dot-net/dot-net-original.svg", "#512bd4", "ASP.NET" },
                    { 3, "framework", "#61dafb", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg", "#0b8da8", "React" },
                    { 4, "language", "#6ba5e7", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg", "#3178c6", "TypeScript" },
                    { 5, "database", "#CC2927", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-original.svg", "#b82422", "SQL Server" },
                    { 6, "devops", "#2496ed", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg", "#1a70b2", "Docker" },
                    { 7, "language", "#FF7043", "src/assets/rust.svg", "#d15b36", "Rust" },
                    { 8, "framework", "#ffffff", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/unity/unity-original.svg", "#000000", "Unity" },
                    { 9, "framework", "#a68aee", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dotnetcore/dotnetcore-original.svg", "#512bd4", ".NET Core" },
                    { 10, "ides & tools", "#ba7df6", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/visualstudio/visualstudio-original.svg", "#5C2D91", "Visual Studio" },
                    { 11, "ides & tools", "#3da8ff", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg", "#0078D7", "VS Code" },
                    { 12, "ides & tools", "#ff4d80", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rider/rider-original.svg", "#E11350", "Rider" },
                    { 13, "ides & tools", "#4285F4", "src/assets/antigravity.svg", "#206df0", "Antigravity" },
                    { 14, "database", "#7eb3dd", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg", "#336791", "PostgreSQL" },
                    { 15, "devops", "#66afff", "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/githubactions/githubactions-original.svg", "#2088FF", "GitHub Actions" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProfileDataTechData_TechnologiesId",
                table: "ProfileDataTechData",
                column: "TechnologiesId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectDataTechData_TechnologiesId",
                table: "ProjectDataTechData",
                column: "TechnologiesId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ProfileDataTechData");

            migrationBuilder.DropTable(
                name: "ProjectDataTechData");

            migrationBuilder.DropTable(
                name: "Profiles");

            migrationBuilder.DropTable(
                name: "Projects");

            migrationBuilder.DropTable(
                name: "Technologies");
        }
    }
}
