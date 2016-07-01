var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//var BookSchema = new Schema({
//    title: {
//        type: String,
//        required: true,
//        unique: true
//    },
//    
////    published: {
////        type: Date,
////        default: Date.now
////    },
//    published: Boolean,
//    
//    keywords: Array,
//    
//    author: {
//        type: Schema.ObjectId,
//        ref: 'User'
//    },
//    
//    // Embedded sub-document
//    detail: {
//        mobileNumber: Number,
//        hardcover: Boolean,
//        reviews: Number,
//        rank: Number
//    }
//});

// Creating a book collection into mongoDB
var BookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    category: {
        type: String,
    }
});

// Storing book collection object into Book
var Book = module.exports = mongoose.model('Book', BookSchema);


//************************************* CRUD OPERATIONS *******************************************
// Get all books
module.exports.getAllBooks = function ( callback ) {
    Book.find( callback );
}

// Get a book by id
module.exports.getBookById = function ( id, callback ) {
    Book.findById( id, callback );
}

// Add new book
module.exports.addNewBook = function ( newBook, callback ) {
    Book.create( newBook, callback );
}

// Update book
module.exports.updateBook = function ( id, book, options, callback ) {
    var query = { 
        _id: id 
    };
    Book.findOneAndUpdate( query, book, options, callback );
}

// Delete book
module.exports.deleteBook = function ( id, callback ) {
    var query = {
        _id: id
    }    
    Book.findOneAndRemove( query, callback );
}