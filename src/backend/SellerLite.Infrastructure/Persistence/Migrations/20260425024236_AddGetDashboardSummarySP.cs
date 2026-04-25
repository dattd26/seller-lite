using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SellerLite.Infrastructure.Persistence.Migrations
{
    /// <inheritdoc />
    public partial class AddGetDashboardSummarySP : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql(@"
                CREATE PROCEDURE GetDashboardSummary
                    @completedStatus INT,
                    @startDate DATETIME
                AS
                BEGIN
                    SET NOCOUNT ON;

                    -- 1. Summary
                    SELECT 
                        ISNULL(SUM(TotalPrice), 0) as TotalRevenue, 
                        COUNT(Id) as TotalOrders 
                    FROM Orders 
                    WHERE Status = @completedStatus;

                    -- 2. Low Stock
                    SELECT COUNT(Id) FROM Products WHERE Stock <= LowStockThreshold;

                    -- 3. Daily Trends
                    SELECT 
                        FORMAT(CreatedAt, 'dd/MM') as Date, 
                        SUM(TotalPrice) as Revenue 
                    FROM Orders 
                    WHERE Status = @completedStatus AND CreatedAt >= @startDate
                    GROUP BY FORMAT(CreatedAt, 'dd/MM'), CAST(CreatedAt AS DATE)
                    ORDER BY CAST(CreatedAt AS DATE);

                    -- 4. Category Breakdown
                    SELECT 
                        p.Category, 
                        SUM(oi.Quantity * oi.UnitPrice) as Revenue, 
                        COUNT(oi.Id) as Count 
                    FROM OrderItems oi 
                    JOIN Products p ON oi.ProductId = p.Id 
                    JOIN Orders o ON oi.OrderId = o.Id 
                    WHERE o.Status = @completedStatus
                    GROUP BY p.Category
                    ORDER BY Revenue DESC;

                    -- 5. Top Products
                    SELECT TOP 5 
                        p.Name, 
                        SUM(oi.Quantity) as Quantity 
                    FROM OrderItems oi 
                    JOIN Products p ON oi.ProductId = p.Id 
                    JOIN Orders o ON oi.OrderId = o.Id 
                    WHERE o.Status = @completedStatus
                    GROUP BY p.Name
                    ORDER BY Quantity DESC;
                END");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("DROP PROCEDURE GetDashboardSummary");
        }
    }
}
