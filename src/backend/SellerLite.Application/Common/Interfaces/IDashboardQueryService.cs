using SellerLite.Application.Dashboard.Queries.GetDashboardSummary;
using System.Threading.Tasks;

namespace SellerLite.Application.Common.Interfaces;

public interface IDashboardQueryService
{
    Task<DashboardSummaryDto> GetDashboardSummaryAsync(DateTime startDate);
}
