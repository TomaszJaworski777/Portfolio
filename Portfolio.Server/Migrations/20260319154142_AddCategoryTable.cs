using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Portfolio.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddCategoryTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TechCategories",
                columns: table => new
                {
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TechCategories", x => x.Name);
                });

            migrationBuilder.InsertData(
                table: "TechCategories",
                column: "Name",
                values: new object[]
                {
                    "database",
                    "devops",
                    "framework",
                    "ides & tools",
                    "language"
                });

            migrationBuilder.CreateIndex(
                name: "IX_Technologies_Category",
                table: "Technologies",
                column: "Category");

            migrationBuilder.AddForeignKey(
                name: "FK_Technologies_TechCategories_Category",
                table: "Technologies",
                column: "Category",
                principalTable: "TechCategories",
                principalColumn: "Name",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Technologies_TechCategories_Category",
                table: "Technologies");

            migrationBuilder.DropTable(
                name: "TechCategories");

            migrationBuilder.DropIndex(
                name: "IX_Technologies_Category",
                table: "Technologies");
        }
    }
}
