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
    while(true) {
		try
		{
			var context = services.GetRequiredService<DatabaseContext>();
			context.Database.Migrate();
			Console.WriteLine("Successfully applied migrations.");
			break;
		}
		catch (Exception e)
		{
			Console.WriteLine($"Error occurred while applying migrations: {e.Message}. Waiting 5 seconds...");
			Thread.Sleep(5000);
		}
	}
}

app.MapProfileEndpoints();
app.MapProjectEndpoints();
app.MapTechnologiesEndpoints();
app.MapFilterEndpoints();
app.MapAuthEndpoints();
app.MapAnalyticsEndpoints();

app.Run();
