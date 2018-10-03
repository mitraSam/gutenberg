import mongoose from 'mongoose'

const booksSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Book must have a title'],
    unique: true,

  },
  author: {
    type: String,
    required: [true, 'Book must have an author']
  },
    credits:{},
    license:String,
    original:String,

  pages:{
      type: Number,
      required: [true, 'Book must have a pages number']
  },
  chapters: [],
  parts: {},
  footnotes: [],
  appendix: String,
  contents:[],
});




export const Books = mongoose.model('books', booksSchema,'books')

