namespace SellerLite.Application.Features.Orders.Models;

public record OrderItemDto(
    Guid ProductId, 
    string Sku,
    string ProductName, 
    int Quantity, 
    decimal UnitPrice);
