
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/studentlogin.css";

function StudentLogin() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        regNo: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const regNo = formData.regNo.trim();
        const password = formData.password;

        // Frontend validation
        if (!regNo) {
            alert("Please enter your register number.");
            return;
        }

        if (!password.trim()) {
            alert("Please enter your password.");
            return;
        }

        if (loading) {
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(
                "https://library-management-system-r9ds.onrender.com/api/student/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        regNo,
                        password
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {

                // Make sure student data is available
                if (!data.student || !data.student.id || !data.token) {
    alert(
        "Login succeeded, but student details or authentication token were not received."
    );
    return;
}

                // Store logged-in student
                localStorage.setItem(
    "student",
    JSON.stringify({
        ...data.student,
        token: data.token
    })
);
                alert(data.message || "Student login successful");

                navigate("/student/dashboard", {
                    replace: true
                });

            } else {

                // Remove any old student session
                localStorage.removeItem("student");

                alert(
                    data.message ||
                    "Invalid register number or password"
                );

                // Clear password after failed login
                setFormData((previous) => ({
                    ...previous,
                    password: ""
                }));
            }

        } catch (error) {

            console.log("STUDENT LOGIN ERROR:", error);

            alert(
                "Unable to connect to server. Please make sure the backend server is running."
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="student-login-page">

            <div className="student-login-card">

                <div className="student-login-header">
                    <h1>Student Login</h1>
                    <p>
                        Login to view your library records
                    </p>
                </div>

                <form onSubmit={handleSubmit}>

                    <div className="student-login-field">
                        <label>Register Number</label>

                        <input
                            type="text"
                            name="regNo"
                            placeholder="Enter Register Number"
                            value={formData.regNo}
                            onChange={handleChange}
                            required
                            autoComplete="username"
                        />
                    </div>

                    <div className="student-login-field">
                        <label>Password</label>

                        <input
                            type="password"
                            name="password"
                            placeholder="Enter Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            autoComplete="current-password"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>

                </form>

            </div>

        </div>
    );
}

export default StudentLogin;
