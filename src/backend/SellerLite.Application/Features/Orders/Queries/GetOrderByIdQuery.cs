using MediatR;
using SellerLite.Application.Common.Interfaces;
using SellerLite.Application.Features.Orders.Models;

namespace SellerLite.Application.Features.Orders.Queries;

public record GetOrderByIdQuery(Guid Id) : IRequest<OrderDto?>;

public class GetOrderByIdQueryHandler : IRequestHandler<GetOrderByIdQuery, OrderDto?>
{
    private readonly IOrderQueryService _queryService;

    public GetOrderByIdQueryHandler(IOrderQueryService queryService)
    {
        _queryService = queryService;
    }

    public async Task<OrderDto?> Handle(GetOrderByIdQuery request, CancellationToken cancellationToken)
    {
        return await _queryService.GetOrderByIdAsync(request.Id);
    }
}
