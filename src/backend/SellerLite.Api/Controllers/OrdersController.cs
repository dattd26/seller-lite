using Microsoft.AspNetCore.Mvc;
using SellerLite.Application.Features.Orders.Commands;
using SellerLite.Application.Features.Orders.Queries;
using SellerLite.Application.Features.Orders.Models;
using SellerLite.Domain.Entities.Enums;

namespace SellerLite.Api.Controllers;

public class OrdersController : ApiControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<OrderSummaryDto>>> GetOrders()
    {
        return await Mediator.Send(new GetOrdersQuery());
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<OrderDto>> GetOrder(Guid id)
    {
        var order = await Mediator.Send(new GetOrderByIdQuery(id));
        return Ok(order);
    }

    [HttpPut("{id}/status")]
    public async Task<IActionResult> UpdateOrderStatus(Guid id, [FromBody] UpdateOrderStatusRequest request)
    {
        await Mediator.Send(new UpdateOrderStatusCommand(id, request.Status));
        return NoContent();
    }

    [HttpPost]
    public async Task<ActionResult<Guid>> CreateOrder([FromBody] CreateOrderCommand command)
    {
        var orderId = await Mediator.Send(command);
        return CreatedAtAction(nameof(GetOrders), new { id = orderId }, orderId);
    }
}

public record UpdateOrderStatusRequest(OrderStatus Status);
