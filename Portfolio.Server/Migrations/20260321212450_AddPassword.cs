using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Portfolio.Server.Migrations
{
    /// <inheritdoc />
    public partial class AddPassword : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AdminPasswords",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    PasswordHash = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdminPasswords", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AuthTokens",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Token = table.Column<string>(type: "text", nullable: false),
                    ExpiresAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AuthTokens", x => x.Id);
                });

            migrationBuilder.UpdateData(
                table: "Technologies",
                keyColumn: "Id",
                keyValue: 7,
                column: "IconUrl",
                value: "/src/assets/rust.svg");

            migrationBuilder.UpdateData(
                table: "Technologies",
                keyColumn: "Id",
                keyValue: 13,
                column: "IconUrl",
                value: "/src/assets/antigravity.svg");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AdminPasswords");

            migrationBuilder.DropTable(
                name: "AuthTokens");

            migrationBuilder.UpdateData(
                table: "Technologies",
                keyColumn: "Id",
                keyValue: 7,
                column: "IconUrl",
                value: "src/assets/rust.svg");

            migrationBuilder.UpdateData(
                table: "Technologies",
                keyColumn: "Id",
                keyValue: 13,
                column: "IconUrl",
                value: "src/assets/antigravity.svg");
        }
    }
}
