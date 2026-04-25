using SellerLite.Application.Features.Dashboard.Queries;

namespace SellerLite.Application.Common.Interfaces;

public interface IDashboardQueryService
{
    Task<DashboardSummaryDto> GetDashboardSummaryAsync(DateTime startDate);
}
