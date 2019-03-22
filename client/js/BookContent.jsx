/* eslint-disable react/no-unused-state,sort-comp,no-unused-vars,no-else-return,consistent-return,class-methods-use-this,array-callback-return,prefer-destructuring,no-underscore-dangle,jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from "react";
import Swipeable from "react-swipeable";
import parser from "react-html-parser";
import WithCurrentBook from "../containers/CurrentBookContainer";
import BookInfo from "./BookInfo";

class BookContent extends Component {
  state = {
    currentChapter: {},
    currentChapterNr: 0,
    currentContent: "loading...",
    routePageNr: 0,
    currentPage: "",
    currentChapterTitle: "",
    openInfo: "",
    epigraph: ""
  };

  componentDidMount() {
    const {
      loadBook,
      match,
      currentBook,
      currentChapter,
      loadChapter
    } = this.props;

    this.setInitialState();

    const currentChapterIndex = match.params.chapter - 1;

    if (currentBook.title && !currentChapter.title) {
      const chapterId = currentBook.chapters[currentChapterIndex]._id;
      loadChapter(chapterId);
    } else if (!currentBook.title) {
      loadBook(match.params.title, currentChapterIndex);
    } else {
      this.setContent();
    }
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

  setArrowNavigation = () => {
    window.onkeydown = evt => {
      if (evt.key === "ArrowRight") this.evtListener(true);
      if (evt.key === "ArrowLeft") this.evtListener();
      if (evt.key === "Escape") this.closeInfo();
    };
  };

  setPage(page) {
    this.setState({
      currentPage: page,
      currentContent: parser(page.content)
    });
  }

  setEpigraph() {
    const { currentBook } = this.props;
    const { epigraph, routePageNr } = this.state;
    if (currentBook.epigraph) {
      if (routePageNr === 0 && !epigraph) {
        return this.setState({
          epigraph: parser(currentBook.epigraph),
          currentContent: "",
          currentPage: ""
        });
      }
      if (routePageNr !== 0 && epigraph) {
        this.setState({ epigraph: "" });
      }
    }
  }

  setOpenInfo = () => {
    const { openInfo } = this.state;
    if (openInfo) {
      return this.setState({ openInfo: "" });
    }
    this.setState({ openInfo: "open-info" });
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

  setInitialState() {
    const { match } = this.props;
    const routePageNr = Number(match.params.page);
    const routeChapterNr = Number(match.params.chapter);
    this.setState({ routePageNr, routeChapterNr });
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

  evtListener(next) {
    const { currentChapter, currentBook, loadChapter } = this.props;
    const { routePageNr, routeChapterNr } = this.state;
    if (next) {
      return this.renderNext(
        routePageNr + 1,
        currentBook,
        currentChapter,
        routeChapterNr,
        loadChapter
      );
    }
    this.renderPrev(
      routePageNr - 1,
      currentBook,
      routeChapterNr,
      currentChapter,
      routeChapterNr,
      loadChapter
    );
  }

  renderNext(
    newPageNr,
    currentBook,
    currentChapter,
    routeChapterNr,
    loadChapter
  ) {
    if (newPageNr > currentBook.pages) return;
    if (newPageNr === currentChapter.bookPages[1] + 1) {
      const newChapterNr = routeChapterNr + 1;
      loadChapter(currentBook.chapters[routeChapterNr]._id);
      this.setUpdateState(newChapterNr, newPageNr);
      return;
    }
    this.setUpdateState(routeChapterNr, newPageNr);
  }

  renderPrev(
    newPageNr,
    currentBook,
    routePageNr,
    currentChapter,
    routeChapterNr,
    loadChapter
  ) {
    if (newPageNr < 0) return;
    if (newPageNr === currentChapter.bookPages[0] - 1 && routePageNr !== 1) {
      const newChapterNr = routeChapterNr - 1;

      loadChapter(currentBook.chapters[routeChapterNr - 2]._id);
      this.setUpdateState(newChapterNr, newPageNr);
      return;
    }
    this.setUpdateState(routeChapterNr, newPageNr);
  }

  /* componentDidUpdate(props) {
        const { currentBook } = this.props;
        if (currentBook.title !== props.currentBook.title) {
          User.addBookToUser(currentBook._id);
          this.setInitialStructure(currentBook);
        }
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
        console.log(currentBook);
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
    */

  render() {
    const { currentBook, match, currentChapter } = this.props;
    const { title, author, pages, chapters } = currentBook;
    const currentPage = match.params.page;
    const {
      currentContent,
      openInfo,
      currentChapterTitle,
      epigraph
    } = this.state;

    return (
      <Swipeable
        delta={25}
        onSwipedLeft={this.renderNext}
        onSwipedRight={this.renderPrevious}
      >
        <main
          role="presentation"
          className="book-content"
          onClick={this.closeInfo}
        >
          <article className={`book-content__page ${openInfo}`}>
            {
              <BookInfo
                title={title}
                author={author}
                pages={pages}
                currentChapterTitle={currentChapter.title}
                chapters={chapters}
                handleChapterSelect={this.handleChapterSelect}
              />
            }
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
            {epigraph}
            {currentContent}
          </article>
        </main>
      </Swipeable>
    );

    /* const { currentBook } = this.props;
          const { title, author, pages } = currentBook;
         const { currentPage, currentContent, openInfo } = this.state;
         const { currentChapterTitle } = this.state;
         const { chapters } = currentBook; */

    /* return (
          <Swipeable
              delta={25}
              onSwipedLeft={this.renderNext}
              onSwipedRight={this.renderPrevious}
          >
              <main
                  role="presentation"
                  className="book-content"
                  onClick={this.closeInfo}
              >
                  <article className={`book-content__page ${openInfo}`}>
                      {    <BookInfo
                          title={title}
                          author={author}
                          pages={pages}
                          currentChapterTitle={currentChapterTitle}
                          chapters={chapters}
                          handleChapterSelect={this.handleChapterSelect}
                      /> }
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
      ); */
  }
}

export default WithCurrentBook(BookContent);
