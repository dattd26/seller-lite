namespace SellerLite.Application.Features.Products.Models;

public record ProductDto(Guid Id, string Name, string SKU, decimal SalePrice, int Stock);
