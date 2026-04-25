using Dapper;
using SellerLite.Application.Common.Interfaces;
using SellerLite.Application.Features.Orders.Models;
using System.Data;

namespace SellerLite.Infrastructure.Persistence.Queries;

public class OrderQueryService : IOrderQueryService
{
    private readonly IDbConnection _dbConnection;

    public OrderQueryService(IDbConnection dbConnection)
    {
        _dbConnection = dbConnection;
    }

    public async Task<OrderDto?> GetOrderByIdAsync(Guid id)
    {
        using var multi = await _dbConnection.QueryMultipleAsync("dbo.GetOrderById", new { id }, commandType: CommandType.StoredProcedure);

        var order = await multi.ReadFirstOrDefaultAsync<dynamic>();
        if (order == null) return null;

        var items = (await multi.ReadAsync<OrderItemDto>()).ToList();

        return new OrderDto(
            order.Id,
            order.OrderNumber,
            order.Status.ToString(),
            order.TotalPrice,
            order.ShippingFee ?? 0,
            order.CustomerName ?? "",
            order.CreatedAt,
            items
        );
    }
}
