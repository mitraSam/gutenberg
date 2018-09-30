import React from "react";

import Header from "./Header";
import Preview from "./Preview";
import ErrorContainer from "../containers/ErrorContainer";

const Landing = ({ books }) => (
  <div>
    <Header />
    <ErrorContainer />
    <main className="index">
      <h2 className="subtitle">latest titles</h2>
      {books.map(book => (
        <Preview book={book} />
      ))}
    </main>
  </div>
);
export default Landing;
