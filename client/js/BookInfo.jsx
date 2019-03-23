/* eslint-disable react/no-unused-state,sort-comp,no-unused-vars,no-else-return,no-restricted-globals,consistent-return,class-methods-use-this,array-callback-return,prefer-destructuring,no-underscore-dangle,jsx-a11y/click-events-have-key-events,jsx-a11y/no-noninteractive-element-interactions */
import React from "react";

const BookInfo = props => {
  const {
    title,
    author,
    pages,
    chapters,
    currentChapterTitle,
    handleChapterSelect
  } = props;
  let chapterSelect;

  if (chapters) {
    chapterSelect = (
      <select onChange={handleChapterSelect} value={currentChapterTitle}>
        {chapters.map((chapter, i) => (
          <option data-index={i} value={chapter.title}>
            {chapter.title}
          </option>
        ))}
      </select>
    );
  } else {
    chapterSelect = "";
  }

  return (
    <article onClick={e => e.stopPropagation()} className="book-content__info">
      <h1>{title}</h1>
      <h2>
        by <a href={`/author/${author}`}>{author}</a>
      </h2>
      <h2 className="subtitle id-font">chapters</h2>
      {chapterSelect}
      <h2 className="subtitle id-font book-content__info--pages">pages</h2>
      {pages}
    </article>
  );
};

export default BookInfo;
