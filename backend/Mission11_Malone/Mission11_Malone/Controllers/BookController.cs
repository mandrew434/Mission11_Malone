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
        public IActionResult GetBooks(int pageSize = 5, string sortBy = "Title", int pageNum = 1, string order = "asc", [FromQuery] List<string>? bookCategory = null)
        {

            // Validate the query parameters
            var booksQuery = _bookContext.Books.AsQueryable();

            //Allow to sort by multiple fields if needed
            if (bookCategory != null && bookCategory.Any())
            {
                booksQuery = booksQuery.Where(b => bookCategory.Contains(b.Category));
                Console.WriteLine("Filtering books by categories: " + string.Join(", ", bookCategory));
            }

            // Apply sorting
            booksQuery = order.ToLower() == "desc"
                ? booksQuery.OrderByDescending(b => EF.Property<object>(b, sortBy))
                : booksQuery.OrderBy(b => EF.Property<object>(b, sortBy));


            var totalItems = booksQuery.Count();

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

        // GET request for book categories
        [HttpGet("GetBookCategories")]
        public IActionResult GetBookCategories () 
        {
            var bookCategories = _bookContext.Books
                .Select(b => b.Category)
                .Distinct()
                .ToList();

            // Return the list of distinct book categories
            return Ok(bookCategories);
        }

    }
}
