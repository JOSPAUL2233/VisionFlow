using VisionFlow_Web_API.Interfaces.IRepositories;
using VisionFlow_Web_API.Interfaces.IServices;
using VisionFlow_Web_API.Repository;
using VisionFlow_Web_API.Service;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<IConfiguration>(builder.Configuration);

// Adding services to the container
builder.Services.AddScoped<IUserManagementRepository, UserManagementRepository>();
builder.Services.AddScoped<IProjectRepository, ProjectRepository>();
builder.Services.AddScoped<ICommonRepository, CommonRepository>();
builder.Services.AddScoped<ITaskRepository, TaskRepository>();

//Adding Repositories to the container
builder.Services.AddScoped<IUserManagementService, UserManagementService>();
builder.Services.AddScoped<IProjectService, ProjectService>();
builder.Services.AddScoped<ICommonService, CommonService>();
builder.Services.AddScoped<ITaskService, TaskServcie>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//adding cors
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy =>
        {
            policy.WithOrigins("http://localhost:5173", "https://localhost:5173")
                  // React dev server
                  .AllowAnyHeader()
                  .AllowAnyMethod();
        });
});
// Build the app AFTER services are registered
var app = builder.Build();



// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowReactApp");
app.UseAuthorization();
app.MapControllers();

app.Run();
