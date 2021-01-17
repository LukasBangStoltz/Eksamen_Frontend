import { useState } from "react";
import facade from "./apiFacade.js";
import "bootstrap/dist/css/bootstrap.min.css";

function Books(params) {
  const bookObj = [
    {
      isbn: "",
      title: "",
      authors: "",
      publisher: "",
      publishYear: "",
      isAvalible: "",
    },
  ];

  const deliverObj = {
    checkoutDate: "",
    dueDate: "",
    returnedDate: "",
  };

  const [books, setBooks] = useState(bookObj);
  const [input, setInput] = useState("");
  const [deliver, setDeliver] = useState(deliverObj);

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

  const loanBook = (evt) => {
    evt.preventDefault();
    let isbn = evt.target.id;
    facade.loanABook(isbn).then((data) => {
      setDeliver(data);
    });
  };

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
          </tr>
          {books.map((book) => (
            <tr key={book.isbn}>
              <td>{book.title}</td>
              <td>{book.authors}</td>
              <td>{book.isAvalible.toString()}</td>
              <td>
                <button id={book.isbn} onClick={loanBook}>
                  Loan me!
                </button>
              </td>
            </tr>
          ))}
        </thead>
        <tbody>{/*Add the rows here */}</tbody>
      </table>

      {deliver.dueDate !== "" && (
        <p>You have now loaned the book! delevery date: {deliver.dueDate}</p>
      )}
    </div>
  );
}

export default Books;
