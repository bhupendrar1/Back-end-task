const mongoose = require("mongoose");

const comicBookSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: true,
    },
    authorName: {
        type: String,
        required: true,
        index: true,
    },
    yearOfPublication: {
        type: Number,
        required: true,
        min: 1800,
        max: new Date().getFullYear(),
    },
    price: {
        type: Number,
        required: true,
        min:0,
    },
    discount: {
        type: Number,
       default:0, 
       min:0,
       max:100
    },
    numberOfPages: {
        type: Number,
        required: true,
        min: 1
    },
    condition: {
        type: String,
        enum: ['new', 'used', 'damaged']
    },
    description: {
        type: String,
        required: true
    }
}, {timestamps: true});

const ComicBook = mongoose.model('ComicBook', comicBookSchema);
module.exports = ComicBook;