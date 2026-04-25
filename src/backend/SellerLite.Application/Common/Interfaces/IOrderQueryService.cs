using SellerLite.Application.Features.Orders.Models;
using System;
using System.Threading.Tasks;

namespace SellerLite.Application.Common.Interfaces;

public interface IOrderQueryService
{
    Task<OrderDto?> GetOrderByIdAsync(Guid id);
}
