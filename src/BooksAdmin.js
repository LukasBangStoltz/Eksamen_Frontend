import { useEffect, useState } from "react";
import facade from "./apiFacade.js";
import "bootstrap/dist/css/bootstrap.min.css";

function BooksAdmin() {
  const bookObj = [
    {
      isbn: "",
      title: "",
      authors: "",
      publisher: "",
      publishYear: "",
      isAvalible: true,
    },
  ];

  const [books, setBooks] = useState(bookObj);
  const [input, setInput] = useState("");

  const onChange = (evt) => {
    setInput(evt.target.value);
  };

  const fetchAllBooks = (evt) => {
    evt.preventDefault();
    facade.fetchAllBooks().then((data) => {
      setBooks(data);
    });
  };
  const fetchBook = (evt) => {
    evt.preventDefault();
    facade.fetchBookByTitle(input).then((data) => {
      setBooks([data]);
    });
  };

  const deleteBook = (evt) => {
    evt.preventDefault();
    facade.removeBook(evt.target.id);
  };

  useEffect(() => {
    facade.fetchAllBooks().then((data) =>{
        setBooks(data)
    })
  },[input])

  return (
    <div>
      <br></br>
      <div className="row">
        <div className="col-3">
          <button onClick={fetchAllBooks}>Get all books</button>
        </div>

        <div className="col-3">
          <h2>Search for a book</h2>
          <form onChange={onChange}>
            <p>{input}</p>
            <input placeholder="Enter book name" id="phone" />
            <button onClick={fetchBook}>Click</button>
          </form>
        </div>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>title</th>
            <th>authors</th>
            <th>is avalibe?</th>
            <th>isbn</th>
          </tr>
          {books.map((book) => (
            <tr key={book.isbn}>
              <td>{book.title}</td>
              <td>{book.authors}</td>
              <td>{book.isAvalible.toString()}</td>
              <td>{book.isbn}</td>
              <td>
                <button id = {book.isbn} onClick={deleteBook}>Delete me!</button>
              </td>
            </tr>
          ))}
        </thead>
        <tbody>{/*Add the rows here */}</tbody>
      </table>

      
    </div>
  );
}

export default BooksAdmin;
