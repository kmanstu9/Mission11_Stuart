import { useState } from 'react';
import BookList from '../Components/BookList';
import Filter from '../Components/Filter';
import CartSummary from '../Components/CartSummary';

function BookPage() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <>
      <div>
        <CartSummary />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <Filter
              selectedCategories={selectedCategories}
              setSelectedCategories={setSelectedCategories}
            />
          </div>
          <div className="col-md-9">
            <BookList selectedCategories={selectedCategories} />
          </div>
        </div>
      </div>
    </>
  );
}

export default BookPage;
