import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../css/issue.css";

function Issue() {

    const navigate = useNavigate();

    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    useEffect(() => {

        const fetchIssues = async () => {

            try {

                const response = await fetch(
                    "http://library-management-system-9ds.onrender.com/api/issue"
                );

                const data = await response.json();

                if (response.ok) {

                    setIssues(data.issues);

                } else {

                    alert(
                        data.message ||
                        "Failed to fetch issue records"
                    );

                }

            } catch (error) {

                console.log(error);

                alert("Unable to connect to server");

            } finally {

                setLoading(false);

            }

        };

        fetchIssues();

    }, []);

    const book = () => {
        navigate("/issue");
    };

    const bookr = () => {
        navigate("/return");
    };
    
   const filteredIssues = issues.filter((issue) => {

    const search = searchText.toLowerCase();

    const studentName =
        issue.studentId?.name?.toLowerCase() || "";

    const regNo =
        issue.studentId?.regNo?.toLowerCase() || "";

    const bookTitle =
        issue.bookId?.title?.toLowerCase() || "";

    const matchesSearch =
        studentName.includes(search) ||
        regNo.includes(search) ||
        bookTitle.includes(search);

    const matchesStatus =
        statusFilter === "All" ||
        issue.status?.toLowerCase() === statusFilter.toLowerCase();

    return matchesSearch && matchesStatus;
});



    return (

        <div className="records-page">

            <div className="records-header">

                <div>
                    <h1>Issue & Return</h1>
                    <p>Manage all book issue and return records</p>
                </div>

                <div className="records-actions">

                    <button
                        className="issue-btn"
                        onClick={book}
                    >
                        Issue Book
                    </button>

                    <button
                        className="return-btn"
                        onClick={bookr}
                    >
                        Return Book
                    </button>

                </div>

            </div>

            <div className="records-card">

               <div className="records-title">

    <h2>Book Issue Records</h2>

    <div className="records-search-area">

        <input
            type="text"
            placeholder="Search student, register no or book..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
        />

        <span>
            {filteredIssues.length} Records
        </span>

    </div>

    <select
    value={statusFilter}
    onChange={(e) => setStatusFilter(e.target.value)}
>
    <option value="All">All Status</option>
    <option value="Issued">Issued</option>
    <option value="Returned">Returned</option>
</select>

</div>

                {loading ? (

                    <div className="records-message">
                        Loading records...
                    </div>

                ) : issues.length === 0 ? (

                    <div className="records-message">
                        No issue records found.
                    </div>

                ) : (

                    <div className="records-table-wrapper">

                        <table className="records-table">

                            <thead>

                                <tr>

                                    <th>Student</th>
                                    <th>Reg. No</th>
                                    <th>Book</th>
                                    <th>Issue Date</th>
                                    <th>Due Date</th>
                                    <th>Status</th>

                                </tr>

                            </thead>

                            <tbody>

                                {filteredIssues.map((issue) => (

                                    <tr key={issue._id}>

                                        <td className="student-name">
                                            {issue.studentId?.name || "-"}
                                        </td>

                                        <td>
                                            {issue.studentId?.regNo || "-"}
                                        </td>

                                        <td>
                                            {issue.bookId?.title || "-"}
                                        </td>

                                        <td>
                                            {issue.issueDate
                                                ? new Date(
                                                    issue.issueDate
                                                ).toLocaleDateString()
                                                : "-"}
                                        </td>
                                        
                                        <td>
                                            {issue.dueDate
                                                ? new Date(
                                                    issue.dueDate
                                                ).toLocaleDateString()
                                                : "-"}
                                        </td>

                                        <td>

                                            <span
                                                className={
                                                    issue.status?.toLowerCase() ===
                                                    "returned"
                                                        ? "status-badge returned"
                                                        : "status-badge issued"
                                                }
                                            >
                                                {issue.status}
                                            </span>

                                        </td>

                                    </tr>

                                ))}

                            </tbody>

                        </table>

                    </div>

                )}

            </div>

        </div>

    );
}

export default Issue;