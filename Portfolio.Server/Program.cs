using Microsoft.EntityFrameworkCore;
using Portfolio.Server.Data;
using Portfolio.Server.Endpoints;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<DatabaseContext>( options => options.UseNpgsql(connectionString) );

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

// app.UseHttpsRedirection();

using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;
    try
    {
        var context = services.GetRequiredService<DatabaseContext>();
        context.Database.Migrate();
        Console.WriteLine("Successfully applied migrations.");
    }
    catch (Exception e)
    {
        Console.WriteLine($"Error occurred while applying migrations: {e.Message}");
    }
}

app.MapProfileEndpoints();
app.MapProjectEndpoints();
app.MapTechnologiesEndpoints();
app.MapFilterEndpoints();

app.Run();
