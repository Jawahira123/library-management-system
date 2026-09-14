import { useState } from "react";
import "../css/addbook.css";

function Addbook() {

    const [formData, setFormData] = useState({
        title: "",
        author: "",
        category: ""
    });

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
                "https://library-management-system-r9ds.onrender.com/api/library",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        title: formData.title,
                        author: formData.author,
                        category: formData.category,
                        status: "available"
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {
                alert("Book added successfully");

                setFormData({
                    title: "",
                    author: "",
                    category: ""
                });
            } else {
                alert(data.message || "Failed to add book");
            }

        } catch (error) {
            console.log(error);
            alert("Unable to connect to server");
        }
    };

    return (
        <div className="book-details">

            <div className="book-page-header">
                <h1>Add Book</h1>
                <p>Enter all details</p>
            </div>

            <div className="book-form-area">

                <form className="data" onSubmit={handleSubmit}>

                    <div className="book-field">
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

                    <div className="book-field">
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

                    <div className="book-field">
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

                    <button type="submit">
                        Save
                    </button>

                </form>

            </div>

        </div>
    );
}

export default Addbook;
