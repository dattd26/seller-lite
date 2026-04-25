using MediatR;
using Microsoft.EntityFrameworkCore;
using SellerLite.Application.Common.Interfaces;
using SellerLite.Application.Features.Orders.Models;
using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SellerLite.Application.Features.Orders.Queries;

public record GetOrderByIdQuery(Guid Id) : IRequest<OrderDto?>;

public class GetOrderByIdQueryHandler : IRequestHandler<GetOrderByIdQuery, OrderDto?>
{
    private readonly IApplicationDbContext _context;

    public GetOrderByIdQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<OrderDto?> Handle(GetOrderByIdQuery request, CancellationToken cancellationToken)
    {
        return await _context.Orders
            .AsNoTracking()
            .Where(o => o.Id == request.Id)
            .Select(o => new OrderDto(
                o.Id,
                o.OrderNumber,
                o.Status.ToString(),
                o.TotalPrice,
                o.CustomerName ?? "",
                o.CreatedAt
            ))
            .FirstOrDefaultAsync(cancellationToken);
    }
}
