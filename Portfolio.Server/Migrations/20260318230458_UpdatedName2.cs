using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Portfolio.Server.Migrations
{
    /// <inheritdoc />
    public partial class UpdatedName2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Profiles",
                keyColumn: "Id",
                keyValue: 1,
                column: "Name",
                value: "Tomasz Jaworski");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Profiles",
                keyColumn: "Id",
                keyValue: 1,
                column: "Name",
                value: "Tomasz Jaworski 2");
        }
    }
}
