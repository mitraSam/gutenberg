/* eslint-disable react/no-unused-state,consistent-return,class-methods-use-this,array-callback-return,prefer-destructuring,no-underscore-dangle,jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from "react";
import parser from "react-html-parser";
import axios from "axios";
import Swipeable from "react-swipeable";

import WithCurrentBook from "../containers/CurrentBookContainer";
import BookInfo from "./BookInfo";

class BookContent extends Component {
  state = {
    currentChapter: {},
    currentContent: "",
    currentPage: 0,
    currentChapterTitle: "",
    openInfo: ""
  };

  chapterCounter = 0;

  currentChapterPage = 0;

  componentWillMount() {
    const { match, loadBook, currentBook } = this.props;
    if (!currentBook.title || currentBook.title !== match.params.title) {
      loadBook(match.params.title);
    } else {
      this.setInitialStructure(currentBook);
      this.addBookToUser(currentBook);
    }
  }

  componentDidMount() {
    this.setArrowNavigation();
  }

  componentWillReceiveProps(props) {
    this.addBookToUser(props.currentBook);
    this.setInitialStructure(props.currentBook);
  }

  setArrowNavigation = () => {
    window.onkeydown = evt => {
      if (evt.key === "ArrowRight") this.renderNext();
      if (evt.key === "ArrowLeft") this.renderPrevious();
      if (evt.key === "Escape") this.closeInfo();
    };
  };

  setChapter(chapter, title) {
    return new Promise(res => {
      if (title)
        this.setState(
          {
            currentChapter: chapter,
            currentChapterTitle: title
          },
          () => res(true)
        );
      else this.setState({ currentChapter: chapter }, () => res(true));
    });
  }

  setPage(page, number) {
    this.setState({
      currentContent: parser(page),
      currentPage: number
    });
  }

  setInitialStructure(currentBook) {
    const { match } = this.props;
    const { chapter } = match.params;
    const { contents, epigraph } = currentBook;

    const chapterNumber = Number(chapter) - 1;
    if (
      chapterNumber &&
      chapterNumber <= contents.length &&
      chapterNumber > 0
    ) {
      return this.selectChapter(currentBook, chapterNumber);
    }
    this.setChapter(contents[0]);
    if (epigraph) {
      this.currentChapterPage = -1;
      return this.setPage(JSON.parse(epigraph), 0);
    }
    this.setPage(contents[0].pages[0], 1);
  }

  closeInfo = () => {
    const { openInfo } = this.state;
    if (openInfo) {
      this.setState({ openInfo: "" });
    }
  };

  setOpenInfo = () => {
    const { openInfo } = this.state;
    if (openInfo) {
      return this.setState({ openInfo: "" });
    }
    this.setState({ openInfo: "open-info" });
  };

  setNextPage = () => {
    const { currentChapter, currentPage } = this.state;

    this.currentChapterPage += 1;
    this.setPage(
      currentChapter.pages[this.currentChapterPage],
      currentPage + 1
    );
  };

  setPreviousPage = () => {
    const { currentChapter, currentPage } = this.state;

    this.currentChapterPage -= 1;
    this.setPage(
      currentChapter.pages[this.currentChapterPage],
      currentPage - 1
    );
  };

  setNextChapter = () => {
    const { currentBook } = this.props;
    this.chapterCounter += 1;
    this.currentChapterPage = -1;
    const selectedChapter = currentBook.contents[this.chapterCounter];
    this.setChapter(selectedChapter, selectedChapter.chapter).then(
      this.setNextPage
    );
  };

  setPreviousChapter = () => {
    const { currentBook } = this.props;
    this.chapterCounter -= 1;
    const selectedChapter = currentBook.contents[this.chapterCounter];
    this.currentChapterPage = selectedChapter.pages.length;

    this.setChapter(selectedChapter, selectedChapter.chapter).then(
      this.setPreviousPage
    );
  };

  handleChapterSelect = e => {
    const { currentBook } = this.props;
    this.selectChapter(currentBook, e.target.options.selectedIndex);
  };

  addBookToUser(currentBook) {
    const token = localStorage.getItem("token");
    const id = currentBook._id;
    const api = process.env.API_URL;
    if (token) {
      axios
        .put(
          `${api}/user/id`,
          { id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "text/plain",
              id
            }
          }
        )
        .catch(e => console.log(e));
    }
  }

  selectChapter(currentBook, selectedIndex) {
    const selectedChapter = currentBook.contents[selectedIndex];
    const selectedChapterTitle = currentBook.chapters[selectedIndex];
    let selectedChapterPage = 0;

    if (selectedIndex === this.chapterCounter) return;

    this.currentChapterPage = 0;
    this.chapterCounter = selectedIndex;
    currentBook.contents.map((chapter, i) => {
      if (selectedIndex > i) selectedChapterPage += chapter.pages.length;
    });
    this.setPage(selectedChapter.pages[0], selectedChapterPage + 1);
    this.setChapter(selectedChapter);
    this.setState({ currentChapterTitle: selectedChapterTitle });
  }

  renderNext = () => {
    const { currentBook } = this.props;
    const { currentChapter, currentPage } = this.state;
    if (currentPage === currentBook.pages) {
      return;
    }
    if (this.currentChapterPage === currentChapter.pages.length - 1) {
      return this.setNextChapter();
    }
    this.setNextPage();
  };

  renderPrevious = () => {
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
      return this.setPreviousChapter();
    }

    this.setPreviousPage();
  };

  render() {
    const { currentBook } = this.props;
    const { title, author, pages } = currentBook;
    const { currentPage, currentContent, openInfo } = this.state;
    const { currentChapterTitle } = this.state;
    const { chapters } = currentBook;

    return (
      <Swipeable
        onSwipingLeft={this.renderNext}
        onSwipingRight={this.renderPrevious}
      >
        <main
          role="presentation"
          className="book-content"
          onClick={this.closeInfo}
        >
          <article className={`book-content__page ${openInfo}`}>
            <BookInfo
              title={title}
              author={author}
              pages={pages}
              currentChapterTitle={currentChapterTitle}
              chapters={chapters}
              handleChapterSelect={this.handleChapterSelect}
            />
            <span className="book-content__change left">
              <button type="button" onClick={this.renderPrevious}>
                {"<"}
              </button>
            </span>
            <span className="book-content__change right">
              <button type="button" onClick={this.renderNext}>
                {">"}
              </button>
            </span>
            <button
              type="button"
              onClick={this.setOpenInfo}
              className={`subtitle id-font book-content__open-info ${openInfo}`}
            >
              i
            </button>

            <h2 className="subtitle id-font book-content__pageNr">
              {currentPage}
            </h2>

            {currentContent}
          </article>
        </main>
      </Swipeable>
    );
  }
}

export default WithCurrentBook(BookContent);
