import React from "react";

import Header from "./Header";
import PreviewContainer from "../containers/PreviewContainer";
import ErrorContainer from "../containers/ErrorContainer";

const Landing = ({ books, history }) => (
  <div>
    <Header history={history} />
    <ErrorContainer />
    <main className="index main-padding">
      <h2 className="subtitle id-font">latest titles</h2>
      {books.length &&
        books.map(book => <PreviewContainer history={history} book={book} />)}
    </main>
  </div>
);
export default Landing;
