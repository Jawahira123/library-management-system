const express = require("express");

const issueController = require("../controller/issueController");

const router = express.Router();

router.get("/", issueController.getAllIssues);


router.get("/:iid", issueController.getissueById);


router.post("/", issueController.createissue);


router.patch("/:iid", issueController.updateissueById);


router.delete("/:iid", issueController.deleteissueById);


module.exports = router;