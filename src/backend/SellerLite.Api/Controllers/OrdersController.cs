using Microsoft.AspNetCore.Mvc;
using SellerLite.Application.Orders.Commands.UpdateOrderStatus;
using SellerLite.Application.Orders.Queries.GetOrders;

namespace SellerLite.Api.Controllers;

public class OrdersController : ApiControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<OrderDto>>> GetOrders()
    {
        return await Mediator.Send(new GetOrdersQuery());
    }

    [HttpPut("{id}/status")]
    public async Task<IActionResult> UpdateOrderStatus(Guid id, [FromBody] UpdateOrderStatusRequest request)
    {
        await Mediator.Send(new UpdateOrderStatusCommand(id, request.Status));
        return NoContent();
    }

    [HttpPost]
    public async Task<ActionResult<Guid>> CreateOrder([FromBody] SellerLite.Application.Orders.Commands.CreateOrder.CreateOrderCommand command)
    {
        var orderId = await Mediator.Send(command);
        return CreatedAtAction(nameof(GetOrders), new { id = orderId }, orderId);
    }
}

public record UpdateOrderStatusRequest(SellerLite.Domain.Entities.OrderStatus Status);
