// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/details', (req, res, next) => {

   // res.render('books/details', { title: "Add Contacts" });
    book.find( (err, books) => {
      if (err) {
        return console.error(err);
      }
      else {
        res.render('books/details', {
          title: 'Add Books',
          books: books
        });
      }
    });
    /*****************
     * ADD CODE HERE *
     *****************/
});

// POST process the Book Details page and create a new Book - CREATE
router.post('/details', (req, res, next) => {

    let newContact = book({
        "Title": req.body.title,
        //"Description": req.body.Contact,
        "Price": req.body.price,
        "Author": req.body.author,
        "Genre": req.body.genre
    });

    book.create(newContact, (err, contactInfo) => {

        if (err)
        {
            console.log(err);
            res.end(err);
        }
        else{
            res.redirect('/books');

        }

    });

    /*****************
     * ADD CODE HERE *
     *****************/
});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    let id = req.params.id;
    book.findById(id, (err, bookToEdit) => {
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {
          //show the edit view
          res.render('books/details', {title: 'Edit Book', books: bookToEdit})
      }
    });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    let id = req.params.id

    let updatedBook = book({
        "_id": id,
        "Title": req.body.title,
        "Price": req.body.price,
        "Author": req.body.author,
        "Genre":req.body.genre,
    });

    book.updateOne({_id: id}, updatedBook, (err) => {
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {
          // refresh the book list
          res.redirect('/books');
      }
  });

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    let id = req.params.id;

    book.remove({_id: id}, (err) => {
        if(err)
        {
            res.end(err);
        }
        else
        {
             // refresh the book list
             res.redirect('/books');
        }
    });
});


module.exports = router;
