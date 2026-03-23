using System.Security.Cryptography;
using Microsoft.EntityFrameworkCore;
using Portfolio.Server.Data;
using Portfolio.Server.Models;

namespace Portfolio.Server.Endpoints;

public class AuthFilter : IEndpointFilter
{
    public async ValueTask<object?> InvokeAsync(EndpointFilterInvocationContext context, EndpointFilterDelegate next)
    {
        var dbContext = context.HttpContext.RequestServices.GetRequiredService<DatabaseContext>();
        
        var authHeader = context.HttpContext.Request.Headers.Authorization.ToString();
        if (string.IsNullOrEmpty(authHeader) || !authHeader.StartsWith("Bearer "))
        {
            return Results.Unauthorized();
        }

        var incomingToken = authHeader.Substring("Bearer ".Length).Trim();
        var incomingTokenBytes = System.Text.Encoding.UTF8.GetBytes(incomingToken);

        var tokensInDb = await dbContext.AuthTokens.ToListAsync();
        
        AuthToken? matchedToken = null;
        
        foreach (var t in tokensInDb)
        {
            var dbTokenBytes = System.Text.Encoding.UTF8.GetBytes(t.Token ?? "");
            if (incomingTokenBytes.Length == dbTokenBytes.Length)
            {
                if (CryptographicOperations.FixedTimeEquals(incomingTokenBytes, dbTokenBytes))
                {
                    matchedToken = t;
                    break;
                }
            }
        }

        if (matchedToken == null)
        {
            return Results.Unauthorized();
        }

        if (matchedToken.ExpiresAt < DateTime.UtcNow)
        {
            dbContext.AuthTokens.Remove(matchedToken);
            await dbContext.SaveChangesAsync();
            return Results.Unauthorized();
        }

        return await next(context);
    }
}
