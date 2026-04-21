using MediatR;
using Microsoft.EntityFrameworkCore;
using SellerLite.Application.Common.Interfaces;
using SellerLite.Domain.Entities;

namespace SellerLite.Application.Orders.Queries.GetOrders;

public record OrderDto(Guid Id, string OrderNumber, string Status, decimal TotalPrice, string CustomerName, DateTime CreatedAt);

public record GetOrdersQuery : IRequest<List<OrderDto>>;

public class GetOrdersQueryHandler : IRequestHandler<GetOrdersQuery, List<OrderDto>>
{
    private readonly IApplicationDbContext _context;

    public GetOrdersQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<OrderDto>> Handle(GetOrdersQuery request, CancellationToken cancellationToken)
    {
        return await _context.Orders
            .OrderByDescending(o => o.CreatedAt)
            .Select(o => new OrderDto(
                o.Id,
                o.OrderNumber,
                o.Status.ToString(),
                o.TotalPrice,
                o.CustomerName ?? "",
                o.CreatedAt
            ))
            .ToListAsync(cancellationToken);
    }
}
