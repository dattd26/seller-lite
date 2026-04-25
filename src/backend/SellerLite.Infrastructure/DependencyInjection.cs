using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using SellerLite.Application.Common.Interfaces;
using SellerLite.Infrastructure.Persistence;
using SellerLite.Infrastructure.Persistence.Queries;

namespace SellerLite.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructureServices(this IServiceCollection services, IConfiguration configuration)
    {
        var connectionString = configuration.GetConnectionString("DefaultConnection");

        services.AddDbContext<ApplicationDbContext>((sp, options) =>
        {
            options.UseSqlServer(connectionString);
        });

        services.AddScoped<IApplicationDbContext>(provider => provider.GetRequiredService<ApplicationDbContext>());
        
        // Dapper Connection
        services.AddScoped<System.Data.IDbConnection>(sp => 
            new Microsoft.Data.SqlClient.SqlConnection(connectionString));

        services.AddScoped<IDashboardQueryService, DashboardQueryService>();
        services.AddScoped<IOrderQueryService, OrderQueryService>();

        return services;
    }
}
