using Microsoft.Extensions.DependencyInjection;
namespace VieLocaLure
{

    public class Startup
        {
            // Other configurations...

            public void ConfigureServices(IServiceCollection services)
            {
                // Add CORS policy
                services.AddCors(options =>
                {
                    options.AddPolicy("React", builder =>
                    {
                        builder.WithOrigins("http://localhost:3000") // Add your allowed origins
                               .AllowAnyMethod()
                               .AllowAnyHeader();
                    });
                });

                // Other services...
            }

            public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
            {
                // Other configurations...

                // Use CORS policy
                app.UseCors("React");

                // Other middleware...
            }
        }
}
