import Book from "../Book/Book";

const BookShelf = (props) => {
  const { title, books, shelf, updateShelf } = props;

  const filteredBooks = books.filter((book) => book.shelf === shelf);

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {filteredBooks.map((book) => (
            <li>
              <Book
                bookTitle={book.title}
                bookAuthor={book.authors}
                thumbnail={
                  book.imageLinks.smallThumbnail || book.imageLinks.thumbnail
                }
                key={book.id}
                currentShelf={shelf}
                onUpdateShelf={updateShelf}
                bookData={book}
              />
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default BookShelf;
