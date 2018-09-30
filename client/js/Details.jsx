import React, { Component } from "react";
import Header from "./Header";
import WithCurrentBook from "../containers/CurrentBookContainer";

class Details extends Component {
  componentWillMount() {
    const { match, loadBook, currentBook } = this.props;
    if (!currentBook.title || currentBook.title !== match.params.title)
      loadBook(match.params.title);
  }

  trans = e => {
    const { history, match } = this.props;
    e.preventDefault();
    history.push(`/book/${match.params.title}/read`);
  };

  renderContents() {
    const { currentBook } = this.props;
    const { parts, chapters } = currentBook;
    if (parts) {
      return (
        <ul className="book-details--parts">
          {parts.map(part => (
            <li className="book-details--parts__item">
              <h2>{part.partName}</h2>

              <ul className="book-details--chapters">
                {part.chapters.map(chapter => (
                  <li className="book-details--chapters__item">
                    <a href="test">{chapter}</a>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      );
    }
    if (chapters) {
      return (
        <ul className="book-details--chapters">
          {chapters.map(chapter => (
            <li className="book-details--chapters__item">
              <a href="test">{chapter}</a>
            </li>
          ))}
        </ul>
      );
    }
    return "";
  }

  render() {
    const { currentBook, match } = this.props;
    let wikiUrl;
    const {
      title,
      author,
      license,
      original,
      credits,
      description
    } = currentBook;
    if (title) {
      wikiUrl = `https://en.wikipedia.org/wiki/${title.replace(/ /g, "_")}`;
    }

    return (
      <div>
        <Header />
        <main className="book-details">
          <h2 className="subtitle">book details</h2>
          {title === match.params.title && (
            <article>
              <h1 className="book-title">{title}</h1>
              <h2 className="book-author">by {author}</h2>
              <h2 className="subtitle read">
                <a onClick={this.trans} href={`/book/${title}/read`}>
                  read book
                </a>
              </h2>
              <p>
                From{" "}
                <a rel="noopener noreferrer" target="_blank" href={wikiUrl}>
                  wikipedia
                </a>
              </p>
              <p>{description}</p>
              <div className="credits">
                <h2 className="subtitle">credits</h2>
                <p>{credits.website}</p>
                {credits.producer && <p>{credits.producer}</p>}
                {credits.translator && (
                  <p>Translated by {credits.translator}</p>
                )}
              </div>
              <div className="license">
                <h2 className="subtitle">license</h2>
                <p>{license}</p>
                <p>
                  You can also read the original{" "}
                  <a
                    rel="noopener noreferrer"
                    target="_blank"
                    href={`${original.replace(/['"]+/g, "")}`}
                  >
                    here
                  </a>
                </p>
              </div>
              <div className="contents">
                <h2 className="subtitle">contents</h2>
                {this.renderContents()}
              </div>
            </article>
          )}
        </main>
      </div>
    );
  }
}
export default WithCurrentBook(Details);
