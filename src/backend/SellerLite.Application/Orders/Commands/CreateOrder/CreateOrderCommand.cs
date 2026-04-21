using MediatR;
using SellerLite.Application.Common.Interfaces;
using SellerLite.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace SellerLite.Application.Orders.Commands.CreateOrder;

public record CreateOrderItemDto(Guid ProductId, int Quantity, decimal UnitPrice);

public record CreateOrderCommand(
    string CustomerName, 
    string CustomerPhone, 
    decimal ShippingFee,
    List<CreateOrderItemDto> Items) : IRequest<Guid>;

public class CreateOrderCommandHandler : IRequestHandler<CreateOrderCommand, Guid>
{
    private readonly IApplicationDbContext _context;

    public CreateOrderCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Guid> Handle(CreateOrderCommand request, CancellationToken cancellationToken)
    {
        var orderItems = request.Items.Select(i => new OrderItem
        {
            ProductId = i.ProductId,
            Quantity = i.Quantity,
            UnitPrice = i.UnitPrice
        }).ToList();

        var totalPrice = orderItems.Sum(i => i.Quantity * i.UnitPrice) + request.ShippingFee;

        // Note: For a real app, verify product exists and check stock.
        var entity = new Order
        {
            OrderNumber = $"ORD-{DateTime.UtcNow:yyyyMMddHHmmss}-{new Random().Next(1000, 9999)}",
            CustomerName = request.CustomerName,
            CustomerPhone = request.CustomerPhone,
            ShippingFee = request.ShippingFee,
            TotalPrice = totalPrice,
            Status = OrderStatus.Pending,
            Items = orderItems,
            TenantId = Guid.Empty
        };

        _context.Orders.Add(entity);
        await _context.SaveChangesAsync(cancellationToken);

        return entity.Id;
    }
}
