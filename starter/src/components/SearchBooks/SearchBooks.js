import React, { useEffect, useState } from "react";
import Book from "../Book/Book";

const SearchBooks = (props) => {
  const { onClose, searchedBooks, onSearchQuery, updateShelf } = props;

  const [searchTerm, setSearchTerm] = useState("");
  const [isValidSearch, setValidSearch] = useState(false);

  const closeSearchBooksPageHandler = () => {
    onClose();
    setSearchTerm("");
    setValidSearch(false);
  };

  const searchQueryHandler = (e) => {
    setSearchTerm(e.target.value);
  };

  //   cleanup to not flood fetch requests
  useEffect(() => {
    const identifier = setTimeout(() => {
      setValidSearch(searchTerm.length > 0);
      onSearchQuery(searchTerm);
    }, 800);

    return () => {
      clearTimeout(identifier);
    };
  }, [searchTerm]);

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <a className="close-search" onClick={closeSearchBooksPageHandler}>
          Close
        </a>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={searchTerm}
            onChange={searchQueryHandler}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {isValidSearch && Array.isArray(searchedBooks)
            ? searchedBooks.map((book) => {
                return (
                  <Book
                    bookTitle={book.title}
                    bookAuthor={book.authors}
                    thumbnail={
                      book.imageLinks?.thumbnail ||
                      "https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg"
                    }
                    key={book.id}
                    currentShelf={book.shelf}
                    onUpdateShelf={updateShelf}
                    bookData={book}
                  />
                );
              })
            : null}
        </ol>
      </div>
    </div>
  );
};

export default SearchBooks;
