using Microsoft.EntityFrameworkCore;
using Portfolio.Server.Data;
using Portfolio.Server.Models;
using System.Security.Cryptography;
using System.Text;

namespace Portfolio.Server.Endpoints;

public static class AuthEndpoints
{
    public static void MapAuthEndpoints(this IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/auth");
        group.MapPost("/login", async (LoginRequest request, DatabaseContext context) =>
        {
            var adminPassword = await context.AdminPasswords.FirstOrDefaultAsync();
            var hashedInput = ComputeSha256Hash(request.Password);

            if (adminPassword == null)
            {
                adminPassword = new AdminPassword { PasswordHash = hashedInput };
                context.AdminPasswords.Add(adminPassword);
            }
            else if (hashedInput != adminPassword.PasswordHash)
            {
                return Results.Unauthorized();
            }

            var token = new AuthToken
            {
                Token = Guid.NewGuid().ToString("N"),
                ExpiresAt = DateTime.UtcNow.AddHours(1)
            };

            context.AuthTokens.Add(token);
            await context.SaveChangesAsync();

            return Results.Ok(token);
        });

        group.MapGet("/verify", () => Results.Ok())
            .AddEndpointFilter<AuthFilter>();

        group.MapDelete("/password", async (DatabaseContext context) =>
        {
            var adminPassword = await context.AdminPasswords.FirstOrDefaultAsync();
            if (adminPassword != null)
            {
                context.AdminPasswords.Remove(adminPassword);
                await context.SaveChangesAsync();
                return Results.Ok();
            }
            return Results.NotFound();
        })
        .AddEndpointFilter<AuthFilter>();
    }

    private static string ComputeSha256Hash(string rawData)
    {
        using (SHA256 sha256Hash = SHA256.Create())
        {
            byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(rawData ?? string.Empty));
            StringBuilder builder = new StringBuilder();
            for (int i = 0; i < bytes.Length; i++)
            {
                builder.Append(bytes[i].ToString("x2"));
            }
            return builder.ToString();
        }
    }
}

public class LoginRequest
{
    public string Password { get; set; } = string.Empty;
}
