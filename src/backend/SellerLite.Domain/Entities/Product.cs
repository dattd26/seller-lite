using SellerLite.Domain.Common;

namespace SellerLite.Domain.Entities;

public class Product : BaseAuditableEntity
{
    public string Name { get; set; } = string.Empty;
    public string SKU { get; set; } = string.Empty;
    public string Category { get; set; } = "Chưa phân loại";
    public decimal CostPrice { get; set; }
    public decimal SalePrice { get; set; }
    public int Stock { get; set; }
    public int LowStockThreshold { get; set; } = 10;
}
