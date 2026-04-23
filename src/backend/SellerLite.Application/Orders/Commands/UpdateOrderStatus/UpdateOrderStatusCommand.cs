using MediatR;
using Microsoft.EntityFrameworkCore;
using SellerLite.Application.Common.Interfaces;
using SellerLite.Domain.Entities.Enums;

namespace SellerLite.Application.Orders.Commands.UpdateOrderStatus;

public record UpdateOrderStatusCommand(Guid OrderId, OrderStatus Status) : IRequest;

public class UpdateOrderStatusCommandHandler : IRequestHandler<UpdateOrderStatusCommand>
{
    private readonly IApplicationDbContext _context;

    public UpdateOrderStatusCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task Handle(UpdateOrderStatusCommand request, CancellationToken cancellationToken)
    {
        var order = await _context.Orders
            .Include(o => o.Items)
            .FirstOrDefaultAsync(o => o.Id == request.OrderId, cancellationToken);
        
        if (order == null)
            throw new Exception("Order not found");

        var oldStatus = order.Status;
        var newStatus = request.Status;

        if (oldStatus == newStatus) return;

        bool wasStockDeducted = oldStatus == OrderStatus.Confirmed || 
                                oldStatus == OrderStatus.Shipping || 
                                oldStatus == OrderStatus.Completed;

        bool shouldStockBeDeducted = newStatus == OrderStatus.Confirmed || 
                                     newStatus == OrderStatus.Shipping || 
                                     newStatus == OrderStatus.Completed;

        if (!wasStockDeducted && shouldStockBeDeducted)
        {
            var productIds = order.Items.Select(i => i.ProductId).ToList();
            var products = await _context.Products.Where(p => productIds.Contains(p.Id)).ToListAsync(cancellationToken);
            foreach(var item in order.Items)
            {
                var product = products.FirstOrDefault(p => p.Id == item.ProductId);
                if (product != null)
                {
                    product.Stock -= item.Quantity;
                }
            }
        }
        else if (wasStockDeducted && !shouldStockBeDeducted && newStatus != OrderStatus.Returning)
        {
            var productIds = order.Items.Select(i => i.ProductId).ToList();
            var products = await _context.Products.Where(p => productIds.Contains(p.Id)).ToListAsync(cancellationToken);
            foreach(var item in order.Items)
            {
                var product = products.FirstOrDefault(p => p.Id == item.ProductId);
                if (product != null)
                {
                    product.Stock += item.Quantity;
                }
            }
        }

        order.UpdateStatus(newStatus);
        await _context.SaveChangesAsync(cancellationToken);
    }
}
