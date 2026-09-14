import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../css/editbook.css";

function Editbook() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: "",
        author: "",
        category: "",
        status: "available"
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const fetchBook = async () => {

            try {

                const response = await fetch(
                    `http://library-management-system-9ds.onrender.com/api/library/${id}`
                );

                const data = await response.json();

                if (response.ok) {

                    const book = data.library;

                    setFormData({
                        title: book.title,
                        author: book.author,
                        category: book.category,
                        status: book.status
                    });

                } else {

                    alert(data.message || "Book not found");

                }

            } catch (error) {

                console.log(error);
                alert("Unable to connect to server");

            } finally {

                setLoading(false);

            }
        };

        fetchBook();

    }, [id]);

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
                `http://library-management-system-9ds.onrender.com/api/library/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                }
            );

            const data = await response.json();

            if (response.ok) {

                alert("Book updated successfully");
                navigate("/Books");

            } else {

                alert(
                    data.message || "Failed to update book"
                );

            }

        } catch (error) {

            console.log(error);
            alert("Unable to connect to server");

        }

    };

    if (loading) {

        return (
            <div className="editbook-loading">
                Loading book details...
            </div>
        );

    }

    return (

        <div className="editbook-page">

            <div className="editbook-header">
                <h1>Edit Book</h1>
                <p>Update book details</p>
            </div>

            <div className="editbook-form-area">

                <form
                    className="editbook-form"
                    onSubmit={handleSubmit}
                >

                    <div className="editbook-field">

                        <label>Title</label>

                        <input
                            type="text"
                            name="title"
                            placeholder="Enter Book Title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="editbook-field">

                        <label>Author</label>

                        <input
                            type="text"
                            name="author"
                            placeholder="Enter Author Name"
                            value={formData.author}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="editbook-field">

                        <label>Category</label>

                        <input
                            type="text"
                            name="category"
                            placeholder="Enter Category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        />

                    </div>

                    <div className="editbook-actions">

                        <button
                            type="submit"
                            className="update-book-btn"
                        >
                            Update Book
                        </button>

                        <button
                            type="button"
                            className="cancel-book-btn"
                            onClick={() => navigate("/Books")}
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}

export default Editbook;