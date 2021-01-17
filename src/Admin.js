import { useState } from "react";
import facade from "./apiFacade.js";
import "bootstrap/dist/css/bootstrap.min.css";
import BooksAdmin from "./BooksAdmin.js";
import { useRouteMatch, BrowserRouter as Router } from "react-router-dom";

function Admin() {
  const bookObj = {
    isbn: "",
    title: "",
    authors: "",
    publisher: "",
    publishYear: "",
    isAvalible: true,
  };

  const [book, setBook] = useState(bookObj);

  const onChange = (evt) => {
    evt.preventDefault();
    setBook({ ...book, [evt.target.id]: evt.target.value });
    console.log(book);
  };
  const addABook = (evt) => {
    evt.preventDefault();
    facade.addABook(book);
  };

  return (
    <div>
      <p>Du er logget ind som admin og har adgang til denne side</p>
      <Router>
        <BooksAdmin></BooksAdmin>
      </Router>

      <form className="form-horizontal">
        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="fName">
            ISBN- number:
          </label>
          <div className="col-sm-9">
            <input className="form-control" id="isbn" onChange={onChange} />
          </div>
        </div>

        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="lName">
          title:
          </label>
          <div className="col-sm-9">
            <input
              className="form-control"
              id="title"
              onChange={onChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="phone">
          authors:
          </label>
          <div className="col-sm-9">
            <input
              type="text"
              className="form-control"
              id="authors"
              onChange={onChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="street">
          publisher:
          </label>
          <div className="col-sm-9">
            <input
              className="form-control"
              id="publisher"
              onChange={onChange}
            />
          </div>
        </div>

        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="zip">
          publishYear:
          </label>
          <div className="col-sm-9">
            <input
              className="form-control"
              id="publishYear"
              onChange={onChange}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="control-label col-sm-3" htmlFor="zip">
          isAvalible:
          </label>
          <div className="col-sm-9">
            <input
              className="form-control"
              id="isAvalible"
              onChange={onChange}
            />
          </div>
        </div>

        <div className="form-group">
          <div className="col-sm-offset-3 col-sm-9">
            <button
              onClick={addABook}
              type="submit"
              className="btn btn-primary"
            >
              Add Book
            </button>
            <button type="button" className="btn btn-dark">
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Admin;
