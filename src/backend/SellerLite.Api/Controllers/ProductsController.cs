using Microsoft.AspNetCore.Mvc;
using SellerLite.Application.Products.Commands.CreateProduct;
using SellerLite.Application.Products.Queries.GetProducts;

namespace SellerLite.Api.Controllers;

public class ProductsController : ApiControllerBase
{
    [HttpGet]
    public async Task<ActionResult<List<ProductDto>>> GetProducts()
    {
        return await Mediator.Send(new GetProductsQuery());
    }

    [HttpPost]
    public async Task<ActionResult<Guid>> CreateProduct([FromBody] CreateProductCommand command)
    {
        var productId = await Mediator.Send(command);
        return CreatedAtAction(nameof(GetProducts), new { id = productId }, productId);
        // Ideally should have a GetProductById endpoint and use it in CreatedAtAction
    }
}
