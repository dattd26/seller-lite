namespace SellerLite.Application.Features.Orders.Models;

public record OrderSummaryDto(
    Guid Id, 
    string OrderNumber, 
    string Status, 
    decimal TotalPrice, 
    string CustomerName, 
    DateTime CreatedAt);
    