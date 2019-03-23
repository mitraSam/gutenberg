/* eslint-disable react/no-unused-state,sort-comp,no-unused-vars,no-else-return,no-restricted-globals,consistent-return,class-methods-use-this,array-callback-return,prefer-destructuring,no-underscore-dangle,jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from "react";

import WithCurrentBook from "../containers/CurrentBookContainer";
import User from "./User";
import ChapterContent from "./ChapterContent";

class BookContent extends Component {
  componentDidMount() {
    const { loadBook, match, currentBook } = this.props;

    if (!currentBook.title) {
      loadBook(match.params.title);
    } else {
      User.addBookToUser(currentBook._id);
    }
  }

  componentDidUpdate(props) {
    const { currentBook } = this.props;
    if (currentBook.title !== props.currentBook.title) {
      User.addBookToUser(currentBook._id);
    }
  }

  render() {
    const { currentBook, match, history } = this.props;
    if (currentBook.title) {
      return (
        <ChapterContent
          history={history}
          match={match}
          currentBook={currentBook}
        />
      );
    }
    return <div />;
  }
}

export default WithCurrentBook(BookContent);
