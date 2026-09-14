
import "../css/editstudent.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Editstudents() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        regNo: "",
        department: "",
        year: "",
        gender: "",
        email: "",
        phone: "",
        password: ""
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {

        const fetchStudent = async () => {

            try {

                const response = await fetch(
                    `http://localhost:5000/api/student/${id}`
                );

                const data = await response.json();

                if (response.ok) {

                    const student = data.student;

                    setFormData({
                        name: student.name || "",
                        regNo: student.regNo || "",
                        department: student.department || "",
                        year: student.year || "",
                        gender: student.gender || "",
                        email: student.email || "",
                        phone: student.phone || "",
                        password: ""
                    });

                } else {

                    alert(
                        data.message ||
                        "Student not found"
                    );

                }

            } catch (error) {

                console.log(error);

                alert(
                    "Unable to connect to server"
                );

            } finally {

                setLoading(false);

            }
        };

        fetchStudent();

    }, [id]);


    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setSaving(true);

        try {

            /*
             * Create the data that will be sent
             * to the backend.
             *
             * Password is only sent when the
             * admin enters a new password.
             */

            const updateData = {
                name: formData.name,
                regNo: formData.regNo,
                department: formData.department,
                year: formData.year,
                gender: formData.gender,
                email: formData.email,
                phone: formData.phone
            };

            if (formData.password.trim() !== "") {
                updateData.password =
                    formData.password.trim();
            }


            const response = await fetch(
                `http://localhost:5000/api/student/${id}`,
                {
                    method: "PATCH",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify(updateData)
                }
            );


            const data = await response.json();


            if (response.ok) {

                alert(
                    data.message ||
                    "Student updated successfully"
                );

                navigate("/Students");

            } else {

                alert(
                    data.message ||
                    "Failed to update student"
                );

            }

        } catch (error) {

            console.log(error);

            alert(
                "Unable to connect to server"
            );

        } finally {

            setSaving(false);
        }

    };


    if (loading) {

        return (
            <div className="editstudent-loading">
                Loading student details...
            </div>
        );

    }


    return (

        <div className="editstudent-page">

            <div className="editstudent-header">

                <h1>
                    Edit Student Details
                </h1>

                <p>
                    Update student information
                </p>

            </div>


            <div className="editstudent-form-area">

                <form
                    className="editstudent-form"
                    onSubmit={handleSubmit}
                >


                    {/* =========================
                        NAME
                       ========================= */}

                    <div className="editstudent-field">

                        <label>
                            Name
                        </label>

                        <input
                            type="text"
                            name="name"
                            placeholder="Enter Name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* =========================
                        REGISTER NUMBER
                       ========================= */}

                    <div className="editstudent-field">

                        <label>
                            Reg No
                        </label>

                        <input
                            type="text"
                            name="regNo"
                            placeholder="Enter Reg No"
                            value={formData.regNo}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* =========================
                        DEPARTMENT
                       ========================= */}

                    <div className="editstudent-field">

                        <label>
                            Department
                        </label>

                        <input
                            type="text"
                            name="department"
                            placeholder="Enter Department"
                            value={formData.department}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* =========================
                        YEAR
                       ========================= */}

                    <div className="editstudent-field">

                        <label>
                            Year
                        </label>

                        <input
                            type="text"
                            name="year"
                            placeholder="Enter Year"
                            value={formData.year}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* =========================
                        GENDER
                       ========================= */}

                    <div className="editstudent-field gender-field">

                        <label>
                            Gender
                        </label>

                        <div className="editstudent-gender">

                            <label>

                                <input
                                    type="radio"
                                    name="gender"
                                    value="Male"
                                    checked={
                                        formData.gender ===
                                        "Male"
                                    }
                                    onChange={handleChange}
                                />

                                <span>
                                    Male
                                </span>

                            </label>


                            <label>

                                <input
                                    type="radio"
                                    name="gender"
                                    value="Female"
                                    checked={
                                        formData.gender ===
                                        "Female"
                                    }
                                    onChange={handleChange}
                                />

                                <span>
                                    Female
                                </span>

                            </label>


                            <label>

                                <input
                                    type="radio"
                                    name="gender"
                                    value="Other"
                                    checked={
                                        formData.gender ===
                                        "Other"
                                    }
                                    onChange={handleChange}
                                />

                                <span>
                                    Other
                                </span>

                            </label>

                        </div>

                    </div>


                    {/* =========================
                        EMAIL
                       ========================= */}

                    <div className="editstudent-field">

                        <label>
                            E-Mail
                        </label>

                        <input
                            type="email"
                            name="email"
                            placeholder="eg: username@xxxx.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* =========================
                        PHONE
                       ========================= */}

                    <div className="editstudent-field">

                        <label>
                            Phone
                        </label>

                        <input
                            type="tel"
                            name="phone"
                            placeholder="10-digit phone number"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />

                    </div>


                    {/* =========================
                        PASSWORD
                       ========================= */}

                    <div className="editstudent-field">

                        <label>
                            New Password
                        </label>

                        <input
                            type="password"
                            name="password"
                            placeholder="Leave empty to keep current password"
                            value={formData.password}
                            onChange={handleChange}
                            minLength="6"
                        />

                        <small className="editstudent-password-note">
                            Enter a password only if you want
                            to set or reset the student's password.
                        </small>

                    </div>


                    {/* =========================
                        BUTTONS
                       ========================= */}

                    <div className="editstudent-actions">

                        <button
                            type="submit"
                            className="save-student-btn"
                            disabled={saving}
                        >
                            {saving
                                ? "Saving..."
                                : "Save"}
                        </button>


                        <button
                            type="button"
                            className="cancel-student-btn"
                            onClick={() =>
                                navigate("/Students")
                            }
                            disabled={saving}
                        >
                            Cancel
                        </button>

                    </div>


                </form>

            </div>

        </div>
    );
}

export default Editstudents;