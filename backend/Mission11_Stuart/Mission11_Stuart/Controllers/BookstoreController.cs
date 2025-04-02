using Microsoft.AspNetCore.Mvc;
using Mission11_Stuart.Data;
using System.Linq;

namespace Mission11_Stuart.Controllers;

[Route("api/[controller]")]
[ApiController]
public class BookstoreController : ControllerBase
{
    private readonly BookstoreContext _context;

    public BookstoreController(BookstoreContext temp) => _context = temp;

    [HttpGet(Name = "GetBook")]
    public IActionResult GetBook(int pageSize = 10, int pageNum = 1, [FromQuery] string[]? categories = null)
    {
        var query = _context.Books.AsQueryable();

        if (categories != null && categories.Any())
        {
            query = query.Where(b => categories.Contains(b.Category));
        }

        var totalNumBooks = query.Count();

        var BookList = query
            .Skip((pageNum - 1) * pageSize)
            .Take(pageSize)
            .ToList();

        return Ok(new
        {
            Books = BookList,
            TotalNumBooks = totalNumBooks,
            TotalPages = (int)Math.Ceiling((double)totalNumBooks / pageSize)
        });
    }

    [HttpGet("GetCategories")]
    public IActionResult GetCategories()
    {
        var categories = _context.Books
            .Select(p => p.Category)
            .Distinct()
            .ToList();

        return Ok(categories);
    }



        [HttpPost("AddBook")]
        public IActionResult AddBook([FromBody] Book newBook)
        {
            _context.Books.Add(newBook);
            _context.SaveChanges();
            return Ok(newBook);
        }


[HttpPut("UpdateBook/{bookid}")]
public IActionResult UpdateBook(int bookid, [FromBody] Book updatedBook)
{
    var existingBook = _context.Books.Find(bookid);

    existingBook.Title = updatedBook.Title;
    existingBook.Author = updatedBook.Author;
    existingBook.Publisher = updatedBook.Publisher;
    existingBook.Isbn = updatedBook.Isbn;
    existingBook.Classification = updatedBook.Classification;
    existingBook.Category = updatedBook.Category;
    existingBook.PageCount = updatedBook.PageCount;
    existingBook.Price = updatedBook.Price;

    _context.Books.Update(existingBook);
    _context.SaveChanges();

    return Ok(existingBook);
}


        [HttpDelete("DeleteBook/{bookid}")]
        public IActionResult DeleteBook(int bookid)
        {

            var book = _context.Books.Find(bookid);

            if (book == null)
            {
                return NotFound(new { message = "Book not found" });
            }

            _context.Books.Remove(book);
            _context.SaveChanges();

            return NoContent(); 

        }

}

