using MediatR;
using Microsoft.EntityFrameworkCore;
using SellerLite.Application.Common.Interfaces;
using SellerLite.Application.Features.Products.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SellerLite.Application.Features.Products.Queries;

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
            .AsNoTracking()
            .Select(p => new ProductDto(p.Id, p.Name, p.SKU, p.SalePrice, p.Stock))
            .ToListAsync(cancellationToken);
    }
}

public record GetLowStockProductsQuery : IRequest<List<ProductDto>>;

public class GetLowStockProductsQueryHandler : IRequestHandler<GetLowStockProductsQuery, List<ProductDto>>
{
    private readonly IApplicationDbContext _context;

    public GetLowStockProductsQueryHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<ProductDto>> Handle(GetLowStockProductsQuery request, CancellationToken cancellationToken)
    {
        return await _context.Products
            .AsNoTracking()
            .Where(p => p.Stock <= p.LowStockThreshold)
            .Select(p => new ProductDto(p.Id, p.Name, p.SKU, p.SalePrice, p.Stock))
            .ToListAsync(cancellationToken);
    }
}
