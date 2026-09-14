require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./config/db");

const libraryRoute = require("./router/libraryroute");
const studentRoute = require ("./router/studentroute");
const issueRoute = require ("./router/issueroute");
const adminRoute = require("./router/adminroute");

const app = express();

app.use(bodyParser.json());
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));




app.use("/api/library", libraryRoute);
app.use("/api/student", studentRoute);
app.use("/api/issue", issueRoute);
app.use("/api/admin", adminRoute);
connectDB();
app.listen(process.env.PORT || 5000, () => {
    console.log(`Server is running on port ${process.env.PORT || 5000}`);
});