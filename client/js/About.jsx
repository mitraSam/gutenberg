import React from "react";

import Header from "./Header";

const About = ({ history }) => (
  <div>
    <Header history={history} />

    <main className="about-page main-padding">
      <h2 className="subtitle id-font">about</h2>
      <p>
        A quiet place on the web where you can find and read some awesome books.
        The books are all in the public domain, mostly collected from
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="https://www.gutenberg.org/"
        >
          {" "}
          Project Gutenberg
        </a>
        . For any enquiries, suggestions or complaints please feel free to reach
        me by <a href="mailto:sammitra47@gmail.com">email</a>.
      </p>
    </main>
  </div>
);

export default About;
