const jwt = require("jsonwebtoken");

const ADMIN_USERNAME = "admin";
const ADMIN_PASSWORD = "admin123";


const adminLogin = (req, res, next) => {

    const { username, password } = req.body;

    if (
        username === ADMIN_USERNAME &&
        password === ADMIN_PASSWORD
    ) {

        const token = jwt.sign(
            {
                role: "admin",
                username: username
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d"
            }
        );

        return res.status(200).json({
            message: "Admin login successful",
            username: username,
            token: token
        });

    }

    res.status(401).json({
        message: "Invalid username or password"
    });
};


exports.adminLogin = adminLogin;