import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/addstudent.css";

function Addstudents() {
    const navigate = useNavigate();

    const [formdata, setFormData] = useState({
        name: "",
        regNo: "",
        department: "",
        year: "",
        gender: "",
        email: "",
        phone: "",
        password: ""
    });

    const handleform = (e) => {
        setFormData({
            ...formdata,
            [e.target.name]: e.target.value
        });
    };

    const handlesubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:5000/api/student", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formdata)
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message || "Student added successfully");
                navigate("/Students");
            } else {
                alert(data.message || "Failed to add student");
            }
        } catch (error) {
            console.log(error);
            alert("Unable to connect to server");
        }
    };

    return (
        <div className="addstudent-page">

            <div className="student-page-header">
                <h1>Add Students</h1>
                <p>Enter all details</p>
            </div>

            <div className="student-form-area">

                <form className="data-std" onSubmit={handlesubmit}>

                    <div className="student-field">
                        <label>Name</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Enter Name"
                            value={formdata.name}
                            onChange={handleform}
                            required
                        />
                    </div>

                    <div className="student-field">
                        <label>Reg No</label>
                        <input
                            type="text"
                            name="regNo"
                            placeholder="Enter Reg No"
                            value={formdata.regNo}
                            onChange={handleform}
                            required
                        />
                    </div>

                    <div className="student-field">
                        <label>Department</label>
                        <input
                            type="text"
                            name="department"
                            placeholder="Enter Department"
                            value={formdata.department}
                            onChange={handleform}
                            required
                        />
                    </div>

                    <div className="student-field">
                        <label>Year</label>
                        <input
                            type="text"
                            name="year"
                            placeholder="Enter Year"
                            value={formdata.year}
                            onChange={handleform}
                            required
                        />
                    </div>

                    <div className="student-field gender-field">
                        <label>Gender</label>

                        <div className="gender">
                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Male"
                                    checked={formdata.gender === "Male"}
                                    onChange={handleform}
                                    required
                                />
                                <span>Male</span>
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Female"
                                    checked={formdata.gender === "Female"}
                                    onChange={handleform}
                                />
                                <span>Female</span>
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    name="gender"
                                    value="Other"
                                    checked={formdata.gender === "Other"}
                                    onChange={handleform}
                                />
                                <span>Other</span>
                            </label>
                        </div>
                    </div>

                    <div className="student-field">
                        <label>E-Mail</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="Enter E-Mail"
                            value={formdata.email}
                            onChange={handleform}
                            required
                        />
                    </div>

                    <div className="student-field">
                        <label>Phone Number</label>
                        <input
                            type="tel"
                            name="phone"
                            placeholder="Enter Phone Number"
                            value={formdata.phone}
                            onChange={handleform}
                            required
                        />
                    </div>

                    <div className="student-field">
    <label>Password</label>

    <input
        type="password"
        name="password"
        placeholder="Enter Password"
        value={formdata.password}
        onChange={handleform}
        minLength="6"
        required
    />
</div>

                    <button type="submit">
                        Add Student
                    </button>

                </form>

            </div>

        </div>
    );
}

export default Addstudents;