/* eslint-disable no-underscore-dangle */
import React from "react";
import { Link } from "react-router-dom";

const Preview = ({ book }) => (
  <div className="preview">
    <Link to={`/book/${book.title}`}>
      <h1>{book.title}</h1>
      <h2>{book.author}</h2>
    </Link>
  </div>
);

export default Preview;
