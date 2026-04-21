using Microsoft.AspNetCore.Mvc;
using SellerLite.Application.Dashboard.Queries.GetDashboardSummary;

namespace SellerLite.Api.Controllers;

public class DashboardController : ApiControllerBase
{
    [HttpGet("summary")]
    public async Task<ActionResult<DashboardSummaryDto>> GetSummary()
    {
        return await Mediator.Send(new GetDashboardSummaryQuery());
    }
}
