import React, { Component } from "react";
import axios from "axios";

import Header from "./Header";
import ErrorContainer from "../containers/ErrorContainer";
import Preview from "./Preview";

class Search extends Component {
  state = {
    searchResults: [],
    searchKey: ""
  };

  componentDidMount() {
    const { match } = this.props;
    const { searchTerm } = match.params;
    this.getSearchResult(searchTerm);
  }

  getSearchResult = searchTerm => {
    this.setState({ searchKey: searchTerm });
    axios
      .get(`http://localhost:3000/search/${searchTerm}`)
      .then(res => this.setState({ searchResults: res.data }))
      .catch(e => console.log(e));
  };

  render() {
    const { searchResults, searchKey } = this.state;
    return (
      <div>
        <Header onSearchPage getSearchResult={this.getSearchResult} />
        <ErrorContainer />
        <main className="index">
          <h2 className="subtitle">search results for: </h2>
          <span>{searchKey}</span>
          {searchResults.map(book => (
            <Preview book={book} />
          ))}
        </main>
      </div>
    );
  }
}

export default Search;
