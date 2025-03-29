import React, { useCallback, useEffect, useState } from "react";
import "./Books.css";

const BaseURL = "https://openlibrary.org/search.json?title=";
const BaseURL1 = "https://openlibrary.org/search.json?author=";

const Books = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [booksList, setBooksList] = useState([]);

  async function fetchBooksByTitle() {
    const modifiedTitle = title.replaceAll(" ", "+");
    const newUrl = BaseURL + modifiedTitle;
    const titleresponse = await fetch(newUrl);
    const titleresult = await titleresponse.json();
    setBooksList(titleresult.docs);
  }

  const fetchBooksByAuthor = async () => {
    const authorUrl = BaseURL1 + author;
    const authorresponse = await fetch(authorUrl);
    const authorresult = await authorresponse.json();
    setBooksList(authorresult.docs);
  };

  const fetchData = async () => {
    try {
      if (title === "" && author === "") {
        setMessage("Please enter the title or author");
      } else {
        setLoading(true);
        if (author != "") {
          await fetchBooksByAuthor();
        }
        if (title != "") {
          await fetchBooksByTitle();
        }
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleReset = () => {
    setLoading(false);
    setAuthor("");
    setTitle("");
    setMessage("");
    setBooksList([]);
  };

  const handleInputTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleInputAuthor = (event) => {
    setAuthor(event.target.value);
  };

  const renderList = (book, index) => {
    return (
      <div className="BookContainer" key={index}>
        <div className="ImageContainer">
          <img
            className="Image"
            src="https://m.media-amazon.com/images/I/81NQA1BDlnL._AC_UF1000,1000_QL80_.jpg"
          />
        </div>
        <div className="DetailsContainer">
          <h6>TITLE:{book.title}</h6>
          <h6>AUTHOR:{book.author_name} </h6>
          <h6>
            PUBLISHED_YEAR:
            {book.first_publish_year}
          </h6>
        </div>
      </div>
    );
  };

  return (
    <div className="Library">
      <h1 className="Library-title">LIBRARY</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Book-Title"
          value={title}
          onChange={handleInputTitle}
        />
        <div></div>
        <input
          type="text"
          placeholder="Author-Name"
          value={author}
          onChange={handleInputAuthor}
        />
        <button
          className="submit-button"
          onClick={fetchData}
          disabled={loading}
        >
          {loading ? "Loading" : "Submit"}
        </button>
        <button className="Reset" onClick={handleReset}>
          Reset
        </button>
        <h5>{message}</h5>
      </div>
      <ul>{booksList.map(renderList)}</ul>
    </div>
  );
};

export default Books;
