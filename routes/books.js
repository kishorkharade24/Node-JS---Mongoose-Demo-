var express = require('express');
var router = express.Router();

// Import Book collection
var Book = require('../model/book');

// Router to get all books
router.get('/getAllBooks', function( req, res ){
    console.log('Getting all books...');    
    Book.getAllBooks( function( err, books ) {
        if ( err ) {
            res.send('Error while getting books : ' + err );
        } else {
            console.log( books );
            res.json( books );
        }
    });
});

// Router to get a particular book using it's id as url parameter
router.get('/getBookById/:id', function( req, res ){
    console.log('Getting one book...');    
    var id = req.params.id;
    
    Book.getBookById( id, function( err, book ) {
        if ( err ) {
            console.log('Error while getting book : ' + err );
        } else {
            console.log( book );
            res.json( book );
        }
    });
});


// Router  to create a new book entry into mongoDB
//*******************************************************

// Both are same api's to create new entry in mongo DB

//app.post('/saveBook', function( req, res ) {
//    var newBook = new Book();
//    newBook.title = req.body.title;
//    newBook.author = req.body.author;
//    newBook.category = req.body.category;
//    
//    newBook.save( function ( err, book ) {
//        if( err ) {
//            res.send("Error while saving the book...");
//        } else {
//            console.log( book );
//            res.send( book );
//        }
//    });
//});

router.post('/saveBook', function( req, res ) {
    console.log('Saving book in DB...');
    var newBook = {
        title: req.body.title,
        author: req.body.author,
        category: req.body.category   
    };
    
    Book.addNewBook( newBook, function( err, book ) {
        if( err ) {
            res.send("Error while saving the book : " + err );
        } else {
            console.log( book );
            res.send( book );
        }
    });
});

//*******************************************************

// Router to update a book
router.put('/updateBook', function( req, res ) {
    console.log('Updating book...');
    var id = req.body.id;
    
    var book = {
        title: req.body.title,
        author: req.body.author,
        category: req.body.category
    };
    
    Book.updateBook( id, book, {}, function( err, updatedBook ) {
        if ( err ) {
            res.send("Error while updating book : " + err );
        } else {
            res.json( updatedBook );
        }
    });
});

// Router to delete a book
router.delete('/deleteBook', function( req, res ) {
    console.log('Deleting book...');
    var id = req.body.id;
    
    Book.deleteBook( id, function( err, deletedBook ) {
        if ( err ) {
            res.send("Error while deleting book : " + err );
        } else {
            console.log(deletedBook);
            res.json( deletedBook );
        }
    });
});

module.exports = router;