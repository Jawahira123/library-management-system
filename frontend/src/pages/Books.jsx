import { useContext, useEffect, useState } from "react";
import "../css/Books.css";
import { FaSearch, FaEdit, FaTrash } from "react-icons/fa";
import { SearchContext } from "../context/SearchContext.jsx";
import { useNavigate } from "react-router-dom";

function Books() {

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const { searchText, setSearchText } = useContext(SearchContext);

  const navigate = useNavigate();


  // Fetch books from MongoDB
  useEffect(() => {

    const fetchBooks = async () => {

      try {

        const response = await fetch(
          "http://library-management-system-9ds.onrender.com/api/library"
        );

        const data = await response.json();

        if (response.ok) {

          setBooks(data.books);

        } else {

          alert(data.message || "Failed to fetch books");

        }

      } catch (error) {

        console.log(error);

        alert("Unable to connect to server");

      } finally {

        setLoading(false);

      }

    };

    fetchBooks();

  }, []);


  // Search books
  const filteredBooks = books.filter((book) =>
    book.title
      .toLowerCase()
      .includes(searchText.toLowerCase())
  );


  // Navigate to Add Book
  const addbook = () => {

    navigate("/addbook");

  };


  // Navigate to Edit Book
  const handleEdit = (id) => {

    navigate(`/editbook/${id}`);

  };


  // Delete Book
  const handleDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Are you sure you want to delete this book?"
    );

    if (!confirmDelete) {
      return;
    }


    try {

      const response = await fetch(
        `http://library-management-system-9ds.onrender.com/api/library/${id}`,
        {
          method: "DELETE"
        }
      );


      const data = await response.json();


      if (response.ok) {

        alert(data.message);

        // Remove deleted book from UI
        setBooks((currentBooks) =>
          currentBooks.filter(
            (book) => book._id !== id
          )
        );

      } else {

        alert(
          data.message || "Failed to delete book"
        );

      }

    } catch (error) {

      console.log(error);

      alert("Unable to connect to server");

    }

  };


  return (

    <div className="books-page">


      {/* Header */}

      <div className="books-header">

        <h2>Books</h2>


        <div className="books-actions">


          {/* Search */}

          <div className="search-box">

            <FaSearch className="search-icon" />

            <input
              type="text"
              placeholder="Search books..."
              value={searchText}
              onChange={(e) =>
                setSearchText(e.target.value)
              }
            />

          </div>


          {/* Add Book */}

          <button
            className="add-book-btn"
            onClick={addbook}
          >
            + Add Book
          </button>


        </div>

      </div>


      {/* Books Table */}

      <div className="table-container">


        {loading ? (

          <p>Loading books...</p>

        ) : (

          <table>


            <thead>

              <tr>

                <th>S.No</th>

                <th>Book Title</th>

                <th>Author</th>

                <th>Category</th>

                <th>Status</th>

                <th>Actions</th>

              </tr>

            </thead>


            <tbody>


              {filteredBooks.length > 0 ? (

                 filteredBooks.map((book, index) => (

                  <tr key={book._id}>


                    {/* Serial Number */}

                    <td>
                      {index + 1}
                    </td>


                    {/* Book Title */}

                    <td>
                      {book.title}
                    </td>


                    {/* Author */}

                    <td>
                      {book.author}
                    </td>


                    {/* Category */}

                    <td>
                      {book.category}
                    </td>


                    {/* Status */}

                    <td>

                      <span
                        className={
                          book.status.toLowerCase() ===
                          "available"
                            ? "status available"
                            : "status issued"
                        }
                      >
                        {book.status}
                      </span>

                    </td>


                    {/* Actions */}

                    <td className="book-actions">


                      {/* Edit */}

                      <button
                        className="edit-btn"
                        onClick={() =>
                          handleEdit(book._id)
                        }
                        title="Edit Book"
                      >
                        <FaEdit />
                      </button>


                      {/* Delete */}

                      <button
                        className="delete-btn"
                        onClick={() =>
                          handleDelete(book._id)
                        }
                        title="Delete Book"
                      >
                        <FaTrash />
                      </button>


                    </td>


                  </tr>

                ))

              ) : (

                <tr>

                  <td colSpan="6">
                    No books found
                  </td>

                </tr>

              )}


            </tbody>


          </table>

        )}


      </div>


    </div>

  );

}

export default Books;