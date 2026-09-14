const Book = require("../model/librarymodel");



const getAllBooks = async (req, res, next) => {

    try {

        const books = await Book.find();

        res.status(200).json({
            books: books
        });

    } catch (error) {

        res.status(500).json({
            message: "Failed to fetch books",
            error: error.message
        });

    }

};


const getBookById = async (req, res, next) => {

    try {

        const book = await Book.findById(req.params.lid);

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json({
            library: book
        });

    } catch (error) {

        res.status(500).json({
            message: "Failed to fetch book",
            error: error.message
        });

    }

};



const createBook = async (req, res, next) => {

    try {

        const {
            title,
            author,
            category,
            status
        } = req.body;


        // Check required fields
        if (!title || !author || !category) {

            return res.status(400).json({
                message: "Title, author and category are required"
            });

        }


        const createdBook = new Book({

            title: title.trim(),
            author: author.trim(),
            category: category.trim(),
            status: status || "available"

        });


        const savedBook = await createdBook.save();


        res.status(201).json({

            book: savedBook,

            message: "Book created successfully"

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({

            message: "Failed to create book"

        });

    }

};

const updateBookById = async (req, res, next) => {

    try {

        const { title, author, category, status } = req.body;

        const updatedBook = await Book.findByIdAndUpdate(
            req.params.lid,
            {
                title,
                author,
                category,
                status
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedBook) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json({
            book: updatedBook,
            message: "Book updated successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: "Failed to update book",
            error: error.message
        });

    }

};


const updatedbookstatus = async (bookId, status) => {

    try {

        const updatedBook = await Book.findByIdAndUpdate(
            bookId,
            { status: status },
            { new: true }
        );

        if (!updatedBook) {
            return false;
        }

        return true;

    } catch (error) {

        console.log("Error updating book status:", error.message);

        return false;
    }

};



const getBookStatus = async (bookId) => {

    try {

        const book = await Book.findById(bookId);

        if (!book) {
            return null;
        }

        return book.status;

    } catch (error) {

        console.log("Error getting book status:", error.message);

        return null;
    }

};



const deleteBookId = async (req, res, next) => {

    try {

        const book = await Book.findById(req.params.lid);

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        // Prevent deleting an issued book
        if (book.status?.toLowerCase() === "issued") {
            return res.status(400).json({
                message: "Cannot delete an issued book. Please return the book first."
            });
        }

        await Book.findByIdAndDelete(req.params.lid);

        res.status(200).json({
            message: "Book deleted successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: "Failed to delete book",
            error: error.message
        });

    }

};




exports.getAllBooks = getAllBooks;
exports.getBookById = getBookById;
exports.createBook = createBook;
exports.updateBookById = updateBookById;
exports.updatedbookstatus = updatedbookstatus;
exports.getBookStatus = getBookStatus;
exports.deleteBookId = deleteBookId;