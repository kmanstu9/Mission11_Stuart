import { useEffect, useState } from 'react';

function Filter({
  selectedCategories,
  setSelectedCategories,
}: {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
}) {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'https://localhost:5000/api/Bookstore/GetCategories'
        );
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };

    fetchCategories();
  }, []);

  function handleCheckBoxChange({ target }: { target: HTMLInputElement }) {
    const updatedCategories = selectedCategories.includes(target.value)
      ? selectedCategories.filter((s) => s !== target.value)
      : [...selectedCategories, target.value];

    setSelectedCategories(updatedCategories);
  }

  return (
    <div className="accordion" id="categoryAccordion">
      {categories.map((c, index) => (
        <div className="accordion-item" key={index}>
          <h2 className="accordion-header" id={`heading${index}`}>
            <button
              className="accordion-button collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target={`#collapse${index}`}
              aria-expanded="false"
              aria-controls={`collapse${index}`}
            >
              {c}
            </button>
          </h2>
          <div
            id={`collapse${index}`}
            className="accordion-collapse collapse"
            aria-labelledby={`heading${index}`}
            data-bs-parent="#categoryAccordion"
          >
            <div className="accordion-body">
              <input
                type="checkbox"
                id={c}
                value={c}
                checked={selectedCategories.includes(c)}
                onChange={handleCheckBoxChange}
              />
              <label htmlFor={c} className="ms-2">
                {c}
              </label>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Filter;
