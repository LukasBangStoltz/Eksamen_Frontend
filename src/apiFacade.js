import { URL } from "./settings.js";

function handleHttpErrors(res) {
  if (!res.ok) {
    return Promise.reject({ status: res.status, fullError: res.json() });
  }
  return res.json();
}

function apiFacade() {
  /* Insert utility-methods from a latter step (d) here (REMEMBER to uncomment in the returned object when you do)*/
  const setToken = (token) => {
    localStorage.setItem("jwtToken", token);
  };

  const getToken = () => {
    return localStorage.getItem("jwtToken");
  };

  const loggedIn = () => {
    const loggedIn = getToken() != null;

    return loggedIn;
  };
  const logout = () => {
    localStorage.removeItem("jwtToken");
  };

  const login = (user, password) => {
    const options = makeOptions("POST", true, {
      username: user,
      password: password,
    });
    return fetch(URL + "/api/login", options)
      .then(handleHttpErrors)
      .then((res) => {
        setToken(res.token);
      });
  };

  const getRole = () => {
    let myToken = getToken();
    let tokenData = myToken.split(".")[1];
    let decoedeJsonData = window.atob(tokenData);
    let decodedJwtData = JSON.parse(decoedeJsonData);
    let role = decodedJwtData.roles;
    console.log(role);

    return role;
  };

  const getUserName = () => {
    let myToken = getToken();
    let tokenData = myToken.split(".")[1];
    let decoedeJsonData = window.atob(tokenData);
    let decodedJwtData = JSON.parse(decoedeJsonData);
    let userName = decodedJwtData.username;

    return userName;
  };
  const fetchData = () => {
    const options = makeOptions("GET", true); //True add's the token

    let role = getRole();

    return fetch(URL + "/api/books/" + role, options).then(handleHttpErrors);
  };

  const fetchStarwars = () => {
    const options = makeOptions("GET");

    return fetch(URL + "/api/info/parrallel/", options).then(handleHttpErrors);
  };

  const fetchAllBooks = () => {
    const options = makeOptions("GET");

    return fetch(URL + "/api/books/allbooks/", options).then(handleHttpErrors);
  };

  const fetchBookByTitle = (title) => {
    const options = makeOptions("GET");

    return fetch(URL + "/api/books/book/" + title, options).then(
      handleHttpErrors
    );
  };

  const loanABook = (isbn) => {
    const options = makeOptions("PUT", true, {
      isbn: isbn,
      userName: getUserName(),
    });

    return fetch(URL + "/api/books/loan/", options).then(handleHttpErrors);
  };

  const addABook = (book) => {
    const options = makeOptions("POST", true, {
      isbn: book.isbn,
      title: book.title,
      authors: book.authors,
      publisher: book.publisher,
      publishYear: book.publishYear,
      isAvalible: book.isAvalible,
    });
    return fetch(URL + "/api/books/add/", options).then(handleHttpErrors);
  };

  const removeBook = (isbn) => {
    const options = makeOptions("DELETE", true,);
    return fetch(URL + "/api/books/remove/" + isbn, options).then(handleHttpErrors);
  };

  

  const makeOptions = (method, addToken, body) => {
    var opts = {
      method: method,
      headers: {
        "Content-type": "application/json",
        Accept: "application/json",
      },
    };
    if (addToken && loggedIn()) {
      opts.headers["x-access-token"] = getToken();
    }
    if (body) {
      opts.body = JSON.stringify(body);
    }
    return opts;
  };
  return {
    makeOptions,
    setToken,
    getToken,
    loggedIn,
    login,
    logout,
    fetchData,
    fetchStarwars,
    getRole,
    fetchAllBooks,
    fetchBookByTitle,
    loanABook,
    addABook,
    removeBook
  };
}

const facade = apiFacade();
export default facade;
