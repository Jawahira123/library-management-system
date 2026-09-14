import "../css/issuebk.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Issuebk() {

    const navigate = useNavigate();

    const [students, setStudents] = useState([]);
    const [books, setBooks] = useState([]);

   const [formData, setFormData] = useState({
    studentId: "",
    bookId: "",
    issueDate: "",
    dueDate: ""
});

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchData = async () => {

            try {

                const [studentResponse, bookResponse] =
                    await Promise.all([
                        fetch("https://library-management-system-r9ds.onrender.com/api/student"),
                        fetch("https://library-management-system-r9ds.onrender.com/api/library")
                    ]);

                const studentData = await studentResponse.json();
                const bookData = await bookResponse.json();

                if (studentResponse.ok) {
                    setStudents(studentData.students);
                } else {
                    alert(
                        studentData.message ||
                        "Failed to fetch students"
                    );
                }

                if (bookResponse.ok) {
                    setBooks(bookData.books);
                } else {
                    alert(
                        bookData.message ||
                        "Failed to fetch books"
                    );
                }

            } catch (error) {

                console.log(error);
                alert("Unable to connect to server");

            } finally {

                setLoading(false);

            }
        };

        fetchData();

    }, []);

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            const response = await fetch(
                "https://library-management-system-r9ds.onrender.com/api/issue",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                }
            );

            const data = await response.json();

            if (response.ok) {

                alert("Book issued successfully");
                navigate("/issueReturn");

            } else {

                alert(
                    data.message ||
                    "Failed to issue book"
                );

            }

        } catch (error) {

            console.log(error);
            alert("Unable to connect to server");

        }

    };

    if (loading) {

        return (
            <div className="issuebk-loading">
                Loading students and books...
            </div>
        );

    }

    return (

        <div className="issuebk-page">

            <div className="issuebk-header">

                <h1>Issue Book</h1>

                <p>Assign a book to a student</p>

            </div>

            <div className="issuebk-form-area">

                <form
                    className="issuebk-form"
                    onSubmit={handleSubmit}
                >

                    <div className="issuebk-field">

                        <label>Student</label>

                        <select
                            name="studentId"
                            value={formData.studentId}
                            onChange={handleChange}
                            required
                        >

                            <option value="">
                                Select Student
                            </option>

                            {students.map((student) => (

                                <option
                                    key={student._id}
                                    value={student._id}
                                >
                                    {student.name} - {student.regNo}
                                </option>

                            ))}

                        </select>

                    </div>

                    <div className="issuebk-field">

                        <label>Book</label>

                        <select
                            name="bookId"
                            value={formData.bookId}
                            onChange={handleChange}
                            required
                        >

                            <option value="">
                                Select Book
                            </option>

                            {books
                                .filter(
                                    (book) =>
                                        book.status.toLowerCase() ===
                                        "available"
                                )
                                .map((book) => (

                                    <option
                                        key={book._id}
                                        value={book._id}
                                    >
                                        {book.title} - {book.author}
                                    </option>

                                ))}

                        </select>

                    </div>

                    <div className="issuebk-field">

                        <label>Issue Date</label>

                        <input
                            type="date"
                            name="issueDate"
                            value={formData.issueDate}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="issuebk-field">

                        <label>Due Date</label>

                        <input
                             type="date"
                             name="dueDate"
                             value={formData.dueDate}
                             onChange={handleChange}
                              required
                            />

                    </div>

                    <div className="issuebk-actions">

                        <button
                            type="submit"
                            className="issue-book-btn"
                        >
                            Issue Book
                        </button>

                        <button
                            type="button"
                            className="cancel-issue-btn"
                            onClick={() =>
                                navigate("/issueReturn")
                            }
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        </div>

    );
}

export default Issuebk;
