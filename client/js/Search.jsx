import React, { Component } from "react";

import Header from "./Header";
import ErrorContainer from "../containers/ErrorContainer";
import Preview from "./Preview";

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
    const { searchForTerm } = this.props;
    this.setState({ searchKey: searchTerm });
    searchForTerm(searchTerm);
  };

  render() {
    const { search } = this.props;
    const { searchKey } = this.state;
    return (
      <div>
        <Header onSearchPage getSearchResult={this.getSearchResult} />
        <main className="index">
          <h2 className="subtitle">search results for: </h2>
          <span>{searchKey}</span>
          <ErrorContainer />
          {search.map(book => (
            <Preview book={book} />
          ))}
        </main>
      </div>
    );
  }
}

export default Search;
