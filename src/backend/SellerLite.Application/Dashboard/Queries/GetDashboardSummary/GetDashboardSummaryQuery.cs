using MediatR;
using SellerLite.Application.Common.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace SellerLite.Application.Dashboard.Queries.GetDashboardSummary;

public record DailyRevenueDto(string Date, decimal Revenue, decimal Profit);
public record CategorySalesDto(string Category, decimal Revenue, int Count);
public record ProductSalesDto(string Name, int Quantity);

public record DashboardSummaryDto(
    decimal TotalRevenue, 
    int TotalOrders, 
    int LowStockItems, 
    decimal ExpectedProfit,
    List<DailyRevenueDto> DailyTrends,
    List<CategorySalesDto> CategoryBreakdown,
    List<ProductSalesDto> TopProducts);

public record GetDashboardSummaryQuery : IRequest<DashboardSummaryDto>;

public class GetDashboardSummaryQueryHandler : IRequestHandler<GetDashboardSummaryQuery, DashboardSummaryDto>
{
    private readonly IDashboardQueryService _queryService;

    public GetDashboardSummaryQueryHandler(IDashboardQueryService queryService)
    {
        _queryService = queryService;
    }

    public async Task<DashboardSummaryDto> Handle(GetDashboardSummaryQuery request, CancellationToken cancellationToken)
    {
        var startDate = DateTime.UtcNow.Date.AddDays(-6);
        return await _queryService.GetDashboardSummaryAsync(startDate);
    }
}
