using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Portfolio.Server.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Profiles",
                keyColumn: "Id",
                keyValue: 1,
                column: "Name",
                value: "Tomasz Jaworski 2");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Profiles",
                keyColumn: "Id",
                keyValue: 1,
                column: "Name",
                value: "Tomasz Jaworski");
        }
    }
}
