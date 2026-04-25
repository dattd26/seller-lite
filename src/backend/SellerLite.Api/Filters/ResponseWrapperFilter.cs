using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using SellerLite.Api.Models;

namespace SellerLite.Api.Filters;

public class ResponseWrapperFilter : IAsyncResultFilter
{
    public async Task OnResultExecutionAsync(ResultExecutingContext context, ResultExecutionDelegate next)
    {
        if (context.Result is ObjectResult objectResult)
        {
            // Don't wrap if it's already an ApiResponse
            if (objectResult.Value != null && objectResult.Value.GetType().IsGenericType && objectResult.Value.GetType().GetGenericTypeDefinition() == typeof(ApiResponse<>))
            {
                await next();
                return;
            }

            var isSuccess = objectResult.StatusCode == null || (objectResult.StatusCode >= 200 && objectResult.StatusCode < 300);
            
            if (isSuccess)
            {
                var response = ApiResponse<object>.Ok(objectResult.Value);
                context.Result = new ObjectResult(response)
                {
                    StatusCode = objectResult.StatusCode
                };
            }
            else
            {
                object errors = null;
                string message = "Request failed";
                
                if (objectResult.Value is ValidationProblemDetails problemDetails)
                {
                    errors = problemDetails.Errors;
                    message = problemDetails.Title;
                }

                var response = ApiResponse<object>.Fail(message, errors);
                context.Result = new ObjectResult(response)
                {
                    StatusCode = objectResult.StatusCode
                };
            }
        }
        else if (context.Result is EmptyResult || context.Result is StatusCodeResult)
        {
            // Handle NoContent(), Ok() without body, etc.
            int statusCode = (context.Result as StatusCodeResult)?.StatusCode ?? 200;
            var isSuccess = statusCode >= 200 && statusCode < 300;
            
            if (isSuccess)
            {
                context.Result = new ObjectResult(ApiResponse<object>.Ok(null)) { StatusCode = statusCode };
            }
            else
            {
                 context.Result = new ObjectResult(ApiResponse<object>.Fail("Request failed")) { StatusCode = statusCode };
            }
        }

        await next();
    }
}
