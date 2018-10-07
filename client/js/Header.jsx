/* eslint-disable react/destructuring-assignment,consistent-return */
import React, { Component } from "react";
import jwt from "jsonwebtoken";

class Header extends Component {
  state = {
    openMobileNav: ""
  };

  toggleMobileNav = () =>
    this.state.openMobileNav === ""
      ? this.setState({ openMobileNav: "open-nav" })
      : this.setState({ openMobileNav: "" });

  handleSearchInput = e => {
    e.preventDefault();

    const { onSearchPage, getSearchResult } = this.props;
    const { history } = this.props;
    const searchTerm = e.target.elements[0].value;
    if (!onSearchPage) {
      return history.push(`/search/${searchTerm}`);
    }
    return getSearchResult(searchTerm);
  };

  render() {
    const token = localStorage.getItem("token");
    const user = jwt.decode(token);
    let link;
    if (user) link = <a href="tes">{user.username}</a>;
    else link = <a href="/login">login</a>;
    return (
      <header id={this.state.openMobileNav} className="main-header">
        <h2 className="logo">
          <a href="/">gutenberg`s den</a>
        </h2>
        <a
          href="#mobile-nav"
          onClick={this.toggleMobileNav}
          id="mobile-open-nav"
        >
          m
        </a>
        <nav id="main-nav" className="main-nav">
          <ul className="main-nav--container">
            <li className="main-nav--item">
              <form onSubmit={this.handleSearchInput}>
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
            <li className="main-nav--item">{link}</li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
