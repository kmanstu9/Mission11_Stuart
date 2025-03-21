using Microsoft.EntityFrameworkCore;
using Mission11_Stuart.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<BookstoreContext>(options =>
{
    options.UseSqlite(builder.Configuration["ConnectionStrings:BookConnection"]);
});

builder.Services.AddCors();

var app = builder.Build();

// Enable middleware
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Allow frontend to talk to backend
app.UseCors(x =>
    x.WithOrigins("http://localhost:3000")
     .AllowAnyMethod()
     .AllowAnyHeader()
    .AllowCredentials()

);

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
