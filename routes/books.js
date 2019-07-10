const express = require('express');
const router = express.Router();
const books = require('../controllers/book')

/* GET users listing. */
router.get('/', books.getBooks)
      .get('/:bookId', books.getBookById)
      .post('/', books.insertBook)
      .put('/:bookId', books.updateBookById)
      .delete('/:bookId', books.discardBookById);

module.exports = router;
