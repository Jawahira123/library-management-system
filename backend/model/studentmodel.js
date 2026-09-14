const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true,
        match: [/^[A-Za-z\s]+$/, "Name should contain only letters"]
    },

    regNo: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    department: {
        type: String,
        required: true,
        trim: true
    },

    year: {
        type: String,
        required: true,
        trim: true,
        match: [/^(1|2|3|4)$/, "Year must be between 1 and 4"]
    },

    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female", "Other"]
    },

    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        match: [
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            "Please enter a valid email address"
        ]
    },

    phone: {
        type: String,
        required: true,
        trim: true,
        match: [/^[0-9]{10}$/, "Phone number must contain 10 digits"]
    },

    password: {
    type: String,
    required: true,
    minlength: 6,
    select: false
}

});

module.exports = mongoose.model("Student", studentSchema);