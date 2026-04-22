using Microsoft.EntityFrameworkCore;
using SellerLite.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Linq;

namespace SellerLite.Infrastructure.Persistence;

public static class SeedData
{
    private static Guid CreateGuid(int value)
    {
        byte[] bytes = new byte[16];
        BitConverter.GetBytes(value).CopyTo(bytes, 0);
        return new Guid(bytes);
    }

    public static void Seed(ModelBuilder modelBuilder)
    {
        var tenantId1 = CreateGuid(100);
        var tenantId2 = CreateGuid(200);

        modelBuilder.Entity<Tenant>().HasData(
            new Tenant { Id = tenantId1, Name = "Shop Thời Trang", Description = "Chuyên quần áo nam nữ", CreatedAt = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc) },
            new Tenant { Id = tenantId2, Name = "Cửa Hàng Phụ Kiện", Description = "Phụ kiện điện thoại và máy tính", CreatedAt = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc) }
        );

        var products = new List<Product>();
        var productIds1 = new List<Guid>();
        var productIds2 = new List<Guid>();

        for (int i = 1; i <= 10; i++)
        {
            var id = CreateGuid(1000 + i);
            productIds1.Add(id);
            products.Add(new Product
            {
                Id = id,
                TenantId = tenantId1,
                Name = $"Áo thun Polo Nam {i}",
                SKU = $"FASH-{i:D3}",
                Category = i % 2 == 0 ? "Thời trang Nam" : "Thời trang Nữ",
                CostPrice = 50000 + (i * 2000),
                SalePrice = 120000 + (i * 5000),
                Stock = 50 + i,
                LowStockThreshold = 5,
                CreatedAt = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc)
            });
        }

        for (int i = 1; i <= 10; i++)
        {
            var id = CreateGuid(2000 + i);
            productIds2.Add(id);
            products.Add(new Product
            {
                Id = id,
                TenantId = tenantId2,
                Name = $"Cáp sạc USB-C {i}",
                SKU = $"TECH-{i:D3}",
                Category = "Phụ kiện điện tử",
                CostPrice = 30000 + (i * 1000),
                SalePrice = 85000 + (i * 3000),
                Stock = 100 + i,
                LowStockThreshold = 10,
                CreatedAt = new DateTime(2026, 1, 1, 0, 0, 0, DateTimeKind.Utc)
            });
        }

        modelBuilder.Entity<Product>().HasData(products);

        var orders = new List<Order>();
        var orderItems = new List<OrderItem>();

        for (int i = 1; i <= 10; i++)
        {
            var orderId = CreateGuid(10000 + i);
            var productId = productIds1[i - 1];
            var unitPrice = 120000 + (i * 5000);
            var qty = (i % 3) + 1;
            var shipping = 30000;

            orders.Add(new Order
            {
                Id = orderId,
                TenantId = tenantId1,
                OrderNumber = $"ORD-F-{i:D4}",
                Status = OrderStatus.Completed,
                PaymentMethod = (PaymentMethod)(i % 4),
                TotalPrice = (unitPrice * qty) + shipping,
                ShippingFee = shipping,
                CustomerName = $"Khách hàng Thời trang {i}",
                CustomerPhone = $"090100000{i}",
                CreatedAt = new DateTime(2026, 4, 22, 10, 0, 0, DateTimeKind.Utc).AddDays(-(i % 7))
            });

            orderItems.Add(new OrderItem
            {
                Id = CreateGuid(11000 + i),
                OrderId = orderId,
                ProductId = productId,
                Quantity = qty,
                UnitPrice = unitPrice,
                CreatedAt = new DateTime(2026, 4, 22, 10, 0, 0, DateTimeKind.Utc).AddDays(-(i % 7))
            });
        }

        for (int i = 1; i <= 10; i++)
        {
            var orderId = CreateGuid(20000 + i);
            var productId = productIds2[i - 1];
            var unitPrice = 85000 + (i * 3000);
            var qty = (i % 2) + 1;
            var shipping = 20000;

            orders.Add(new Order
            {
                Id = orderId,
                TenantId = tenantId2,
                OrderNumber = $"ORD-T-{i:D4}",
                Status = OrderStatus.Completed,
                PaymentMethod = (PaymentMethod)(i % 4),
                TotalPrice = (unitPrice * qty) + shipping,
                ShippingFee = shipping,
                CustomerName = $"Khách hàng Công nghệ {i}",
                CustomerPhone = $"091200000{i}",
                CreatedAt = new DateTime(2026, 4, 22, 10, 0, 0, DateTimeKind.Utc).AddDays(-(i % 7))
            });

            orderItems.Add(new OrderItem
            {
                Id = CreateGuid(21000 + i),
                OrderId = orderId,
                ProductId = productId,
                Quantity = qty,
                UnitPrice = unitPrice,
                CreatedAt = new DateTime(2026, 4, 22, 10, 0, 0, DateTimeKind.Utc).AddDays(-(i % 7))
            });
        }

        modelBuilder.Entity<Order>().HasData(orders);
        modelBuilder.Entity<OrderItem>().HasData(orderItems);
    }
}
