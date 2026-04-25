using MediatR;
using Microsoft.EntityFrameworkCore;
using SellerLite.Application.Common.Interfaces;
using SellerLite.Application.Features.Orders.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SellerLite.Application.Features.Orders.Queries;

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
            .AsNoTracking()
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
