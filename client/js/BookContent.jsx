/* eslint-disable react/no-unused-state,consistent-return,class-methods-use-this,array-callback-return */
import React, { Component } from "react";
import parser from "react-html-parser";

import WithCurrentBook from "../containers/CurrentBookContainer";

class BookContent extends Component {
  state = {
    currentChapter: {},
    currentContent: "",
    currentPage: 0,
    currentChapterTitle: "",
    openMeta: ""
  };

  chapterCounter = 0;

  currentChapterPage = 0;

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

  setOpenMeta = () => {
    const { openMeta } = this.state;
    if (openMeta) {
      return this.setState({ openMeta: "" });
    }
    this.setState({ openMeta: "open" });
  };

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

    this.setState({
      currentChapterTitle: currentBook.contents[this.chapterCounter].chapter
    });

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
    this.setState({
      currentChapterTitle: currentBook.contents[this.chapterCounter].chapter
    });

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

  handleChapterSelect = e => {
    const { currentBook } = this.props;
    this.selectChapter(currentBook, e.target.options.selectedIndex);
  };

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

  renderNext() {
    const { currentBook } = this.props;
    const { currentChapter, currentPage } = this.state;
    if (currentPage === currentBook.pages) {
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
    const { currentBook } = this.props;
    const { title, author, pages } = currentBook;
    const { currentPage, currentContent, openMeta } = this.state;
    let chapterSelect;
    const { currentChapterTitle } = this.state;
    const { chapters } = currentBook;
    if (chapters) {
      chapterSelect = (
        <select onChange={this.handleChapterSelect} value={currentChapterTitle}>
          {chapters.map((chapter, i) => (
            <option label={i} value={chapter}>
              {chapter}
            </option>
          ))}
        </select>
      );
    } else {
      chapterSelect = "";
    }

    return (
      <main className="book">
        <article className="book-content">
          <article className={`book-meta ${openMeta}`}>
            <h1>{title}</h1>
            <h2>
              by <a href={`/author/${author}`}>{author}</a>
            </h2>
            <h2 className="subtitle">chapters</h2>
            {chapterSelect}
            <h2 className="subtitle totalPages">pages</h2>
            {pages}
          </article>
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
          <button
            type="button"
            onClick={this.setOpenMeta}
            className={`subtitle info ${openMeta}`}
          >
            i
          </button>

          <h2 className="subtitle pag">{currentPage}</h2>

          {currentContent}
        </article>
      </main>
    );
  }
}

export default WithCurrentBook(BookContent);
