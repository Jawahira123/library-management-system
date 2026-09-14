const Issue = require("../model/issuemodel");
const Student = require("../model/studentmodel");
const Book = require("../model/librarymodel");

// GET ALL ISSUE RECORDS
const getAllIssues = async (req, res) => {

    try {

        const issues = await Issue.find()
            .populate("studentId")
            .populate("bookId");

        res.status(200).json({
            issues: issues
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Failed to fetch issue records"
        });

    }

};

// GET ISSUE RECORD BY ID
const getissueById = async (req, res) => {

    try {

        const issue = await Issue.findById(req.params.iid)
            .populate("studentId")
            .populate("bookId");

        if (!issue) {

            return res.status(404).json({
                message: "Issue record not found"
            });

        }

        res.status(200).json({
            issue: issue
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Failed to fetch issue record"
        });

    }

};


// CREATE ISSUE RECORD
// CREATE ISSUE RECORD
const createissue = async (req, res) => {

    try {

        const {
            studentId,
            bookId,
            issueDate,
            dueDate
        } = req.body;


        // Check required fields
        if (!studentId || !bookId || !issueDate || !dueDate) {

            return res.status(400).json({
                message: "Student, book, issue date and due date are required"
            });

        }


        // Validate dates
        if (new Date(dueDate) < new Date(issueDate)) {

            return res.status(400).json({
                message: "Due date cannot be earlier than issue date"
            });

        }


        // Check student
        const student = await Student.findById(studentId);

        if (!student) {

            return res.status(404).json({
                message: "Student not found"
            });

        }


        // Check book
        const book = await Book.findById(bookId);

        if (!book) {

            return res.status(404).json({
                message: "Book not found"
            });

        }


        // Check whether book is already issued
        if (book.status?.toLowerCase() === "issued") {

            return res.status(400).json({
                message: "Book is already issued"
            });

        }


        // Create issue record
        const createdIssue = new Issue({

            studentId,
            bookId,
            issueDate,
            dueDate,
            returnDate: null,
            status: "Issued"

        });


        const savedIssue = await createdIssue.save();


        // Change book status
        book.status = "Issued";

        await book.save();


        res.status(201).json({

            issue: savedIssue,

            message: "Book issued successfully"

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Failed to issue book"
        });

    }

};


// UPDATE ISSUE / RETURN
const updateissueById = async (req, res) => {

    try {

        const {
            issueDate,
            dueDate,
            returnDate,
            status
        } = req.body;


        // Check required fields
        if (!issueDate || !dueDate || !status) {

            return res.status(400).json({
                message: "Issue date, due date and status are required"
            });

        }


        // Check valid dates
        if (
            isNaN(new Date(issueDate).getTime()) ||
            isNaN(new Date(dueDate).getTime())
        ) {

            return res.status(400).json({
                message: "Please provide valid dates"
            });

        }


        const issue = await Issue.findById(req.params.iid);

        if (!issue) {

            return res.status(404).json({
                message: "Issue record not found"
            });

        }


        // Prevent returning an already returned book
        if (
            status === "Returned" &&
            issue.status?.toLowerCase() === "returned"
        ) {

            return res.status(400).json({
                message: "This book has already been returned"
            });

        }


        // Validate due date
        if (new Date(dueDate) < new Date(issueDate)) {

            return res.status(400).json({
                message: "Due date cannot be earlier than issue date"
            });

        }


        // Validate return date
        if (status === "Returned") {

            if (!returnDate) {

                return res.status(400).json({
                    message: "Return date is required"
                });

            }

            if (isNaN(new Date(returnDate).getTime())) {

                return res.status(400).json({
                    message: "Please provide a valid return date"
                });

            }

            if (new Date(returnDate) < new Date(issueDate)) {

                return res.status(400).json({
                    message: "Return date cannot be earlier than issue date"
                });

            }

        }


        // Update issue details
        issue.issueDate = issueDate;
        issue.dueDate = dueDate;
        issue.returnDate = returnDate || null;
        issue.status = status;


        const updatedIssue = await issue.save();


        // If book is returned
        if (status === "Returned") {

            await Book.findByIdAndUpdate(
                issue.bookId,
                { status: "available" }
            );

        }


        res.status(200).json({

            record: updatedIssue,

            message: "Record updated successfully"

        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Failed to update issue record"
        });

    }

};

// DELETE ISSUE RECORD
const deleteissueById = async (req, res) => {

    try {

        const deletedIssue = await Issue.findByIdAndDelete(
            req.params.iid
        );


        if (!deletedIssue) {

            return res.status(404).json({
                message: "Issue record not found"
            });

        }


        res.status(200).json({
            message: "Issue record deleted successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Failed to delete issue record"
        });

    }

};

exports.getAllIssues = getAllIssues;
exports.getissueById = getissueById;
exports.createissue = createissue;
exports.updateissueById = updateissueById;
exports.deleteissueById = deleteissueById;