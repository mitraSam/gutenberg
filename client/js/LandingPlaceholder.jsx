/* eslint-disable react/no-unescaped-entities */
import React from "react";

const LandingPlaceholder = () => {
  const book = { title: "Loading", author: "loading" };
  return (
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
      <main className="index main-padding placeholder">
        <h2 className="subtitle main-font">latest titles</h2>
        {[book, book, book, book].map(b => (
          <div className="preview">
            <h1>{b.title}</h1>
            <h2>{b.author}</h2>
          </div>
        ))}
      </main>
    </div>
  );
};

export default LandingPlaceholder;
