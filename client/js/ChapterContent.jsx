/* eslint-disable react/no-unused-state,sort-comp,no-unused-vars,no-else-return,no-restricted-globals,consistent-return,class-methods-use-this,array-callback-return,prefer-destructuring,no-underscore-dangle,jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */

import React, { Component } from "react";
import parser from "react-html-parser";
import Swipeable from "react-swipeable";

import WithCurrentChapter from "../containers/CurrentChapterContainer";
import BookInfo from "./BookInfo";

class ChapterContent extends Component {
  state = {
    routePageNr: 0,
    routeChapterNr: 0,
    content: "",
    isEpigraph: false,
    openInfo: ""
  };

  componentWillMount() {
    this.setInitialState();
  }

  componentDidUpdate(props) {
    this.setContent();
  }

  setContent() {
    const { currentChapter } = this.props;
    if (currentChapter.title) {
      this.setEpigraph();
      this.updatePage();
    }
  }

  setPage(page) {
    this.setState({
      currentPage: page,
      content: parser(page.content)
    });
  }

  setEpigraph() {
    const { currentBook } = this.props;
    const { epigraph, routePageNr } = this.state;
    if (currentBook.epigraph) {
      if (routePageNr === 0 && !epigraph) {
        return this.setState({
          epigraph: parser(currentBook.epigraph),
          content: "",
          currentPage: ""
        });
      }
      if (routePageNr !== 0 && epigraph) {
        this.setState({ epigraph: "" });
      }
    }
  }

  setArrowNavigation = () => {
    window.onkeydown = evt => {
      if (evt.key === "ArrowRight") this.renderNext();
      if (evt.key === "ArrowLeft") this.renderPrev();
      if (evt.key === "Escape") this.closeInfo();
    };
  };

  setUpdateState(routeChapterNr, routePageNr) {
    const { match, history } = this.props;
    this.setState({ routeChapterNr, routePageNr });
    history.push(
      `/book/${match.params.title}/read/${routeChapterNr}/${routePageNr}`
    );
  }

  closeInfo = () => {
    const { openInfo } = this.state;
    if (openInfo) {
      this.setState({ openInfo: "" });
    }
  };

  handleChapterSelect = e => {
    const { currentBook, loadChapter } = this.props;
    const chapterIndex = e.target.options.selectedIndex;
    const selectedChapterPage = currentBook.chapters[chapterIndex].bookPages[0];
    const selectedChapterId = currentBook.chapters[chapterIndex]._id;
    loadChapter(selectedChapterId);
    this.setUpdateState(chapterIndex + 1, selectedChapterPage);
  };

  setOpenInfo = () => {
    const { openInfo } = this.state;
    if (openInfo) {
      return this.setState({ openInfo: "" });
    }
    this.setState({ openInfo: "open-info" });
  };

  setInitialState() {
    const { match, currentBook, loadChapter } = this.props;
    const routePageNr = Number(match.params.page);
    const routeChapterNr = Number(match.params.chapter);
    const chapterId = currentBook.chapters[routeChapterNr - 1]._id;
    this.setState({ routePageNr, routeChapterNr });
    loadChapter(chapterId);
    this.setArrowNavigation();
  }

  updatePage() {
    const { currentChapter } = this.props;
    const { routePageNr, currentPage, routeChapterNr } = this.state;

    const chapterStart = currentChapter.bookPages[0];
    const page = currentChapter.contents[routePageNr - chapterStart];

    if (routePageNr === 0) return;
    if (routeChapterNr !== currentChapter.number) return;
    if (!currentPage || routePageNr !== currentPage.number) {
      return this.setPage(page);
    }
  }

  renderNext() {
    const { currentChapter, currentBook, loadChapter } = this.props;
    const { routePageNr, routeChapterNr } = this.state;

    const newPageNr = routePageNr + 1;
    if (newPageNr > currentBook.pages) return;
    if (newPageNr === currentChapter.bookPages[1] + 1) {
      const newChapterNr = routeChapterNr + 1;
      loadChapter(currentBook.chapters[routeChapterNr]._id);
      this.setUpdateState(newChapterNr, newPageNr);
      return;
    }
    this.setUpdateState(routeChapterNr, newPageNr);
  }

  renderPrev() {
    const { currentChapter, currentBook, loadChapter } = this.props;
    const { routePageNr, routeChapterNr } = this.state;
    const newPageNr = routePageNr - 1;
    if (newPageNr < 0) return;
    if (newPageNr === currentChapter.bookPages[0] - 1 && routePageNr !== 1) {
      const newChapterNr = routeChapterNr - 1;

      loadChapter(currentBook.chapters[routeChapterNr - 2]._id);
      this.setUpdateState(newChapterNr, newPageNr);
      return;
    }
    this.setUpdateState(routeChapterNr, newPageNr);
  }

  render() {
    const { currentBook, currentChapter } = this.props;
    const { content, epigraph, openInfo, routePageNr } = this.state;
    const { title, author, pages, chapters } = currentBook;
    return (
      <Swipeable
        delta={25}
        onSwipedLeft={this.renderNext}
        onSwipedRight={this.renderPrev}
      >
        <div>
          <main
            role="presentation"
            className="book-content"
            onClick={this.closeInfo}
          >
            <article className={`book-content__page ${openInfo}`}>
              {}

              <BookInfo
                title={title}
                author={author}
                pages={pages}
                currentChapterTitle={currentChapter.title}
                chapters={chapters}
                handleChapterSelect={this.handleChapterSelect}
              />

              <button
                type="button"
                onClick={this.setOpenInfo}
                className={`subtitle id-font book-content__open-info ${openInfo}`}
              >
                i
              </button>

              <h2 className="subtitle id-font book-content__pageNr">
                {routePageNr}
              </h2>

              {epigraph}
              {content}
            </article>
          </main>
        </div>
      </Swipeable>
    );
  }
}

export default WithCurrentChapter(ChapterContent);
