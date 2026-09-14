const express = require("express");

const libraryController = require("../controller/libraryController");

const router = express.Router();

router.get("/", libraryController.getAllBooks);
router.get("/:lid", libraryController.getBookById);
router.post("/", libraryController.createBook);
router.patch("/:lid", libraryController.updateBookById);
router.delete("/:lid", libraryController.deleteBookId);

module.exports = router;