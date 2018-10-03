/* eslint-disable react/destructuring-assignment */
import React, { Component } from "react";

class Header extends Component {
  state = {
    openMobileNav: ""
  };

  toggleMobileNav = () =>
    this.state.openMobileNav === ""
      ? this.setState({ openMobileNav: "open-nav" })
      : this.setState({ openMobileNav: "" });

  render() {
    return (
      <header id={this.state.openMobileNav} className="main-header">
        <h2 className="logo">gutenberg`s den</h2>
        <a href="#abc" onClick={this.toggleMobileNav} id="mobile-open-nav">
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
            <li className="main-nav--item">
              <a href="asdf">login</a>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}

export default Header;
