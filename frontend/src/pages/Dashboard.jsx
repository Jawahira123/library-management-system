import { useEffect, useState } from "react";
import "../css/Dashboard.css";

import {
    FaHandSparkles,
    FaBook,
    FaUserGraduate,
    FaBookReader,
    FaCheckCircle,
} from "react-icons/fa";

import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
} from "recharts";

function Dashboard() {

    const [books, setBooks] = useState([]);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchDashboardData = async () => {

            try {

                const [bookResponse, studentResponse] =
                    await Promise.all([
                        fetch("https://library-management-system-r9ds.onrender.com/api/library"),
                        fetch("https://library-management-system-r9ds.onrender.com/api/student")
                    ]);

                const bookData = await bookResponse.json();
                const studentData = await studentResponse.json();

                if (bookResponse.ok) {
                    setBooks(bookData.books);
                } else {
                    alert(bookData.message || "Failed to fetch books");
                }

                if (studentResponse.ok) {
                    setStudents(studentData.students);
                } else {
                    alert(studentData.message || "Failed to fetch students");
                }

            } catch (error) {

                console.log(error);
                alert("Unable to connect to server");

            } finally {

                setLoading(false);

            }
        };

        fetchDashboardData();

    }, []);

    const issuedBooks = books.filter(
        (book) => book.status?.toLowerCase() === "issued"
    );

    const availableBooks = books.filter(
        (book) => book.status?.toLowerCase() === "available"
    );

    const recentBooks = books.slice(-5).reverse();
    const recentStudents = students.slice(-5).reverse();

    const bookStatusData = [
        {
            name: "Available",
            value: availableBooks.length,
        },
        {
            name: "Issued",
            value: issuedBooks.length,
        },
    ];

    const availablePercentage =
        books.length > 0
            ? Math.round((availableBooks.length / books.length) * 100)
            : 0;

    if (loading) {
        return (
            <div className="dashboard-loading">
                Loading dashboard...
            </div>
        );
    }

    return (
        <div className="dashboard-page">

            <div className="dashboard-header">
                <div>
                    <h1 className="dashboard-title">
                        Welcome to Dashboard
                        <FaHandSparkles className="wave-icon" />
                    </h1>

                    <p className="dashboard-subtitle">
                        Here's an overview of your library management system.
                    </p>
                </div>
            </div>

            {/* Summary Cards */}

            <div className="cards-dash">

                <div className="card blue-card">
                    <div className="card-top">
                        <div className="card-icon blue">
                            <FaBook />
                        </div>

                        <span className="card-label">
                            Library
                        </span>
                    </div>

                    <h3>Total Books</h3>

                    <h2>{books.length}</h2>
                </div>

                <div className="card green-card">
                    <div className="card-top">
                        <div className="card-icon green">
                            <FaUserGraduate />
                        </div>

                        <span className="card-label">
                            Registered
                        </span>
                    </div>

                    <h3>Total Students</h3>

                    <h2>{students.length}</h2>
                </div>

                <div className="card orange-card">
                    <div className="card-top">
                        <div className="card-icon orange">
                            <FaBookReader />
                        </div>

                        <span className="card-label">
                            Currently
                        </span>
                    </div>

                    <h3>Issued Books</h3>

                    <h2>{issuedBooks.length}</h2>
                </div>

                <div className="card purple-card">
                    <div className="card-top">
                        <div className="card-icon purple">
                            <FaCheckCircle />
                        </div>

                        <span className="card-label">
                            In Library
                        </span>
                    </div>

                    <h3>Available Books</h3>

                    <h2>{availableBooks.length}</h2>
                </div>

            </div>

            {/* Overview */}

            <div className="dashboard-section-heading">
                <h2>Library Overview</h2>
                <p>Current book availability and recent activity</p>
            </div>

            <div className="overview-grid">

                {/* Donut */}

                <div className="overview-card availability-card">

                    <div className="overview-card-header">
                        <div>
                            <h3>Book Availability</h3>
                            <p>Current library status</p>
                        </div>

                        <div className="availability-icon">
                            <FaCheckCircle />
                        </div>
                    </div>

                    <div className="donut-container">

                        <div className="donut-chart">

                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                            >
                                <PieChart>

                                    <Pie
                                        data={bookStatusData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={72}
                                        outerRadius={100}
                                        paddingAngle={4}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        <Cell fill="#635BFF" />
                                        <Cell fill="#E879F9" />
                                    </Pie>

                                    <Tooltip />

                                </PieChart>
                            </ResponsiveContainer>

                            <div className="donut-center">
                                <h2>{availablePercentage}%</h2>
                                <p>Available</p>
                            </div>

                        </div>

                    </div>

                    <div className="availability-legend">

                        <div className="legend-item">
                            <span className="legend-dot available-dot"></span>
                            <span>Available</span>
                            <strong>{availableBooks.length}</strong>
                        </div>

                        <div className="legend-item">
                            <span className="legend-dot issued-dot"></span>
                            <span>Issued</span>
                            <strong>{issuedBooks.length}</strong>
                        </div>

                    </div>

                </div>

                {/* Recent Books */}

                <div className="overview-card recent-card">

                    <div className="overview-card-header">

                        <div>
                            <h3>Recent Books</h3>
                            <p>Recently added books</p>
                        </div>

                        <div className="small-card-icon">
                            <FaBook />
                        </div>

                    </div>

                    <div className="recent-table-wrapper">

                        <table className="dashboard-table">

                            <thead>
                                <tr>
                                    <th>Book</th>
                                    <th>Author</th>
                                    <th>Status</th>
                                </tr>
                            </thead>

                            <tbody>

                                {recentBooks.length > 0 ? (

                                    recentBooks.map((book) => (

                                        <tr key={book._id}>

                                            <td className="book-name">
                                                {book.title}
                                            </td>

                                            <td>
                                                {book.author}
                                            </td>

                                            <td>
                                                <span
                                                    className={`dashboard-status ${
                                                        book.status?.toLowerCase() === "issued"
                                                            ? "status-issued"
                                                            : "status-available"
                                                    }`}
                                                >
                                                    {book.status}
                                                </span>
                                            </td>

                                        </tr>

                                    ))

                                ) : (

                                    <tr>
                                        <td colSpan="3" className="empty-row">
                                            No books found
                                        </td>
                                    </tr>

                                )}

                            </tbody>

                        </table>

                    </div>

                </div>

            </div>

            {/* Recent Students */}

            <div className="dashboard-section-heading students-heading">
                <h2>Recent Students</h2>
                <p>Recently registered students</p>
            </div>

            <div className="overview-card students-card">

                <div className="recent-table-wrapper">

                    <table className="dashboard-table students-table">

                        <thead>
                            <tr>
                                <th>Student Name</th>
                                <th>Reg. No</th>
                                <th>Department</th>
                            </tr>
                        </thead>

                        <tbody>

                            {recentStudents.length > 0 ? (

                                recentStudents.map((student) => (

                                    <tr key={student._id}>

                                        <td className="student-name">
                                            {student.name}
                                        </td>

                                        <td>
                                            {student.regNo}
                                        </td>

                                        <td>
                                            {student.department}
                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>
                                    <td colSpan="3" className="empty-row">
                                        No students found
                                    </td>
                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>
    );
}

export default Dashboard;
