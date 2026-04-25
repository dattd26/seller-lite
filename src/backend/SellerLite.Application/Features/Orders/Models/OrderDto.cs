using System;

namespace SellerLite.Application.Features.Orders.Models;

public record OrderDto(Guid Id, string OrderNumber, string Status, decimal TotalPrice, string CustomerName, DateTime CreatedAt);
