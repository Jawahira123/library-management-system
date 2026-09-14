import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/StudentDashboard.css";

function StudentDashboard() {

    const navigate = useNavigate();

    const [student, setStudent] = useState(null);
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);


    /* =================================
       STUDENT SESSION CHECK
       ================================= */

    useEffect(() => {

        const checkStudentSession = () => {

            const storedStudent =
                localStorage.getItem("student");

            if (!storedStudent) {

                navigate("/student/login", {
                    replace: true
                });

                return;
            }

            try {

                const loggedInStudent =
                    JSON.parse(storedStudent);

                if (!loggedInStudent?.id) {

                    localStorage.removeItem("student");

                    navigate("/student/login", {
                        replace: true
                    });

                    return;
                }

                setStudent(loggedInStudent);

                fetchIssues(loggedInStudent.id);

            } catch (error) {

                console.log("Invalid student session");

                localStorage.removeItem("student");

                navigate("/student/login", {
                    replace: true
                });

            }

        };

        checkStudentSession();

    }, [navigate]);


    /* =================================
       FETCH STUDENT LIBRARY RECORDS
       ================================= */

    const fetchIssues = async (studentId) => {

        try {

            const response = await fetch(
                "http://library-management-system-9ds.onrender.com/api/issue"
            );

            const data = await response.json();

            if (response.ok) {

                const allIssues =
                    data.issues || [];

                const studentIssues =
                    allIssues.filter((issue) => {

                        const issueStudentId =
                            issue.studentId?._id ||
                            issue.studentId;

                        return (
                            String(issueStudentId) ===
                            String(studentId)
                        );

                    });

                setIssues(studentIssues);

            } else {

                console.log(
                    "Failed to fetch issue records"
                );

            }

        } catch (error) {

            console.log(
                "Error fetching issue records:",
                error
            );

        } finally {

            setLoading(false);

        }

    };


    /* =================================
       STUDENT LOGOUT
       ================================= */

    const handleLogout = () => {

        localStorage.removeItem("student");

        navigate("/student/login", {
            replace: true
        });

    };


    /* =================================
       WAIT FOR SESSION CHECK
       ================================= */

    if (!student) {

        return null;

    }


    /* =================================
       BOOK COUNTS
       ================================= */

    const activeBooks = issues.filter(
        (issue) =>
            issue.status?.toLowerCase() === "issued"
    );

    const returnedBooks = issues.filter(
        (issue) =>
            issue.status?.toLowerCase() === "returned"
    );


    /* =================================
       OVERDUE BOOKS
       ================================= */

    const today = new Date();

    const overdueBooks = activeBooks.filter(
        (issue) => {

            if (!issue.dueDate) {

                return false;

            }

            const dueDate =
                new Date(issue.dueDate);

            return dueDate < today;

        }
    );


    return (

        <div className="student-dashboard">


            {/* =================================
                HEADER
               ================================= */}

            <header className="student-dashboard-header">

                <div>

                    <h1>
                        Student Dashboard
                    </h1>

                    <p>
                        Welcome back, {student.name}
                    </p>

                </div>


                <button
                    className="student-logout-btn"
                    onClick={handleLogout}
                >
                    Logout
                </button>

            </header>


            {/* =================================
                STUDENT INFORMATION
               ================================= */}

            <section className="student-profile-card">

                <div className="student-profile-icon">

                    {student.name
                        ?.charAt(0)
                        .toUpperCase()}

                </div>


                <div className="student-profile-info">

                    <h2>
                        {student.name}
                    </h2>

                    <p>
                        Register Number:{" "}
                        {student.regNo}
                    </p>

                    <p>
                        {student.department} • Year{" "}
                        {student.year}
                    </p>

                    <p>
                        {student.email}
                    </p>

                </div>

            </section>


            {/* =================================
                SUMMARY CARDS
               ================================= */}

            <section className="student-summary">


                {/* Total Books */}

                <div className="student-summary-card">

                    <h3>
                        Total Books
                    </h3>

                    <strong>
                        {loading
                            ? "..."
                            : issues.length}
                    </strong>

                    <p>
                        Total library records
                    </p>

                </div>


                {/* Currently Issued */}

                <div className="student-summary-card">

                    <h3>
                        Currently Issued
                    </h3>

                    <strong>
                        {loading
                            ? "..."
                            : activeBooks.length}
                    </strong>

                    <p>
                        Books currently with you
                    </p>

                </div>


                {/* Returned */}

                <div className="student-summary-card">

                    <h3>
                        Returned
                    </h3>

                    <strong>
                        {loading
                            ? "..."
                            : returnedBooks.length}
                    </strong>

                    <p>
                        Books returned previously
                    </p>

                </div>


                {/* Overdue */}

                <div className="student-summary-card">

                    <h3>
                        Overdue
                    </h3>

                    <strong>
                        {loading
                            ? "..."
                            : overdueBooks.length}
                    </strong>

                    <p>
                        Books past their due date
                    </p>

                </div>

            </section>


            {/* =================================
                CURRENTLY ISSUED BOOKS
               ================================= */}

            <section className="student-content-card">

                <div className="student-content-header">

                    <div>

                        <h2>
                            Currently Issued Books
                        </h2>

                        <p>
                            Books that are currently
                            issued to you.
                        </p>

                    </div>

                </div>


                {loading ? (

                    <div className="student-empty-state">

                        <div className="student-empty-icon">
                            📚
                        </div>

                        <h3>
                            Loading Books...
                        </h3>

                        <p>
                            Please wait while we
                            load your records.
                        </p>

                    </div>

                ) : activeBooks.length === 0 ? (

                    <div className="student-empty-state">

                        <div className="student-empty-icon">
                            📚
                        </div>

                        <h3>
                            No Books Currently Issued
                        </h3>

                        <p>
                            You don't have any books
                            currently issued.
                        </p>

                    </div>

                ) : (

                    <div className="student-records">

                        {activeBooks.map((issue) => {

                            const book = issue.bookId;


                            /* =========================
                               OVERDUE CHECK
                               ========================= */

                            const isOverdue =
                                issue.dueDate &&
                                new Date(
                                    issue.dueDate
                                ) < new Date();


                            return (

                                <div
                                    className="student-record"
                                    key={issue._id}
                                >


                                    {/* Book Information */}

                                    <div className="student-book-info">

                                        <h3>
                                            {book?.title ||
                                                "Book"}
                                        </h3>

                                        <p>
                                            Author:{" "}
                                            {book?.author ||
                                                "Unknown"}
                                        </p>

                                        <p>
                                            Category:{" "}
                                            {book?.category ||
                                                "Not available"}
                                        </p>

                                    </div>


                                    {/* Dates */}

                                    <div className="student-book-dates">


                                        <div>

                                            <span>
                                                Issue Date
                                            </span>

                                            <strong>
                                                {new Date(
                                                    issue.issueDate
                                                ).toLocaleDateString()}
                                            </strong>

                                        </div>


                                        <div>

                                            <span>
                                                Due Date
                                            </span>

                                            <strong
                                                className={
                                                    isOverdue
                                                        ? "overdue-date"
                                                        : ""
                                                }
                                            >

                                                {issue.dueDate
                                                    ? new Date(
                                                        issue.dueDate
                                                    ).toLocaleDateString()
                                                    : "Not set"}

                                            </strong>

                                        </div>

                                    </div>


                                    {/* Status */}

                                    <div
                                        className={`student-status ${
                                            isOverdue
                                                ? "overdue"
                                                : "issued"
                                        }`}
                                    >

                                        {isOverdue
                                            ? "Overdue"
                                            : "Issued"}

                                    </div>

                                </div>

                            );

                        })}

                    </div>

                )}

            </section>


            {/* =================================
                LIBRARY HISTORY
               ================================= */}

            <section className="student-content-card student-history-card">

                <div className="student-content-header">

                    <div>

                        <h2>
                            Library History
                        </h2>

                        <p>
                            Your previously returned
                            books.
                        </p>

                    </div>

                </div>


                {loading ? (

                    <div className="student-empty-state">

                        <p>
                            Loading history...
                        </p>

                    </div>

                ) : returnedBooks.length === 0 ? (

                    <div className="student-empty-state">

                        <div className="student-empty-icon">
                            📖
                        </div>

                        <h3>
                            No Returned Books
                        </h3>

                        <p>
                            Your returned books will
                            appear here.
                        </p>

                    </div>

                ) : (

                    <div className="student-records">

                        {returnedBooks.map((issue) => {

                            const book = issue.bookId;


                            return (

                                <div
                                    className="student-record"
                                    key={issue._id}
                                >


                                    {/* Book Information */}

                                    <div className="student-book-info">

                                        <h3>
                                            {book?.title ||
                                                "Book"}
                                        </h3>

                                        <p>
                                            Author:{" "}
                                            {book?.author ||
                                                "Unknown"}
                                        </p>

                                        <p>
                                            Category:{" "}
                                            {book?.category ||
                                                "Not available"}
                                        </p>

                                    </div>


                                    {/* Dates */}

                                    <div className="student-book-dates">

                                        <div>

                                            <span>
                                                Issue Date
                                            </span>

                                            <strong>
                                                {new Date(
                                                    issue.issueDate
                                                ).toLocaleDateString()}
                                            </strong>

                                        </div>


                                        <div>

                                            <span>
                                                Return Date
                                            </span>

                                            <strong>
                                                {issue.returnDate
                                                    ? new Date(
                                                        issue.returnDate
                                                    ).toLocaleDateString()
                                                    : "Not available"}
                                            </strong>

                                        </div>

                                    </div>


                                    {/* Status */}

                                    <div className="student-status returned">

                                        Returned

                                    </div>

                                </div>

                            );

                        })}

                    </div>

                )}

            </section>

        </div>

    );

}

export default StudentDashboard;