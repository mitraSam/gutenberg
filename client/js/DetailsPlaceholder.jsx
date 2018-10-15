/* eslint-disable react/no-unescaped-entities */
import React from "react";

const LandingPlaceholder = () => (
  <div>
    <header className="main-header">
      <h2 className="logo">
        <a href="/">gutenberg's den</a>
      </h2>
      <a href="#mobile-nav" id="mobile-open-nav">
        m
      </a>
      <nav id="main-nav" className="main-nav">
        <ul className="main-nav--container">
          <li className="main-nav--item">
            <form>
              <input
                type="text"
                className="main-nav--search-input"
                placeholder="search..."
              />
            </form>
          </li>

          <li className="main-nav--item">
            <a href="sdf">about</a>
          </li>
        </ul>
      </nav>
    </header>
    <main className="book-details main-padding placeholder">
      <h2 className="subtitle">book details</h2>
      <article>
        <h1 className="book-details__title">Loading</h1>
        <h2 className="book-details__author">loading</h2>
        <h2 className="subtitle book-details__read">
          <a href="#test">loading...</a>
        </h2>
        <p>
          From{" "}
          <a rel="noopener noreferrer" target="_blank" href="/#">
            wikipedia
          </a>
        </p>
        <p>loading...</p>
        <div className="book-details__credits">
          <h2 className="subtitle id-font">credits</h2>
          <p>loading...</p>
        </div>
        <div className="book-details__license">
          <h2 className="subtitle id-font">license</h2>
        </div>
        <div className="book-details__contents">
          <h2 className="subtitle id-font">contents</h2>
        </div>
      </article>
    </main>
  </div>
);
export default LandingPlaceholder;
