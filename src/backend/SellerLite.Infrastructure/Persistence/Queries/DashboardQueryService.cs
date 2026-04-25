using Dapper;
using SellerLite.Application.Common.Interfaces;
using SellerLite.Application.Dashboard.Queries.GetDashboardSummary;
using SellerLite.Domain.Entities.Enums;
using System.Data;


namespace SellerLite.Infrastructure.Persistence.Queries;

public class DashboardQueryService : IDashboardQueryService
{
    private readonly IDbConnection _dbConnection;

    public DashboardQueryService(IDbConnection dbConnection)
    {
        _dbConnection = dbConnection;
    }

    public async Task<DashboardSummaryDto> GetDashboardSummaryAsync(DateTime startDate)
    {
        const int completedStatus = (int)OrderStatus.Completed;

        using var multi = await _dbConnection.QueryMultipleAsync(
            "GetDashboardSummary", 
            new { completedStatus, startDate }, 
            commandType: CommandType.StoredProcedure);

        var summary = await multi.ReadFirstAsync();
        var lowStockItems = await multi.ReadFirstAsync<int>();
        var dailyTrendsRaw = (await multi.ReadAsync()).Select(x => new DailyRevenueDto(x.Date, x.Revenue, (decimal)x.Revenue * 0.25m)).ToList();
        var categoryBreakdown = (await multi.ReadAsync<CategorySalesDto>()).ToList();
        var topProducts = (await multi.ReadAsync<ProductSalesDto>()).ToList();

        // Fill missing days in trends
        var last7DaysLabels = Enumerable.Range(0, 7)
            .Select(i => DateTime.UtcNow.Date.AddDays(-i))
            .Reverse()
            .Select(d => d.ToString("dd/MM"))
            .ToList();

        var dailyTrends = last7DaysLabels.Select(label => 
            dailyTrendsRaw.FirstOrDefault(t => t.Date == label) ?? new DailyRevenueDto(label, 0, 0)
        ).ToList();

        return new DashboardSummaryDto(
            summary.TotalRevenue,
            summary.TotalOrders,
            lowStockItems,
            (decimal)summary.TotalRevenue * 0.25m,
            dailyTrends,
            categoryBreakdown,
            topProducts);
    }
}
