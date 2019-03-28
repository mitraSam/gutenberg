/* eslint-disable no-unused-vars */
import React, { Component } from "react";

import Header from "./Header";
import ErrorContainer from "../containers/ErrorContainer";
import PreviewContainer from "../containers/PreviewContainer";
import WithSearchFn from "../containers/SearchContainer";

class Search extends Component {
  state = {
    searchKey: ""
  };

  componentDidMount() {
    const { match } = this.props;
    const { searchTerm } = match.params;
    this.getSearchResult(searchTerm);
  }

  getSearchResult = searchTerm => {
    if (!searchTerm || /^\s*$/.test(searchTerm)) return;
    const { searchForTerm } = this.props;
    this.setState({ searchKey: searchTerm });
    searchForTerm(searchTerm);
  };

  render() {
    const { search, history } = this.props;
    const { searchKey } = this.state;
    let SearchResult;
    if (search.message) SearchResult = () => <h2>{search.message}</h2>;
    else
      SearchResult = () => (
        <div>
          {search.map(book => (
            <PreviewContainer history={history} book={book} />
          ))}
        </div>
      );
    return (
      <div>
        <Header onSearchPage getSearchResult={this.getSearchResult} />
        <main className="search-page main-padding">
          <h2 className="subtitle id-font">search results for: </h2>
          <span>{searchKey}</span>
          <ErrorContainer />
          <SearchResult />
        </main>
      </div>
    );
  }
}

export default WithSearchFn(Search);
