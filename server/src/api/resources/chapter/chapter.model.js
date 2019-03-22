import mongoose from 'mongoose'

const chapterSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Chapter must have a title']

    },

    contents:[
        {type:mongoose.Schema.Types.ObjectId,
        ref:"page"
        }
    ],
    number:Number,
    book:[
        {type:mongoose.Schema.Types.ObjectId,
            ref:"books",
            required:[true,"chapter needs to be part of a book"]
        }],
   pages: {
       type: Number,
       required: [true, 'Chapter needs a pages number']
   },
   bookPages: {
        type: [],
       required: [true,'Chapter needs starting and ending pages']
   }

});



export const Chapter = mongoose.model('chapter', chapterSchema,'chapter')

