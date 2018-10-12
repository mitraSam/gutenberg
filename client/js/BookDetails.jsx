import React, { Component } from "react";
import Header from "./Header";
import WithBookDetails from "../containers/BookDetailsContainer";

class Details extends Component {
  componentWillMount() {
    const { match, loadBookDetails, bookDetails } = this.props;

    if (!bookDetails.title || bookDetails.title !== match.params.title) {
      loadBookDetails(match.params.title);
    }
  }

  navigateToRead = e => {
    const { history, match } = this.props;
    e.preventDefault();
    history.push(`/book/${match.params.title}/read`);
  };

  renderContents() {
    const { bookDetails } = this.props;
    const { chapters, title } = bookDetails;

    if (chapters)
      return (
        <ul className="book-details__chapters">
          {chapters.map((chapter, i) => (
            <li className="book-details__chapters--item">
              <a href={`/book/${title}/read/${i + 1}`}>{chapter}</a>
            </li>
          ))}
        </ul>
      );

    return "";
  }

  render() {
    const { bookDetails, match, history } = this.props;
    let wikiUrl;
    const {
      title,
      author,
      license,
      original,
      credits,
      description
    } = bookDetails;
    if (title) {
      wikiUrl = `https://en.wikipedia.org/wiki/${title.replace(/ /g, "_")}`;
    }

    return (
      <div>
        <Header history={history} />
        <main className="book-details main-padding">
          <h2 className="subtitle id-font">book details</h2>
          {title === match.params.title && (
            <article>
              <h1 className="book-details__title">{title}</h1>
              <h2 className="book-details__author">by {author}</h2>
              <h2 className="subtitle id-font book-details__read">
                <a onClick={this.navigateToRead} href={`/book/${title}/read`}>
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
              <div className="book-details__credits">
                <h2 className="subtitle id-font">credits</h2>
                <p>{credits.website}</p>
                {credits.producer && <p>{credits.producer}</p>}
                {credits.translator && (
                  <p>Translated by {credits.translator}</p>
                )}
              </div>
              <div className="book-details__license">
                <h2 className="subtitle id-font">license</h2>
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
              <div className="book-details__contents">
                <h2 className="subtitle id-font">contents</h2>
                {this.renderContents()}
              </div>
            </article>
          )}
        </main>
      </div>
    );
  }
}
export default WithBookDetails(Details);
