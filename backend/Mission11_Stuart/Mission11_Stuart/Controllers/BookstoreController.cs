using Microsoft.AspNetCore.Mvc;
using Mission11_Stuart.Data;
namespace Mission11_Stuart.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookstoreController : ControllerBase
    {
        private readonly BookstoreContext _context;

        public BookstoreController(BookstoreContext temp) => _context = temp;

        [HttpGet(Name = "GetBook")]
        public IActionResult GetBook(int pageSize = 10, int pageNum = 1) // Pagination params from frontend
        {
            var BookList = _context.Books
                .Skip((pageNum - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            var totalNumBooks = _context.Books.Count();

            return Ok(new
            {
                Books = BookList,
                TotalNumBooks = totalNumBooks,
                TotalPages = (int)Math.Ceiling((double)totalNumBooks / pageSize)
            });
        }
    }
}
