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

  signOut = () => {
    const { history } = this.props;
    localStorage.removeItem("token");
    history.push("/");
  };

  render() {
    const token = localStorage.getItem("token");
    const { onUserPage } = this.props;
    const user = jwt.decode(token);
    let link;
    if (onUserPage)
      link = (
        <a href="#signout" onClick={this.signOut}>
          sign out
        </a>
      );
    else if (user) link = <a href="/user">{user.username}</a>;
    else link = <a href="/signin">sign in</a>;
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
