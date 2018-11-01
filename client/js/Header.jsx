/* eslint-disable react/destructuring-assignment,consistent-return,react/no-unescaped-entities */
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

  signOut = e => {
    this.navigate(e);
    localStorage.removeItem("token");
  };

  navigate = e => {
    e.preventDefault();
    const link = e.target.getAttribute("href");
    const { history } = this.props;
    history.push(link);
  };

  render() {
    const token = localStorage.getItem("token");
    const { onUserPage } = this.props;
    const user = jwt.decode(token);
    let link;
    if (onUserPage)
      link = (
        <a href="/" onClick={this.signOut}>
          sign out
        </a>
      );
    else if (user)
      link = (
        <a onClick={this.navigate} href="/user">
          {user.username}
        </a>
      );
    else
      link = (
        <a onClick={this.navigate} href="/signin">
          sign in
        </a>
      );
    return (
      <header id={this.state.openMobileNav} className="main-header">
        <h2 className="logo id-font">
          <a href="/">gutenberg's den</a>
        </h2>
        <a
          href="#mobile-nav"
          onClick={this.toggleMobileNav}
          id="mobile-open-nav"
          className="id-font"
        >
          m
        </a>
        <nav id="main-nav" className="id-font main-nav">
          <ul className="main-nav--container">
            <li className="main-nav--item">
              <form onSubmit={this.handleSearchInput}>
                <input
                  type="text"
                  className="main-nav--search-input id-font"
                  placeholder="search..."
                />
              </form>
            </li>

            <li className="main-nav--item">
              <a onClick={this.navigate} href="/about">
                about
              </a>
            </li>
            <li className="main-nav--item">{link}</li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
