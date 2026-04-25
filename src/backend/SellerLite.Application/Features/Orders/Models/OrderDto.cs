namespace SellerLite.Application.Features.Orders.Models;

public record OrderDto(
    Guid Id, 
    string OrderNumber, 
    string Status, 
    decimal TotalPrice, 
    decimal ShippingFee,
    string CustomerName, 
    DateTime CreatedAt,
    List<OrderItemDto> Items);
