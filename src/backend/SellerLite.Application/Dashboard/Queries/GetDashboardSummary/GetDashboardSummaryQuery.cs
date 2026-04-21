using MediatR;
using Microsoft.EntityFrameworkCore;
using SellerLite.Application.Common.Interfaces;
using SellerLite.Domain.Entities;
using System.Threading;
using System.Threading.Tasks;

namespace SellerLite.Application.Dashboard.Queries.GetDashboardSummary;

public record DashboardSummaryDto(decimal TotalRevenue, int TotalOrders, int LowStockItems, decimal ExpectedProfit);

public record GetDashboardSummaryQuery : IRequest<DashboardSummaryDto>;

public class GetDashboardSummaryQueryHandler : IRequestHandler<GetDashboardSummaryQuery, DashboardSummaryDto>
{
    private readonly IApplicationDbContext _context;

    public GetDashboardSummaryQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<DashboardSummaryDto> Handle(GetDashboardSummaryQuery request, CancellationToken cancellationToken)
    {
        // Simple logic focusing on completed orders for revenue
        var completedOrders = await _context.Orders
            .Where(o => o.Status == OrderStatus.Completed)
            .ToListAsync(cancellationToken);

        var totalRevenue = completedOrders.Sum(o => o.TotalPrice);
        var totalOrders = completedOrders.Count;

        // Mock ExpectedProfit for now, in reality you'd need the cost basis
        var expectedProfit = totalRevenue * 0.2m; // Assuming 20% margin for simple mockup

        var lowStockItems = await _context.Products
            .Where(p => p.Stock <= p.LowStockThreshold)
            .CountAsync(cancellationToken);

        return new DashboardSummaryDto(totalRevenue, totalOrders, lowStockItems, expectedProfit);
    }
}
