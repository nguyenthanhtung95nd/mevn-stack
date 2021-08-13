const User = require('../../models/user.model');
const Book = require('../../models/book.model');
const moment = require('moment');
const auth = require('../../services/auth.service');

function index(rep, res) {
    // FIND ALL BOOKS
    Book.find({}, (error, books) => {
        if (error) {
            return res.status(500).json();
        }
        return res.status(200).json({ books: books });
    }).populate('author', 'username', 'user');
    // Populate will find the author that created the task and add it to the task (username only)
}

function create(req, res) {
    // CREATE BOOK
    const id = auth.getUserId(req);
    User.findOne({ _id: id }, (error, user) => {
        if (error && !user) {
            return res.status(500).json();
        }
        const book = new Book(req.body.book);
        book.author = user._id;
        book.dueDate = moment(book.dueDate);

        book.save(error => {
            if (error) {
                return res.status(500).json();
            }
            return res.status(201).json();
        });
    });
    
}

function update(req, res) {
    // UPDATE BOOK
    const id = auth.getUserId(req);;
    User.findOne({ _id: id }, (error, user) => {
        if (error) {
            return res.status(500).json();
        }
        if (!user) {
            return res.status(404).json();
        }

        const book = new Book(req.body.book);
        book.author = user._id;
        book.dueDate = moment(book.dueDate); // Formats the due date to a proper date format
        Book.findByIdAndUpdate({ _id: book._id }, book, error => {
            if (error) {
                return res.status(500).json();
            }
            return res.status(204).json();
        });
    });
}

function remove(req, res) {
    // DELETE A BOOK
    const id = auth.getUserId(req);
    Book.findOne({ _id: req.params.id }, (error, book) => {
        if (error) {
            return res.status(500).json();
        }
        if (!book) {
            return res.status(404).json();
        }
        if (book.author._id.toString() !== id) {
            return res.status(403).json({ message: 'Not allowed to delete another user\'s book' });
        }
        Book.deleteOne({ _id: req.params.id }, error => {
            if (error) {
                return res.status(500).json();
            }
            return res.status(204).json();
        });
    });
}

function show(req, res) {
    // GET BOOK BY ID
    Book.findOne({ _id: req.params.id }, (error, book) => {
        if (error) {
            return res.status(500).json();
        }
        if (!book) {
            return res.status(404).json();
        }
        return res.status(200).json({ book: book });
    });
}

module.exports = {
    index: index,
    create: create,
    update: update,
    remove: remove,
    show: show
};