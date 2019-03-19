import mongoose from 'mongoose'

const pageSchema = new mongoose.Schema({
    number: {
        required: [true,'Page needs a number'],
        type: Number
    },
    content:{
      required: [true,"Page needs content"],
      type:String
    },
    chapterId: String


});




export const Page = mongoose.model('page', pageSchema,'page')
