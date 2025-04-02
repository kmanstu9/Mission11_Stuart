import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchBooks } from '../api/BookAPI';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useCart } from '../context/CartContext'; // <-- if you're using CartContext

import Pagination from './Pagination';
import { Book } from '../types/book';

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
  const [books, setBooks] = useState<Book[]>([]);
  const [pageSize, setPageSize] = useState<number>(10); // use this to set the number of books to display per page. alone is incomplete, need to go to bottom of page
  const [pageNum, setPageNum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null); // this is for error handling
  const [loading, setLoading] = useState<boolean>(true); // this is for loading state
  const [sortAsc, setSortAsc] = useState<boolean>(true);
  const { addToCart } = useCart();

  const sortedBooks = [...books].sort((a, b) => {
    return sortAsc
      ? a.title.localeCompare(b.title)
      : b.title.localeCompare(a.title);
  });

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true); // set loading to true when starting to fetch data
        const data = await fetchBooks(pageSize, pageNum, selectedCategories);
        setBooks(data.books); // thsi needs to match whats on the json file
        setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [pageSize, pageNum, selectedCategories]); // this is the dependancy array, if you want it to watch for soemthing specific, put it in here

  if (loading) return <p>Loading books...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <>
      <h1>Book List</h1>
      <button
        className="btn btn-primary mb-3"
        onClick={() => setSortAsc(!sortAsc)}
      >
        Sort by Title {sortAsc ? '↑' : '↓'}
      </button>

      {sortedBooks.map((b) => (
        <div id="bookCard" className="card mb-3" key={b.bookId}>
          <h3 className="card-title p-3">{b.title}</h3>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                <strong>Author:</strong> {b.author}
              </li>
              <li>
                <strong>Publisher:</strong> {b.publisher}
              </li>
              <li>
                <strong>ISBN:</strong> {b.isbn}
              </li>
              <li>
                <strong>Classification:</strong> {b.classification}
              </li>
              <li>
                <strong>Category:</strong> {b.category}
              </li>
              <li>
                <strong>Page Count:</strong> {b.pageCount}
              </li>
              <li>
                <strong>Price:</strong> ${b.price.toFixed(2)}
              </li>
            </ul>
            <button
              className="btn btn-success"
              onClick={() => {
                addToCart({
                  ...b,
                  bookId: 0,
                  quantity: 0,
                }); //

                navigate('/cart');
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}

      <br />
      <Pagination
        currentPage={pageNum}
        totalPages={totalPages}
        pageSize={pageSize}
        onPageChange={setPageNum}
        onPageSizeChange={(newSize) => {
          setPageSize(newSize);
          setPageNum(1);
        }}
      />
    </>
  );
}

export default BookList;
