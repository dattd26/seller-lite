using MediatR;
using SellerLite.Application.Common.Interfaces;
using SellerLite.Domain.Entities;
using SellerLite.Domain.Entities.Enums;

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

        var phoneNumber = new Domain.Entities.ValueObjects.PhoneNumber();
        phoneNumber.SetValue(request.CustomerPhone);

        // Note: For a real app, verify product exists and check stock.
        var entity = new Order
        {
            OrderNumber = $"ORD-{DateTime.UtcNow:yyyyMMddHHmmss}-{new Random().Next(1000, 9999)}",
            CustomerName = request.CustomerName,
            CustomerPhone = phoneNumber,
            ShippingFee = request.ShippingFee,
            TotalPrice = totalPrice,
            Items = orderItems,
            TenantId = Guid.Empty
        };
        entity.UpdateStatus(OrderStatus.Pending);

        _context.Orders.Add(entity);
        await _context.SaveChangesAsync(cancellationToken);

        return entity.Id;
    }
}
