/* eslint-disable jsx-a11y/label-has-for,jsx-a11y/label-has-associated-control,no-plusplus,no-return-assign,no-prototype-builtins,no-unused-expressions,class-methods-use-this,no-underscore-dangle,prefer-const,react/sort-comp,consistent-return,no-restricted-syntax,no-await-in-loop */
import React, { Component } from "react";
import axios from "axios";

class BookForm extends Component {
  state = { credits: 1, chapters: [], pageNr: 0, tag: "" };

  addInput = () => {
    const { credits } = this.state;
    this.setState({ credits: credits + 1 });
  };

  postData(url, data) {
    const api = process.env.API_URL;

    return axios({
      method: "post",
      url: `${api}/${url}`,
      data,
      config: {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        }
      }
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    const data = this.propsFromForm(e.target.elements);
    this.setState({ tag: data.chapterTag });
    return this.getFileContent()
      .then(() => {
        const { pageNr, chapters } = this.state;
        data.pages = pageNr;
        return this.postData("books", data);
      })
      .then(res => {
        console.log(res, "here", res.data._id);
        this.createChapters(res.data._id);
      })
      .catch(error => console.log(JSON.stringify(error)));
  };

  propsFromForm(inputs) {
    const book = { credits: [] };
    Array.prototype.forEach.call(inputs, input => {
      if (input.value) {
        if (book.hasOwnProperty(input.name)) {
          book[input.name].push(input.value);
        } else book[input.name] = input.value;
      }
    });
    return book;
  }

  htmlToElements = html => {
    const template = document.createElement("template");
    template.innerHTML = html;
    return template.content.childNodes;
  };

  getFileContent() {
    const file = document.getElementById("bookHTML").files[0];
    const isJson = file.type === "application/json";
    if (file) {
      return new Promise((res, rej) => {
        const reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        reader.onload = evt => {
          const bookData = evt.target.result;
          if (isJson) {
            const data = JSON.parse(bookData);
            console.log(data);
            this.setState({ pageNr: data.pages, chapters: data.contents });
            return res(data);
          }
          const x = this.htmlToElements(bookData);
          res(this.parseBook(x));
        };
        reader.onerror = function() {
          console.log("error reading file");
          rej(new Error("error reading file"));
        };
      });
    }
  }

  async postChpaters(chapters) {
    const ids = [];
    for (let ch of chapters) {
      const res = await this.postData("chapter", ch);
      console.log(res, ids);
    }
  }

  async parseBook(html) {
    let chapters = [];
    let pageNr = 0;
    const { tag } = this.state;

    html.forEach(i => {
      if (i.nodeName === tag) {
        const chapterText = i.innerText;
        const chapterTag = document.createElement(tag.toLowerCase());
        chapterTag.innerText = chapterText;
        chapters.push({
          chapter: chapterText,
          pages: [chapterTag.outerHTML, ""]
        });
        pageNr += 2;
      } else {
        let latest = chapters[chapters.length - 1];
        let { pages } = latest;

        let currentPage = pages[pages.length - 1];
        let newParagrap = i.innerText;
        if (i.nodeName === "#text") {
          currentPage.concat(i.textContent);
          return;
        }
        let currentPageCount = currentPage.split(" ").length;
        let newParagraphCount = newParagrap.split(" ").length;
        let pwithTags = i.outerHTML;
        let total = currentPageCount + newParagraphCount;
        if (total < 400) {
          pages.pop();
          pages.push(currentPage.concat(pwithTags));
        } else {
          pageNr++;
          pages.push(pwithTags);
        }
      }
    });
    return this.setState({ pageNr, chapters });
  }

  async createChapters(id) {
    let finals = [];
    const { chapters } = this.state;

    chapters.forEach((ch, i) => {
      console.log("!!!!!!!!!!!!!!!!!!!!!!", i);
      const previousPage = finals[i - 1] ? finals[i - 1].bookPages[1] : 0;
      const bookPages = [previousPage + 1, ch.pages.length + previousPage];
      const book = id;
      const number = i + 1;
      const title = ch.chapter.trim();
      const contents = ch.pages.map((page, pNr) => ({
        content: page,
        number: bookPages[0] + pNr
      }));
      const pages = ch.pages.length;
      finals.push({ bookPages, book, title, contents, pages, number });
    });
    this.postChpaters(finals)
      .then(r => console.log(r))
      .catch(e => console.log(JSON.stringify(e)));
  }

  render() {
    const { credits } = this.state;
    const creditInput = [];
    for (let i = 0; i < credits; i++) {
      const input = <input type="text" name="credits" />;
      creditInput.push(input);
    }

    return (
      <div>
        <form className="book-form" onSubmit={this.handleSubmit}>
          <label htmlFor="url">
            Book url
            <input name="url" type="text" />
          </label>
          <label htmlFor="title">
            Book Title
            <input name="title" type="text" />
          </label>
          <label htmlFor="author">
            Book Author
            <input name="author" type="text" />
          </label>
          <label htmlFor="chapterTag">
            Select chapter tag
            <select name="chapterTag" id="chapterTag">
              <option value="H1">H1</option>
              <option value="H2">H2</option>
              <option value="H3">H3</option>
              <option value="H4">H4</option>
            </select>
          </label>

          <label htmlFor="epigraph">
            Book Epigraph
            <textarea name="epigraph" />
          </label>
          <label htmlFor="license">
            Book License
            <textarea name="license" />
          </label>
          <label htmlFor="original">
            Book Source
            <input name="original" type="text" />
          </label>
          <label htmlFor="credits">
            Book Credits
            {creditInput}
            <button onClick={this.addInput} type="button">
              add credit
            </button>
          </label>
          <input type="hidden" name="pages" value="0" />

          <button type="submit">create book</button>
        </form>
        <label htmlFor="bookHTML">
          Book HTML
          <input
            type="file"
            id="bookHTML"
            accept=".html,.txt,application/json"
          />
        </label>
      </div>
    );
  }
}
export default BookForm;
