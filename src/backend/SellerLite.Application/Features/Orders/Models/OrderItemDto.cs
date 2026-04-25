namespace SellerLite.Application.Features.Orders.Models;

public record OrderItemDto(
    Guid ProductId, 
    string ProductName, 
    int Quantity, 
    decimal UnitPrice);
