/* eslint-disable react/no-unused-state,consistent-return,class-methods-use-this */
import React, { Component } from "react";
import parser from "react-html-parser";

import WithCurrentBook from "../containers/CurrentBookContainer";

class BookContent extends Component {
  state = {
    currentChapter: {},
    currentContent: "",
    currentPage: 0
  };

  chapterCounter = 0;

  onChapterPage = 0;

  currentChapterPage = 0;

  onFirstChapterPage = 0;

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
      if (evt.key === "ArrowRight") this.renderNext();
      else if (evt.key === "ArrowLeft") this.renderPrevious();
    };
  };

  setChapter(chapter) {
    this.setState({ currentChapter: chapter });
  }

  setPage(page, number) {
    this.setState({
      currentContent: parser(page),
      currentPage: number
    });
  }

  setInitialStructure(currentBook) {
    const { contents, epigraph } = currentBook;
    this.setChapter(contents[0]);
    if (epigraph) {
      this.currentChapterPage = -1;
      return this.setPage(JSON.parse(epigraph), 0);
    }
    this.setPage(contents[0].pages[0], 1);
  }

  setNextPage() {
    const { currentChapter, currentPage } = this.state;

    this.currentChapterPage += 1;
    this.setPage(
      currentChapter.pages[this.currentChapterPage],
      currentPage + 1
    );
  }

  setPreviousPage() {
    const { currentChapter, currentPage } = this.state;

    this.currentChapterPage -= 1;
    this.setPage(
      currentChapter.pages[this.currentChapterPage],
      currentPage - 1
    );
  }

  setNextChapter() {
    const { currentBook } = this.props;
    this.chapterCounter += 1;
    this.currentChapterPage = -1;
    this.setState(
      {
        currentChapter: currentBook.contents[this.chapterCounter]
      },
      () => this.setNextPage()
    );
  }

  setPreviousChapter() {
    const { currentBook } = this.props;
    this.chapterCounter -= 1;
    this.currentChapterPage =
      currentBook.contents[this.chapterCounter].pages.length;

    if (this.chapterCounter === 0) {
      this.currentChapterPage = currentBook.contents[0].pages.length;
      return this.setState({
        currentChapter: currentBook.contents[0]
      });
    }
    this.setState({
      currentChapter: currentBook.contents[this.chapterCounter]
    });
  }

  renderNext() {
    const { currentChapter, currentPage } = this.state;
    if (currentPage === 251) {
      return;
    }
    if (this.currentChapterPage === currentChapter.pages.length - 1) {
      return this.setNextChapter();
    }
    this.setNextPage();
  }

  renderPrevious() {
    const { currentBook } = this.props;
    const { currentPage } = this.state;

    if (currentPage === 1) {
      if (currentBook.epigraph) {
        this.currentChapterPage = -1;
        return this.setPage(JSON.parse(currentBook.epigraph), 0);
      }
      return;
    }
    if (currentPage === 0) {
      return;
    }
    if (this.currentChapterPage === 0 && this.chapterCounter >= 1) {
      this.setPreviousChapter();
    }

    this.setPreviousPage();
  }

  render() {
    const { currentContent, currentPage } = this.state;
    return (
      <main className="book">
        <article className="book-content">
          <span className="change left">
            <button type="button" onClick={this.renderPrevious}>
              {"<"}
            </button>
          </span>
          <span className="change right">
            <button type="button" onClick={this.renderNext}>
              {">"}
            </button>
          </span>
          <h2 className="subtitle info">i</h2>
          <h2 className="subtitle pag">{currentPage}</h2>
          {currentContent}
        </article>
      </main>
    );
  }
}

export default WithCurrentBook(BookContent);
