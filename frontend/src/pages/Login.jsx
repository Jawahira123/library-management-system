import { Link, useNavigate } from "react-router-dom";
import loginimg from "../assets/loginimg.png";
import "../css/Login.css";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Login() {
    const [formdata, setFormData] = useState({
        username: "",
        pw: "",
    });

    const navigate = useNavigate();
    const { login } = useAuth();

    const handleform = (e) => {
        setFormData({
            ...formdata,
            [e.target.name]: e.target.value
        });
    };

    const handlesubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(
                            "https://library-management-system-r9ds.onrender.com/api/admin/login",
             {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        username: formdata.username,
                        password: formdata.pw
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {
                login(data.username);

                alert(data.message);

                navigate("/Dashboard");
            } else {
                alert(data.message);
            }

        } catch (error) {
            console.log(error);
            alert("Unable to connect to server");
        }
    };

    return (
        <div className="auth-page">

            <div className="auth-brand">
                <img
    src={loginimg}
    alt="Library Management System"
    style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block"
    }}
/>

                <div className="brand-overlay">
                    <h1>Library Management System</h1>
                    <p>
                        Manage your library easily and efficiently
                    </p>
                </div>
            </div>

            <div className="auth-content">

                <div className="auth-card">

                    <div className="auth-heading">
                        <h2>Welcome Back</h2>
                        <p>Login to your library account</p>
                    </div>

                    <form onSubmit={handlesubmit}>

                        <div className="form-group">
                            <label htmlFor="username">
                                Username
                            </label>

                            <input
                                id="username"
                                type="text"
                                placeholder="Enter your username"
                                name="username"
                                value={formdata.username}
                                onChange={handleform}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">
                                Password
                            </label>

                            <input
                                id="password"
                                type="password"
                                placeholder="Enter your password"
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
                            Login
                        </button>

                    </form>

                    <div className="auth-footer">
                        <span>
                            Don't have an account?
                        </span>

                        <Link to="/signup">
                            Sign Up
                        </Link>
                    </div>

                    {/* Student Login */}
                    <div className="student-login-footer">
                        <span>
                            Are you a student?
                        </span>

                        <button
                            type="button"
                            onClick={() => navigate("/student/login")}
                        >
                            Student Login
                        </button>
                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;



