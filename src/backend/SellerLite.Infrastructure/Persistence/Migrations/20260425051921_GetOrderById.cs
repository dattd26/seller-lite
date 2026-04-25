using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SellerLite.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class GetOrderById : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
            CREATE PROCEDURE GetOrderById
                @id uniqueidentifier
            AS
            BEGIN
                SET NOCOUNT ON;
            
                -- Get order details
                SELECT 
                    Id, OrderNumber, Status, TotalPrice, CustomerName, CreatedAt 
                FROM Orders 
                WHERE Id = @id;

                -- Get order items
                SELECT 
                    oi.ProductId, p.Name AS ProductName, oi.Quantity, oi.UnitPrice 
                FROM OrderItems oi
                JOIN Products p ON oi.ProductId = p.Id
                WHERE oi.OrderId = @id;
            END
            ");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
            DROP PROCEDURE IF EXISTS GetOrderById;");
        }
    }
}
