using SellerLite.Domain.Common;

namespace SellerLite.Domain.Entities;

public class Tenant : BaseEntity
{
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
}
