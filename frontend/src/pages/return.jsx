import "../css/return.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Return() {

    const navigate = useNavigate();

    const [issues, setIssues] = useState([]);
    const [selectedIssue, setSelectedIssue] = useState("");
    const [returnDate, setReturnDate] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchIssues = async () => {

            try {

                const response = await fetch(
                    "http://library-management-system-9ds.onrender.com/api/issue"
                );

                const data = await response.json();

                if (response.ok) {

                    const issuedRecords = data.issues.filter(
                        (issue) =>
                            issue.status?.toLowerCase() === "issued"
                    );

                    setIssues(issuedRecords);

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

    const selectedRecord = issues.find(
        (issue) => issue._id === selectedIssue
    );

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!selectedRecord) {

            alert("Please select a book");
            return;

        }
        if (new Date(returnDate) < new Date(selectedRecord.issueDate)) {
    alert("Return date cannot be earlier than issue date");
    return;
}

        try {

            const response = await fetch(
                `http://library-management-system-9ds.onrender.com/api/issue/${selectedIssue}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                   body: JSON.stringify({
                     issueDate: selectedRecord.issueDate,
                      dueDate: selectedRecord.dueDate,
                     returnDate: returnDate,
                     status: "Returned"
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {

                alert("Book returned successfully");
                navigate("/issueReturn");

            } else {

                alert(
                    data.message ||
                    "Failed to return book"
                );

            }

        } catch (error) {

            console.log(error);
            alert("Unable to connect to server");

        }

    };

    if (loading) {

        return (
            <div className="return-loading">
                Loading issued books...
            </div>
        );

    }

    return (

        <div className="return-page">

            <div className="return-header">

                <h1>Return Book</h1>

                <p>Record a book returned by a student</p>

            </div>

            <div className="return-form-area">

                <form
                    className="return-form"
                    onSubmit={handleSubmit}
                >

                    <div className="return-field">

                        <label>Student / Book</label>

                        <select
                            value={selectedIssue}
                            onChange={(e) =>
                                setSelectedIssue(e.target.value)
                            }
                            required
                        >

                            <option value="">
                                Select issued book
                            </option>

                            {issues.map((issue) => (

                                <option
                                    key={issue._id}
                                    value={issue._id}
                                >
                                    {issue.studentId?.name} -{" "}
                                    {issue.bookId?.title}
                                </option>

                            ))}

                        </select>

                    </div>

                    <div className="return-field">

                        <label>Student Name</label>

                        <input
                            type="text"
                            value={
                                selectedRecord?.studentId?.name || ""
                            }
                            readOnly
                        />

                    </div>

                    <div className="return-field">

                        <label>Reg No</label>

                        <input
                            type="text"
                            value={
                                selectedRecord?.studentId?.regNo || ""
                            }
                            readOnly
                        />

                    </div>

                    <div className="return-field">

                        <label>Book Name</label>

                        <input
                            type="text"
                            value={
                                selectedRecord?.bookId?.title || ""
                            }
                            readOnly
                        />

                    </div>

                    <div className="return-field">

                        <label>Issue Date</label>

                        <input
                            type="date"
                            value={
                                selectedRecord?.issueDate
                                    ? new Date(
                                        selectedRecord.issueDate
                                    )
                                        .toISOString()
                                        .split("T")[0]
                                    : ""
                            }
                            readOnly
                        />

                    </div>

                    <div className="return-field">

                        <label>Due Date</label>

                        <input
                            type="date"
                            value={
                                 selectedRecord?.dueDate
                                    ? new Date(
                                      selectedRecord.dueDate
                                     )
                                    .toISOString()
                                    .split("T")[0]
                                    : ""
                                    }
                            readOnly
                        />

                    </div>

                    <div className="return-field">

                        <label>Return Date</label>

                        <input
                            type="date"
                            value={returnDate}
                            onChange={(e) =>
                                setReturnDate(e.target.value)
                            }
                            required
                        />

                    </div>

                    <div className="return-field">

                        <label>Fine</label>

                        <input
                            type="text"
                            placeholder="Rs."
                        />

                    </div>

                    <div className="return-actions">

                        <button
                            type="submit"
                            className="return-book-btn"
                        >
                            Return Book
                        </button>

                        <button
                            type="button"
                            className="cancel-return-btn"
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

export default Return;