const express = require("express");

const studentController = require("../controller/studentController")

const router = express.Router();



router.get("/", studentController.getAllStudents);
router.post("/login", studentController.studentLogin);
router.get('/:sid',studentController.getstudById);
router.post('/', studentController.createstd);
router.patch('/:sid', studentController.updatestdById)

router.delete('/:sid', studentController.deletestdById)

module.exports = router;