using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SellerLite.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class Update_GetOrderById_SP : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
            IF EXISTS (SELECT * FROM sys.objects WHERE type = 'P' AND name = 'GetOrderById')
                DROP PROCEDURE GetOrderById;
            GO
            CREATE PROCEDURE GetOrderById
                @id uniqueidentifier
            AS
            BEGIN
                SET NOCOUNT ON;
            
                -- Get order details
                SELECT 
                    Id, OrderNumber, Status, TotalPrice, ShippingFee, CustomerName, CreatedAt 
                FROM Orders
                WHERE Id = @id;

                -- Get order items
                SELECT 
                    oi.ProductId, p.SKU, p.Name AS ProductName, oi.Quantity, oi.UnitPrice 
                FROM OrderItems oi
                JOIN Products p ON oi.ProductId = p.Id
                WHERE oi.OrderId = @id;
            END
            ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DROP PROCEDURE GetOrderById");
        }
    }
}
