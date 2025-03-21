import { useEffect, useState } from 'react';
import { Book } from './types/book';
import 'bootstrap/dist/css/bootstrap.min.css';

function BookList() {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortAsc, setSortAsc] = useState<boolean>(true);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(
        `https://localhost:5000/api/Bookstore?pageSize=${pageSize}&pageNum=${pageNum}`,
        { credentials: 'include' }
      );
      const data = await response.json();
      console.log("Fetched data:", data);
      setBooks(data.books);
      setTotalItems(data.totalNumBooks);
      setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
    };

    fetchBooks();
  }, [pageSize, pageNum]);

  const sortedBooks = [...books].sort((a, b) => {
    if (a.title < b.title) return sortAsc ? -1 : 1;
    if (a.title > b.title) return sortAsc ? 1 : -1;
    return 0;
  });

  return (
    <>
      <h1>Book List</h1>
      <button className="btn btn-primary mb-3" onClick={() => setSortAsc(!sortAsc)}>
        Sort by Title {sortAsc ? '↑' : '↓'}
      </button>

      {sortedBooks.map((b) => (
        <div id="bookCard" className="card mb-3" key={b.bookid}>
          <h3 className="card-title p-3">{b.title}</h3>
          <div className="card-body">
            <ul className="list-unstyled">
              <li><strong>Author:</strong> {b.author}</li>
              <li><strong>Publisher:</strong> {b.publisher}</li>
              <li><strong>ISBN:</strong> {b.isbn}</li>
              <li><strong>Classification:</strong> {b.classification}</li>
              <li><strong>Category:</strong> {b.category}</li>
              <li><strong>Page Count:</strong> {b.pagecount}</li>
              <li><strong>Price:</strong> ${b.price.toFixed(2)}</li>
            </ul>
          </div>
        </div>
      ))}

      <div className="my-3">
        <button className="btn btn-secondary me-2" disabled={pageNum === 1} onClick={() => setPageNum(pageNum - 1)}>
          Previous
        </button>
        {
          [...Array(totalPages)].map((_, i) => (
            <button
              className={`btn ${pageNum === (i + 1) ? 'btn-primary' : 'btn-outline-primary'} me-1`}
              key={i + 1}
              onClick={() => setPageNum(i + 1)}
            >
              {i + 1}
            </button>
          ))
        }
        <button className="btn btn-secondary ms-2" disabled={pageNum === totalPages} onClick={() => setPageNum(pageNum + 1)}>
          Next
        </button>
      </div>

      <label>
        Results per page:&nbsp;
        <select
          className="form-select w-auto d-inline-block"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
            setPageNum(1);
          }}
        >
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
        </select>
      </label>
    </>
  );
}

export default BookList;
