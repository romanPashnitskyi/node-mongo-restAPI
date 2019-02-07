const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Author = require('../models/author');
const Book = require('../models/book');

router.get("/", (req, res, next) => {
    Author.find()
        .select("author _id")
        .exec()
        .then(docs => {
            res.status(200).json({
                count: docs.length,
                orders: docs.map(doc => {
                    return {
                        _id: doc._id,
                        author: doc.author,
                        request: {
                            type: "GET",
                            url: "http://localhost:3000/authors/" + doc._id
                        }
                    };
                })
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});


router.post("/", (req, res, next) => {
    Book.findById(req.body.bookId)
        .then(book => {
            if (!book) {
                return res.status(404).json({
                    message: "Author not found"
                });
            }
            const author = new Author({
                _id: mongoose.Types.ObjectId(),
                book: req.body.bookId
            });
            return author.save();
        })
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Author stored",
                createdAuthor: {
                    _id: result._id,
                    book: result.book,
                },
                request: {
                    type: "GET",
                    url: "http://localhost:3000/authors/" + result._id
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
});

router.get("/:authorId", (req, res, next) => {
    Author.findById(req.params.authorId)
        .exec()
        .then(author => {
            if (!author) {
                return res.status(404).json({
                    message: "Author not found"
                });
            }
            res.status(200).json({
                author: author,
                request: {
                    type: "GET",
                    url: "http://localhost:3000/author"
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

router.delete("/:authorId", (req, res, next) => {
    Author.remove({ _id: req.params.authorId })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "Author deleted",
                request: {
                    type: "POST",
                    url: "http://localhost:3000/author",
                    body: { bookId: "ID" }
                }
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
});

module.exports = router;
