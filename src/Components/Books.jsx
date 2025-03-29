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
    console.log(titleresult);
    setBooksList(titleresult.docs);
  }

  const fetchBooksByAuthor = async () => {
    const authorUrl = BaseURL1 + author;
    const authorresponse = await fetch(authorUrl);
    const authorresult = await authorresponse.json();
    //console.log(authorresult);
    setBooksList(authorresult.docs);
  };

  // useEffect(() => {
  // fetchData()
  // }, [author,title]);

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
      // console.log(error);
    } finally {
      setLoading(false);
    }
  };
  const handleReset = () => {
    setLoading(false);
    setAuthor("");
    setTitle("");
    setMessage("");
  };

  const handleInputTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleInputAuthor = (event) => {
    setAuthor(event.target.value);
  };

  const renderList = (book, index) => {
    return (
      <h6 key={index}>
        TITLE:{book.title} AUTHOR:{book.author_name} PUBLISHED_YEAR:
        {book.first_publish_year}
      </h6>
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

        <div className="BookContainer">
          
          <div className="content1">
            <div className="Book1">
              <img src="https://m.media-amazon.com/images/I/81NQA1BDlnL._AC_UF1000,1000_QL80_.jpg" />
                      <ul>{booksList.slice(0, 1).map(renderList)}</ul>
            </div>
          </div>

          <div className="content1">
            <div className="Book1">
              <img src="https://m.media-amazon.com/images/I/81NQA1BDlnL._AC_UF1000,1000_QL80_.jpg" />
            <ul>{booksList.slice(0, 1).map(renderList)}</ul>
            </div>
          </div>

          <div className="content1">
            <div className="Book1">
              <img src="https://m.media-amazon.com/images/I/81NQA1BDlnL._AC_UF1000,1000_QL80_.jpg" />
            <ul>{booksList.slice(1, 2).map(renderList)}</ul>
            </div>
          </div>

          <div className="content1">
            <div className="Book1">
              <img src="https://m.media-amazon.com/images/I/81NQA1BDlnL._AC_UF1000,1000_QL80_.jpg" />
            <ul>{booksList.slice(2, 3).map(renderList)}</ul>
            </div>
          </div>

          <div className="content1">
            <div className="Book1">
              <img src="https://m.media-amazon.com/images/I/81NQA1BDlnL._AC_UF1000,1000_QL80_.jpg" />
            <ul>{booksList.slice(3, 4).map(renderList)}</ul>
            </div>
          </div>

          <div className="content1">
            <div className="Book1">
              <img src="https://m.media-amazon.com/images/I/81NQA1BDlnL._AC_UF1000,1000_QL80_.jpg" />
            <ul>{booksList.slice(4, 5).map(renderList)}</ul>
            </div>
          </div>
        </div>
      </div>
      {/* <ul>{booksList.map(renderList)}</ul> */}
    </div>
  );
};

export default Books;

{
  /* {booksList.slice(0, 1).map((book, index) => (
            <h6 key={index}><p>TITLE:{book.title} <br/><br/> AUTHOR:{book.author_name}<br/><br/>PUBLISHED_YEAR:{book.first_publish_year}</p></h6>
          ))}   */
}
