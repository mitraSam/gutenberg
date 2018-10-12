/* eslint-disable no-underscore-dangle */
import React from "react";
import { Link } from "react-router-dom";

const Preview = ({ book, setBookDetails, history }) => (
  <div className="preview">
    <Link
      onClick={e => {
        e.preventDefault();
        setBookDetails(book);
        history.push(`/book/${book.title}`);
      }}
      to={`/book/${book.title}`}
    >
      <h1>{book.title}</h1>
      <h2>{book.author}</h2>
    </Link>
  </div>
);

export default Preview;
