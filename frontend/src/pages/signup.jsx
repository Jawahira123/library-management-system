import { Link, useNavigate } from "react-router-dom";
import loginimg from "../assets/loginimg.png";
import "../css/Login.css";
import { useState } from "react";

function Signup() {
    const [formdata, setFormData] = useState({
        username: "",
        pw: "",
    });

    const navigate = useNavigate();

    const handleform = (e) => {
        setFormData({
            ...formdata,
            [e.target.name]: e.target.value
        });
    };

    const handlesubmit = (e) => {
        e.preventDefault();

        navigate("/Books");
    };

    return (
        <div className="auth-page">

            <div className="auth-brand">
                <img src={loginimg} alt="Library Management System" />

                <div className="brand-overlay">
                    <h1>Library Management System</h1>
                    <p>Create your account and get started</p>
                </div>
            </div>

            <div className="auth-content">

                <div className="auth-card">

                    <div className="auth-heading">
                        <h2>Create Account</h2>
                        <p>Sign up to access the library system</p>
                    </div>

                    <form onSubmit={handlesubmit}>

                        <div className="form-group">
                            <label htmlFor="email">
                                Email
                            </label>

                            <input
                                id="email"
                                type="email"
                                placeholder="Enter your email"
                                name="username"
                                value={formdata.username}
                                onChange={handleform}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="signup-password">
                                Password
                            </label>

                            <input
                                id="signup-password"
                                type="password"
                                placeholder="Create a password"
                                name="pw"
                                value={formdata.pw}
                                onChange={handleform}
                                required
                            />
                        </div>

                        <button
                            className="auth-button"
                            type="submit"
                        >
                            Sign Up
                        </button>

                    </form>

                    <div className="auth-footer">
                        <span>Already have an account?</span>

                        <Link to="/Login">
                            Login
                        </Link>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default Signup;
