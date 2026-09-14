const jwt = require("jsonwebtoken");
const Student = require("../model/studentmodel");
const Issue = require("../model/issuemodel");
const bcrypt = require("bcryptjs");


const getAllStudents = async (req, res) => {
    try {
        const students = await Student.find();

        res.status(200).json({
            students: students
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to fetch students"
        });
    }
};



const getstudById = async (req, res) => {
    try {
        const student = await Student.findById(req.params.sid);

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json({
            student: student
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Failed to fetch student"
        });
    }
};



const createstd = async (req, res) => {

    try {

        const {
            name,
            regNo,
            department,
            year,
            gender,
            email,
            phone,
            password
        } = req.body;


        // Check required fields
        if (
            !name ||
            !regNo ||
            !department ||
            !year ||
            !gender ||
            !email ||
            !phone ||
            !password
        ) {

            return res.status(400).json({
                message: "All student fields are required"
            });

        }


        // Check password length
        if (password.length < 6) {

            return res.status(400).json({
                message: "Password must contain at least 6 characters"
            });

        }


        // Hash password before saving
        const hashedPassword = await bcrypt.hash(
            password.trim(),
            10
        );


        const createdStudent = new Student({

            name: name.trim(),
            regNo: regNo.trim(),
            department: department.trim(),
            year: year.trim(),
            gender,
            email: email.trim(),
            phone: phone.trim(),
            password: hashedPassword

        });


        const savedStudent = await createdStudent.save();


        res.status(201).json({

            student: savedStudent,

            message: "Student created successfully"

        });

    } catch (error) {

        console.log(error);


        if (error.code === 11000) {

            return res.status(400).json({
                message: "Register number already exists"
            });

        }


        if (error.name === "ValidationError") {

            return res.status(400).json({

                message: Object.values(error.errors)
                    .map((err) => err.message)
                    .join(", ")

            });

        }


        res.status(500).json({
            message: "Failed to create student"
        });

    }

};


const studentLogin = async (req, res) => {

    try {

        const { regNo, password } = req.body;


        // Check required fields
        if (!regNo || !password) {

            return res.status(400).json({
                message: "Register number and password are required"
            });

        }


        const student = await Student.findOne({
            regNo: regNo.trim()
        }).select("+password");


        if (!student) {

            return res.status(401).json({
                message: "Invalid register number or password"
            });

        }


        const isPasswordValid = await bcrypt.compare(
            password,
            student.password
        );


        if (!isPasswordValid) {

            return res.status(401).json({
                message: "Invalid register number or password"
            });

        }


        // Create JWT token
        const token = jwt.sign(
            {
                role: "student",
                studentId: student._id,
                regNo: student.regNo
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );


        res.status(200).json({

            message: "Student login successful",

            token: token,

            student: {

                id: student._id,
                name: student.name,
                regNo: student.regNo,
                department: student.department,
                year: student.year,
                gender: student.gender,
                email: student.email,
                phone: student.phone

            }

        });

    } catch (error) {

        console.log("STUDENT LOGIN ERROR:", error);

        res.status(500).json({
            message: "Student login failed"
        });

    }

};



const updatestdById = async (req, res, next) => {
    try {
        const { password, ...studentData } = req.body;

        // Find existing student
        const student = await Student.findById(req.params.sid).select("+password");

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        // Update normal student details
        Object.keys(studentData).forEach((key) => {
            student[key] = studentData[key];
        });

        // Update password only if a new password is provided
        if (password && password.trim() !== "") {

            if (password.length < 6) {
                return res.status(400).json({
                    message: "Password must contain at least 6 characters"
                });
            }

            const hashedPassword = await bcrypt.hash(
                password.trim(),
                10
            );

            student.password = hashedPassword;
        }

        // Save complete student document
        await student.save();

        res.status(200).json({
            message: password
                ? "Student details and password updated successfully"
                : "Student details updated successfully",
            student
        });

    } catch (error) {
        console.log("UPDATE STUDENT ERROR:", error);

        if (error.code === 11000) {
            return res.status(400).json({
                message: "Register number already exists"
            });
        }

        if (error.name === "ValidationError") {
            const firstError =
                Object.values(error.errors)[0]?.message;

            return res.status(400).json({
                message: firstError || "Invalid student details"
            });
        }

        res.status(500).json({
            message: "Failed to update student",
            error: error.message
        });
    }
};



const deletestdById = async (req, res) => {

    try {

        const student = await Student.findById(req.params.sid);

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        // Check whether the student has an active issued book
        const activeIssue = await Issue.findOne({
            studentId: req.params.sid,
            status: "Issued"
        });

        if (activeIssue) {
            return res.status(400).json({
                message: "Cannot delete student while they have an issued book. Please return the book first."
            });
        }

        await Student.findByIdAndDelete(req.params.sid);

        res.status(200).json({
            message: "Student deleted successfully"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Failed to delete student"
        });

    }
};


exports.getAllStudents = getAllStudents;
exports.getstudById = getstudById;
exports.createstd = createstd;
exports.studentLogin = studentLogin;
exports.updatestdById = updatestdById;
exports.deletestdById = deletestdById;