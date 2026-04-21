using MediatR;
using SellerLite.Application.Common.Interfaces;
using SellerLite.Domain.Entities;

namespace SellerLite.Application.Products.Commands.CreateProduct;

public record CreateProductCommand(string Name, string SKU, decimal SalePrice, decimal CostPrice, int Stock) : IRequest<Guid>;

public class CreateProductCommandHandler : IRequestHandler<CreateProductCommand, Guid>
{
    private readonly IApplicationDbContext _context;

    public CreateProductCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Guid> Handle(CreateProductCommand request, CancellationToken cancellationToken)
    {
        var entity = new Product
        {
            Name = request.Name,
            SKU = request.SKU,
            SalePrice = request.SalePrice,
            CostPrice = request.CostPrice,
            Stock = request.Stock,
            TenantId = Guid.Empty
        };

        _context.Products.Add(entity);
        await _context.SaveChangesAsync(cancellationToken);

        return entity.Id;
    }
}
