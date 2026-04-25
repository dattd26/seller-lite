using SellerLite.Application.Dashboard.Queries.GetDashboardSummary;

namespace SellerLite.Application.Common.Interfaces;

public interface IDashboardQueryService
{
    Task<DashboardSummaryDto> GetDashboardSummaryAsync(DateTime startDate);
}
