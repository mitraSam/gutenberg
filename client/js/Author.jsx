/* eslint-disable no-unused-vars */
import React, { Component } from "react";

import Header from "./Header";
import ErrorContainer from "../containers/ErrorContainer";
import PreviewContainer from "../containers/PreviewContainer";
import WithSearchFn from "../containers/SearchContainer";

class Search extends Component {
  state = {
    authorName: ""
  };

  componentDidMount() {
    const { match } = this.props;
    const { author } = match.params;
    this.getSearchResult(author);
  }

  getSearchResult = author => {
    const { searchForTerm } = this.props;
    this.setState({ authorName: author });
    searchForTerm(author);
  };

  render() {
    const { search, history } = this.props;
    const { authorName } = this.state;

    return (
      <div>
        <Header history={history} />
        <main className="search-page main-padding">
          <h2 className="subtitle id-font">books by {authorName}</h2>
          <ErrorContainer />

          <div>
            {search.map(book => (
              <PreviewContainer history={history} book={book} />
            ))}
          </div>
        </main>
      </div>
    );
  }
}

export default WithSearchFn(Search);
