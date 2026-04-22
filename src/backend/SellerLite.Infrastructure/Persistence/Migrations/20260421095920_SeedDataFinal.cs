using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace SellerLite.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class SeedDataFinal : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Orders",
                columns: new[] { "Id", "CreatedAt", "CustomerName", "CustomerPhone", "OrderNumber", "ShippingFee", "Status", "TenantId", "TotalPrice", "UpdatedAt" },
                values: new object[,]
                {
                    { new Guid("00002711-0000-0000-0000-000000000000"), new DateTime(2024, 4, 1, 10, 0, 0, 0, DateTimeKind.Utc), "Khách hàng Thời trang 1", "0901000001", "ORD-F-0001", 30000m, 1, new Guid("00000064-0000-0000-0000-000000000000"), 280000m, null },
                    { new Guid("00002712-0000-0000-0000-000000000000"), new DateTime(2024, 4, 2, 10, 0, 0, 0, DateTimeKind.Utc), "Khách hàng Thời trang 2", "0901000002", "ORD-F-0002", 30000m, 2, new Guid("00000064-0000-0000-0000-000000000000"), 420000m, null },
                    { new Guid("00002713-0000-0000-0000-000000000000"), new DateTime(2024, 4, 3, 10, 0, 0, 0, DateTimeKind.Utc), "Khách hàng Thời trang 3", "0901000003", "ORD-F-0003", 30000m, 3, new Guid("00000064-0000-0000-0000-000000000000"), 165000m, null },
                    { new Guid("00002714-0000-0000-0000-000000000000"), new DateTime(2024, 4, 4, 10, 0, 0, 0, DateTimeKind.Utc), "Khách hàng Thời trang 4", "0901000004", "ORD-F-0004", 30000m, 4, new Guid("00000064-0000-0000-0000-000000000000"), 310000m, null },
                    { new Guid("00002715-0000-0000-0000-000000000000"), new DateTime(2024, 4, 5, 10, 0, 0, 0, DateTimeKind.Utc), "Khách hàng Thời trang 5", "0901000005", "ORD-F-0005", 30000m, 0, new Guid("00000064-0000-0000-0000-000000000000"), 465000m, null },
                    { new Guid("00002716-0000-0000-0000-000000000000"), new DateTime(2024, 4, 6, 10, 0, 0, 0, DateTimeKind.Utc), "Khách hàng Thời trang 6", "0901000006", "ORD-F-0006", 30000m, 1, new Guid("00000064-0000-0000-0000-000000000000"), 180000m, null },
                    { new Guid("00002717-0000-0000-0000-000000000000"), new DateTime(2024, 4, 7, 10, 0, 0, 0, DateTimeKind.Utc), "Khách hàng Thời trang 7", "0901000007", "ORD-F-0007", 30000m, 2, new Guid("00000064-0000-0000-0000-000000000000"), 340000m, null },
                    { new Guid("00002718-0000-0000-0000-000000000000"), new DateTime(2024, 4, 8, 10, 0, 0, 0, DateTimeKind.Utc), "Khách hàng Thời trang 8", "0901000008", "ORD-F-0008", 30000m, 3, new Guid("00000064-0000-0000-0000-000000000000"), 510000m, null },
                    { new Guid("00002719-0000-0000-0000-000000000000"), new DateTime(2024, 4, 9, 10, 0, 0, 0, DateTimeKind.Utc), "Khách hàng Thời trang 9", "0901000009", "ORD-F-0009", 30000m, 4, new Guid("00000064-0000-0000-0000-000000000000"), 195000m, null },
                    { new Guid("0000271a-0000-0000-0000-000000000000"), new DateTime(2024, 4, 10, 10, 0, 0, 0, DateTimeKind.Utc), "Khách hàng Thời trang 10", "09010000010", "ORD-F-0010", 30000m, 0, new Guid("00000064-0000-0000-0000-000000000000"), 370000m, null },
                    { new Guid("00004e21-0000-0000-0000-000000000000"), new DateTime(2024, 4, 1, 10, 0, 0, 0, DateTimeKind.Utc), "Khách hàng Công nghệ 1", "0912000001", "ORD-T-0001", 20000m, 1, new Guid("000000c8-0000-0000-0000-000000000000"), 196000m, null },
                    { new Guid("00004e22-0000-0000-0000-000000000000"), new DateTime(2024, 4, 2, 10, 0, 0, 0, DateTimeKind.Utc), "Khách hàng Công nghệ 2", "0912000002", "ORD-T-0002", 20000m, 2, new Guid("000000c8-0000-0000-0000-000000000000"), 111000m, null },
                    { new Guid("00004e23-0000-0000-0000-000000000000"), new DateTime(2024, 4, 3, 10, 0, 0, 0, DateTimeKind.Utc), "Khách hàng Công nghệ 3", "0912000003", "ORD-T-0003", 20000m, 3, new Guid("000000c8-0000-0000-0000-000000000000"), 208000m, null },
                    { new Guid("00004e24-0000-0000-0000-000000000000"), new DateTime(2024, 4, 4, 10, 0, 0, 0, DateTimeKind.Utc), "Khách hàng Công nghệ 4", "0912000004", "ORD-T-0004", 20000m, 4, new Guid("000000c8-0000-0000-0000-000000000000"), 117000m, null },
                    { new Guid("00004e25-0000-0000-0000-000000000000"), new DateTime(2024, 4, 5, 10, 0, 0, 0, DateTimeKind.Utc), "Khách hàng Công nghệ 5", "0912000005", "ORD-T-0005", 20000m, 0, new Guid("000000c8-0000-0000-0000-000000000000"), 220000m, null },
                    { new Guid("00004e26-0000-0000-0000-000000000000"), new DateTime(2024, 4, 6, 10, 0, 0, 0, DateTimeKind.Utc), "Khách hàng Công nghệ 6", "0912000006", "ORD-T-0006", 20000m, 1, new Guid("000000c8-0000-0000-0000-000000000000"), 123000m, null },
                    { new Guid("00004e27-0000-0000-0000-000000000000"), new DateTime(2024, 4, 7, 10, 0, 0, 0, DateTimeKind.Utc), "Khách hàng Công nghệ 7", "0912000007", "ORD-T-0007", 20000m, 2, new Guid("000000c8-0000-0000-0000-000000000000"), 232000m, null },
                    { new Guid("00004e28-0000-0000-0000-000000000000"), new DateTime(2024, 4, 8, 10, 0, 0, 0, DateTimeKind.Utc), "Khách hàng Công nghệ 8", "0912000008", "ORD-T-0008", 20000m, 3, new Guid("000000c8-0000-0000-0000-000000000000"), 129000m, null },
                    { new Guid("00004e29-0000-0000-0000-000000000000"), new DateTime(2024, 4, 9, 10, 0, 0, 0, DateTimeKind.Utc), "Khách hàng Công nghệ 9", "0912000009", "ORD-T-0009", 20000m, 4, new Guid("000000c8-0000-0000-0000-000000000000"), 244000m, null },
                    { new Guid("00004e2a-0000-0000-0000-000000000000"), new DateTime(2024, 4, 10, 10, 0, 0, 0, DateTimeKind.Utc), "Khách hàng Công nghệ 10", "09120000010", "ORD-T-0010", 20000m, 0, new Guid("000000c8-0000-0000-0000-000000000000"), 135000m, null }
                });

            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "CostPrice", "CreatedAt", "LowStockThreshold", "Name", "SKU", "SalePrice", "Stock", "TenantId", "UpdatedAt" },
                values: new object[,]
                {
                    { new Guid("000003e9-0000-0000-0000-000000000000"), 52000m, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), 5, "Áo thun Polo Nam 1", "FASH-001", 125000m, 51, new Guid("00000064-0000-0000-0000-000000000000"), null },
                    { new Guid("000003ea-0000-0000-0000-000000000000"), 54000m, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), 5, "Áo thun Polo Nam 2", "FASH-002", 130000m, 52, new Guid("00000064-0000-0000-0000-000000000000"), null },
                    { new Guid("000003eb-0000-0000-0000-000000000000"), 56000m, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), 5, "Áo thun Polo Nam 3", "FASH-003", 135000m, 53, new Guid("00000064-0000-0000-0000-000000000000"), null },
                    { new Guid("000003ec-0000-0000-0000-000000000000"), 58000m, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), 5, "Áo thun Polo Nam 4", "FASH-004", 140000m, 54, new Guid("00000064-0000-0000-0000-000000000000"), null },
                    { new Guid("000003ed-0000-0000-0000-000000000000"), 60000m, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), 5, "Áo thun Polo Nam 5", "FASH-005", 145000m, 55, new Guid("00000064-0000-0000-0000-000000000000"), null },
                    { new Guid("000003ee-0000-0000-0000-000000000000"), 62000m, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), 5, "Áo thun Polo Nam 6", "FASH-006", 150000m, 56, new Guid("00000064-0000-0000-0000-000000000000"), null },
                    { new Guid("000003ef-0000-0000-0000-000000000000"), 64000m, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), 5, "Áo thun Polo Nam 7", "FASH-007", 155000m, 57, new Guid("00000064-0000-0000-0000-000000000000"), null },
                    { new Guid("000003f0-0000-0000-0000-000000000000"), 66000m, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), 5, "Áo thun Polo Nam 8", "FASH-008", 160000m, 58, new Guid("00000064-0000-0000-0000-000000000000"), null },
                    { new Guid("000003f1-0000-0000-0000-000000000000"), 68000m, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), 5, "Áo thun Polo Nam 9", "FASH-009", 165000m, 59, new Guid("00000064-0000-0000-0000-000000000000"), null },
                    { new Guid("000003f2-0000-0000-0000-000000000000"), 70000m, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), 5, "Áo thun Polo Nam 10", "FASH-010", 170000m, 60, new Guid("00000064-0000-0000-0000-000000000000"), null },
                    { new Guid("000007d1-0000-0000-0000-000000000000"), 31000m, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), 10, "Cáp sạc USB-C 1", "TECH-001", 88000m, 101, new Guid("000000c8-0000-0000-0000-000000000000"), null },
                    { new Guid("000007d2-0000-0000-0000-000000000000"), 32000m, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), 10, "Cáp sạc USB-C 2", "TECH-002", 91000m, 102, new Guid("000000c8-0000-0000-0000-000000000000"), null },
                    { new Guid("000007d3-0000-0000-0000-000000000000"), 33000m, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), 10, "Cáp sạc USB-C 3", "TECH-003", 94000m, 103, new Guid("000000c8-0000-0000-0000-000000000000"), null },
                    { new Guid("000007d4-0000-0000-0000-000000000000"), 34000m, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), 10, "Cáp sạc USB-C 4", "TECH-004", 97000m, 104, new Guid("000000c8-0000-0000-0000-000000000000"), null },
                    { new Guid("000007d5-0000-0000-0000-000000000000"), 35000m, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), 10, "Cáp sạc USB-C 5", "TECH-005", 100000m, 105, new Guid("000000c8-0000-0000-0000-000000000000"), null },
                    { new Guid("000007d6-0000-0000-0000-000000000000"), 36000m, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), 10, "Cáp sạc USB-C 6", "TECH-006", 103000m, 106, new Guid("000000c8-0000-0000-0000-000000000000"), null },
                    { new Guid("000007d7-0000-0000-0000-000000000000"), 37000m, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), 10, "Cáp sạc USB-C 7", "TECH-007", 106000m, 107, new Guid("000000c8-0000-0000-0000-000000000000"), null },
                    { new Guid("000007d8-0000-0000-0000-000000000000"), 38000m, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), 10, "Cáp sạc USB-C 8", "TECH-008", 109000m, 108, new Guid("000000c8-0000-0000-0000-000000000000"), null },
                    { new Guid("000007d9-0000-0000-0000-000000000000"), 39000m, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), 10, "Cáp sạc USB-C 9", "TECH-009", 112000m, 109, new Guid("000000c8-0000-0000-0000-000000000000"), null },
                    { new Guid("000007da-0000-0000-0000-000000000000"), 40000m, new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), 10, "Cáp sạc USB-C 10", "TECH-010", 115000m, 110, new Guid("000000c8-0000-0000-0000-000000000000"), null }
                });

            migrationBuilder.InsertData(
                table: "Tenants",
                columns: new[] { "Id", "CreatedAt", "Description", "Name", "UpdatedAt" },
                values: new object[,]
                {
                    { new Guid("00000064-0000-0000-0000-000000000000"), new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Chuyên quần áo nam nữ", "Shop Thời Trang", null },
                    { new Guid("000000c8-0000-0000-0000-000000000000"), new DateTime(2024, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "Phụ kiện điện thoại và máy tính", "Cửa Hàng Phụ Kiện", null }
                });

            migrationBuilder.InsertData(
                table: "OrderItems",
                columns: new[] { "Id", "CreatedAt", "OrderId", "ProductId", "Quantity", "UnitPrice", "UpdatedAt" },
                values: new object[,]
                {
                    { new Guid("00002af9-0000-0000-0000-000000000000"), new DateTime(2024, 4, 1, 10, 0, 0, 0, DateTimeKind.Utc), new Guid("00002711-0000-0000-0000-000000000000"), new Guid("000003e9-0000-0000-0000-000000000000"), 2, 125000m, null },
                    { new Guid("00002afa-0000-0000-0000-000000000000"), new DateTime(2024, 4, 2, 10, 0, 0, 0, DateTimeKind.Utc), new Guid("00002712-0000-0000-0000-000000000000"), new Guid("000003ea-0000-0000-0000-000000000000"), 3, 130000m, null },
                    { new Guid("00002afb-0000-0000-0000-000000000000"), new DateTime(2024, 4, 3, 10, 0, 0, 0, DateTimeKind.Utc), new Guid("00002713-0000-0000-0000-000000000000"), new Guid("000003eb-0000-0000-0000-000000000000"), 1, 135000m, null },
                    { new Guid("00002afc-0000-0000-0000-000000000000"), new DateTime(2024, 4, 4, 10, 0, 0, 0, DateTimeKind.Utc), new Guid("00002714-0000-0000-0000-000000000000"), new Guid("000003ec-0000-0000-0000-000000000000"), 2, 140000m, null },
                    { new Guid("00002afd-0000-0000-0000-000000000000"), new DateTime(2024, 4, 5, 10, 0, 0, 0, DateTimeKind.Utc), new Guid("00002715-0000-0000-0000-000000000000"), new Guid("000003ed-0000-0000-0000-000000000000"), 3, 145000m, null },
                    { new Guid("00002afe-0000-0000-0000-000000000000"), new DateTime(2024, 4, 6, 10, 0, 0, 0, DateTimeKind.Utc), new Guid("00002716-0000-0000-0000-000000000000"), new Guid("000003ee-0000-0000-0000-000000000000"), 1, 150000m, null },
                    { new Guid("00002aff-0000-0000-0000-000000000000"), new DateTime(2024, 4, 7, 10, 0, 0, 0, DateTimeKind.Utc), new Guid("00002717-0000-0000-0000-000000000000"), new Guid("000003ef-0000-0000-0000-000000000000"), 2, 155000m, null },
                    { new Guid("00002b00-0000-0000-0000-000000000000"), new DateTime(2024, 4, 8, 10, 0, 0, 0, DateTimeKind.Utc), new Guid("00002718-0000-0000-0000-000000000000"), new Guid("000003f0-0000-0000-0000-000000000000"), 3, 160000m, null },
                    { new Guid("00002b01-0000-0000-0000-000000000000"), new DateTime(2024, 4, 9, 10, 0, 0, 0, DateTimeKind.Utc), new Guid("00002719-0000-0000-0000-000000000000"), new Guid("000003f1-0000-0000-0000-000000000000"), 1, 165000m, null },
                    { new Guid("00002b02-0000-0000-0000-000000000000"), new DateTime(2024, 4, 10, 10, 0, 0, 0, DateTimeKind.Utc), new Guid("0000271a-0000-0000-0000-000000000000"), new Guid("000003f2-0000-0000-0000-000000000000"), 2, 170000m, null },
                    { new Guid("00005209-0000-0000-0000-000000000000"), new DateTime(2024, 4, 1, 10, 0, 0, 0, DateTimeKind.Utc), new Guid("00004e21-0000-0000-0000-000000000000"), new Guid("000007d1-0000-0000-0000-000000000000"), 2, 88000m, null },
                    { new Guid("0000520a-0000-0000-0000-000000000000"), new DateTime(2024, 4, 2, 10, 0, 0, 0, DateTimeKind.Utc), new Guid("00004e22-0000-0000-0000-000000000000"), new Guid("000007d2-0000-0000-0000-000000000000"), 1, 91000m, null },
                    { new Guid("0000520b-0000-0000-0000-000000000000"), new DateTime(2024, 4, 3, 10, 0, 0, 0, DateTimeKind.Utc), new Guid("00004e23-0000-0000-0000-000000000000"), new Guid("000007d3-0000-0000-0000-000000000000"), 2, 94000m, null },
                    { new Guid("0000520c-0000-0000-0000-000000000000"), new DateTime(2024, 4, 4, 10, 0, 0, 0, DateTimeKind.Utc), new Guid("00004e24-0000-0000-0000-000000000000"), new Guid("000007d4-0000-0000-0000-000000000000"), 1, 97000m, null },
                    { new Guid("0000520d-0000-0000-0000-000000000000"), new DateTime(2024, 4, 5, 10, 0, 0, 0, DateTimeKind.Utc), new Guid("00004e25-0000-0000-0000-000000000000"), new Guid("000007d5-0000-0000-0000-000000000000"), 2, 100000m, null },
                    { new Guid("0000520e-0000-0000-0000-000000000000"), new DateTime(2024, 4, 6, 10, 0, 0, 0, DateTimeKind.Utc), new Guid("00004e26-0000-0000-0000-000000000000"), new Guid("000007d6-0000-0000-0000-000000000000"), 1, 103000m, null },
                    { new Guid("0000520f-0000-0000-0000-000000000000"), new DateTime(2024, 4, 7, 10, 0, 0, 0, DateTimeKind.Utc), new Guid("00004e27-0000-0000-0000-000000000000"), new Guid("000007d7-0000-0000-0000-000000000000"), 2, 106000m, null },
                    { new Guid("00005210-0000-0000-0000-000000000000"), new DateTime(2024, 4, 8, 10, 0, 0, 0, DateTimeKind.Utc), new Guid("00004e28-0000-0000-0000-000000000000"), new Guid("000007d8-0000-0000-0000-000000000000"), 1, 109000m, null },
                    { new Guid("00005211-0000-0000-0000-000000000000"), new DateTime(2024, 4, 9, 10, 0, 0, 0, DateTimeKind.Utc), new Guid("00004e29-0000-0000-0000-000000000000"), new Guid("000007d9-0000-0000-0000-000000000000"), 2, 112000m, null },
                    { new Guid("00005212-0000-0000-0000-000000000000"), new DateTime(2024, 4, 10, 10, 0, 0, 0, DateTimeKind.Utc), new Guid("00004e2a-0000-0000-0000-000000000000"), new Guid("000007da-0000-0000-0000-000000000000"), 1, 115000m, null }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "OrderItems",
                keyColumn: "Id",
                keyValue: new Guid("00002af9-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "OrderItems",
                keyColumn: "Id",
                keyValue: new Guid("00002afa-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "OrderItems",
                keyColumn: "Id",
                keyValue: new Guid("00002afb-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "OrderItems",
                keyColumn: "Id",
                keyValue: new Guid("00002afc-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "OrderItems",
                keyColumn: "Id",
                keyValue: new Guid("00002afd-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "OrderItems",
                keyColumn: "Id",
                keyValue: new Guid("00002afe-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "OrderItems",
                keyColumn: "Id",
                keyValue: new Guid("00002aff-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "OrderItems",
                keyColumn: "Id",
                keyValue: new Guid("00002b00-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "OrderItems",
                keyColumn: "Id",
                keyValue: new Guid("00002b01-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "OrderItems",
                keyColumn: "Id",
                keyValue: new Guid("00002b02-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "OrderItems",
                keyColumn: "Id",
                keyValue: new Guid("00005209-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "OrderItems",
                keyColumn: "Id",
                keyValue: new Guid("0000520a-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "OrderItems",
                keyColumn: "Id",
                keyValue: new Guid("0000520b-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "OrderItems",
                keyColumn: "Id",
                keyValue: new Guid("0000520c-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "OrderItems",
                keyColumn: "Id",
                keyValue: new Guid("0000520d-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "OrderItems",
                keyColumn: "Id",
                keyValue: new Guid("0000520e-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "OrderItems",
                keyColumn: "Id",
                keyValue: new Guid("0000520f-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "OrderItems",
                keyColumn: "Id",
                keyValue: new Guid("00005210-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "OrderItems",
                keyColumn: "Id",
                keyValue: new Guid("00005211-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "OrderItems",
                keyColumn: "Id",
                keyValue: new Guid("00005212-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("000003e9-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("000003ea-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("000003eb-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("000003ec-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("000003ed-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("000003ee-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("000003ef-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("000003f0-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("000003f1-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("000003f2-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("000007d1-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("000007d2-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("000007d3-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("000007d4-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("000007d5-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("000007d6-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("000007d7-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("000007d8-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("000007d9-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValue: new Guid("000007da-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "Tenants",
                keyColumn: "Id",
                keyValue: new Guid("00000064-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "Tenants",
                keyColumn: "Id",
                keyValue: new Guid("000000c8-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: new Guid("00002711-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: new Guid("00002712-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: new Guid("00002713-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: new Guid("00002714-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: new Guid("00002715-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: new Guid("00002716-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: new Guid("00002717-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: new Guid("00002718-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: new Guid("00002719-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: new Guid("0000271a-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: new Guid("00004e21-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: new Guid("00004e22-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: new Guid("00004e23-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: new Guid("00004e24-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: new Guid("00004e25-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: new Guid("00004e26-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: new Guid("00004e27-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: new Guid("00004e28-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: new Guid("00004e29-0000-0000-0000-000000000000"));

            migrationBuilder.DeleteData(
                table: "Orders",
                keyColumn: "Id",
                keyValue: new Guid("00004e2a-0000-0000-0000-000000000000"));
        }
    }
}
