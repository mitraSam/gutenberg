import React from "react";

import Header from "./Header";
import PreviewContainer from "../containers/PreviewContainer";
import ErrorContainer from "../containers/ErrorContainer";

const Landing = ({ books, history }) => {
  const dummyData = { author: "loading", title: "Loading" };
  const dummyArray = [dummyData, dummyData, dummyData, dummyData];
  const data = books.length ? books : dummyArray;
  const css = books.length ? "" : "placeholder";
  return (
    <div>
      <Header history={history} />
      <ErrorContainer />
      <main className={`index main-padding ${css}`}>
        <h2 className="subtitle id-font">latest titles</h2>
        {data.map(book => (
          <PreviewContainer history={history} book={book} />
        ))}
      </main>
    </div>
  );
};
export default Landing;
