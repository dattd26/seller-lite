using SellerLite.Domain.Common;
using SellerLite.Domain.Entities.Enums;
using SellerLite.Domain.Entities.ValueObjects;

namespace SellerLite.Domain.Entities;

public class Order : BaseAuditableEntity
{
    public string OrderNumber { get; set; } = string.Empty;
    public OrderStatus Status { get; private set; } = OrderStatus.Pending;
    public PaymentMethod PaymentMethod { get; set; } = PaymentMethod.COD;
    public decimal TotalPrice { get; set; }
    public decimal ShippingFee { get; set; }
    public string? CustomerName { get; set; }
    public PhoneNumber? CustomerPhone { get; set; }
    public List<OrderItem> Items { get; set; } = new();
    public void UpdateStatus(OrderStatus newStatus)
    {
        if (Status == OrderStatus.Cancelled || Status == OrderStatus.Returned || Status == OrderStatus.Completed)
        {
            return;
        }
        Status = newStatus;
    }
}
