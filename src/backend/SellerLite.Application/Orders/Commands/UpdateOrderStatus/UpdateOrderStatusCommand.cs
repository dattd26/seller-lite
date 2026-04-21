using MediatR;
using Microsoft.EntityFrameworkCore;
using SellerLite.Application.Common.Interfaces;
using SellerLite.Domain.Entities;
using System;
using System.Threading;
using System.Threading.Tasks;

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
        var order = await _context.Orders.FirstOrDefaultAsync(o => o.Id == request.OrderId, cancellationToken);
        
        if (order == null)
            throw new Exception("Order not found");

        order.Status = request.Status;

        // If order is completed, we should probably deduct stock here or via events.
        // For simplicity, we just save the status.

        await _context.SaveChangesAsync(cancellationToken);
    }
}
