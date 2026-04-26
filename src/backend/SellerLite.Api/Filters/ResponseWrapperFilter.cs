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
                
                // Chuyển 204 No Content thành 200 OK vì chúng ta đang trả về một body (ApiResponse wrapper)
                // Một số client/browser sẽ bỏ qua body nếu status code là 204.
                int? statusCode = objectResult.StatusCode == 204 ? 200 : objectResult.StatusCode;

                context.Result = new ObjectResult(response)
                {
                    StatusCode = statusCode
                };
            }
            else
            {
                object? errors = null;
                string message = "Request failed";
                
                if (objectResult.Value is ValidationProblemDetails problemDetails)
                {
                    errors = problemDetails.Errors;
                    message = problemDetails.Title ?? message;
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
            // Xử lý NoContent(), Ok() không có body, v.v.
            var statusCodeResult = context.Result as StatusCodeResult;
            int statusCode = statusCodeResult?.StatusCode ?? 200;
            var isSuccess = statusCode >= 200 && statusCode < 300;
            
            if (isSuccess)
            {
                // Chuyển 204 No Content thành 200 OK vì chúng ta đang trả về một body (ApiResponse wrapper)
                int finalStatusCode = statusCode == 204 ? 200 : statusCode;
                context.Result = new ObjectResult(ApiResponse<object>.Ok(null)) { StatusCode = finalStatusCode };
            }
            else
            {
                 context.Result = new ObjectResult(ApiResponse<object>.Fail("Request failed")) { StatusCode = statusCode };
            }
        }

        await next();
    }
}
