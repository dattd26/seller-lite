using MediatR;
using Microsoft.EntityFrameworkCore;
using SellerLite.Application.Common.Interfaces;

namespace SellerLite.Application.Products.Queries.GetProducts;

public record ProductDto(Guid Id, string Name, string SKU, decimal SalePrice, int Stock);

public record GetProductsQuery : IRequest<List<ProductDto>>;

public class GetProductsQueryHandler : IRequestHandler<GetProductsQuery, List<ProductDto>>
{
    private readonly IApplicationDbContext _context;

    public GetProductsQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<ProductDto>> Handle(GetProductsQuery request, CancellationToken cancellationToken)
    {
        return await _context.Products
            .Select(p => new ProductDto(p.Id, p.Name, p.SKU, p.SalePrice, p.Stock))
            .ToListAsync(cancellationToken);
    }
}
