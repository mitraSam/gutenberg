/* eslint-disable react/no-unused-state,consistent-return,class-methods-use-this */
import React, { Component } from "react";
import parser from "react-html-parser";

import WithCurrentBook from "../containers/CurrentBookContainer";

class BookContent extends Component {
  state = {
    currentChapter: {},
    currentContent: ""
  };

  currentPage = 0;

  componentWillMount() {
    const { match, loadBook, currentBook } = this.props;
    if (!currentBook.title || currentBook.title !== match.params.title) {
      loadBook(match.params.title);
    } else {
      this.setInitialStructure(currentBook);
    }
  }

  componentDidMount() {
    this.setArrowNavigation();
  }

  componentWillReceiveProps(props) {
    this.setInitialStructure(props.currentBook);
  }

  setArrowNavigation = () => {
    window.onkeypress = evt => {
      if (evt.key === "ArrowRight") this.renderForward();
      else if (evt.key === "ArrowLeft") this.renderBackward();
    };
  };

  setInitialPart(initialPart) {
    this.setState({
      currentChapter: initialPart.chapters[0],
      currentPart: initialPart
    });
  }

  setInitialChapter(initialChapter) {
    this.setState({ currentChapter: initialChapter });
  }

  setInitialEpigraph(epigraph) {
    this.setState({
      currentContent: parser(JSON.parse(epigraph))
    });
  }

  setInitialPage(initialPage) {
    this.setState({
      currentContent: parser(initialPage)
    });
  }

  setInitialStructure(currentBook) {
    // eslint-disable-next-line no-unused-vars
    const { parts, contents, epigraph } = currentBook;
    if (parts) {
      this.setInitialPart(contents[0]);
    } else {
      this.setInitialChapter(contents[0]);
    }
    if (epigraph) {
      this.setInitialEpigraph(epigraph);
    } else if (currentBook.parts) {
      this.currentPage = 1;
      this.setInitialPage(contents[0].chapters[0].pages[0]);
    } else {
      this.currentPage = 1;
      this.setInitialPage(contents[0].pages[0]);
    }
  }

  renderForward = () => {
    const { currentChapter } = this.state;

    if (this.currentPage === 0) {
      this.currentPage += 1;

      this.setInitialPage(currentChapter.pages[0]);
      return;
    }
    this.currentPage += 1;
    this.setInitialPage(currentChapter.pages[this.currentPage - 1]);
  };

  renderBackward = () => {
    const { currentChapter } = this.state;
    const { currentBook } = this.props;

    if (this.currentPage === 1 && currentBook.epigraph) {
      this.currentPage = 0;
      this.setInitialEpigraph(currentBook.epigraph);
      return;
    }
    if (this.currentPage <= 1) {
      return;
    }
    this.currentPage -= 1;

    this.setInitialPage(currentChapter.pages[this.currentPage - 1]);
  };

  render() {
    const { currentContent } = this.state;
    return (
      <main className="book">
        <article className="book-content">
          <span className="change left">
            <button type="button" onClick={this.renderBackward}>
              {"<"}
            </button>
          </span>
          <span className="change right">
            <button type="button" onClick={this.renderForward}>
              {">"}
            </button>
          </span>
          <h2 className="subtitle info">i</h2>
          <h2 className="subtitle pag">{this.currentPage}</h2>
          {currentContent}
        </article>
      </main>
    );
  }
}

export default WithCurrentBook(BookContent);
