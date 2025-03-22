using System.Globalization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Mission11_Malone.Data;

namespace Mission11_Malone.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookDbContext _bookContext;


        public BookController(BookDbContext temp) => _bookContext = temp;

        // GET: /Book/AllBooks
        [HttpGet("AllBooks")]
        public IActionResult GetBooks(int pageSize = 5, string sortBy = "Title", int pageNum = 1, string order = "asc")
        {

            // Validate the query parameters
            var booksQuery = _bookContext.Books.AsQueryable();

            // Apply sorting
            booksQuery = order.ToLower() == "desc"
                ? booksQuery.OrderByDescending(b => EF.Property<object>(b, sortBy))
                : booksQuery.OrderBy(b => EF.Property<object>(b, sortBy));


            int totalItems = booksQuery.Count();

            // Apply pagination
            var returnBooks = booksQuery
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            // Return the result
            var returnObject = new
            {
                TotalBooks = totalItems,
                Books = returnBooks
            };

            return Ok(returnObject);
        }

    }
}
