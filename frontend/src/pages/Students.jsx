import "../css/student.css";
import { FaSearch } from "react-icons/fa";
import { SearchContext } from "../context/SearchContext";
import { useContext, useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function Students() {

    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    const Navigate = useNavigate();

    const { studSearch, setstudSearch } = useContext(SearchContext);


    // Get students from MongoDB
    useEffect(() => {

        const fetchStudents = async () => {

            try {

                const response = await fetch(
                    "http://library-management-system-9ds.onrender.com/api/student"
                );

                const data = await response.json();

                if (response.ok) {

                    setStudents(data.students);

                } else {

                    alert(data.message || "Failed to fetch students");

                }

            } catch (error) {

                console.log(error);

                alert("Unable to connect to server");

            } finally {

                setLoading(false);

            }

        };

        fetchStudents();

    }, []);


    // Add student
    const addstd = () => {

        Navigate("/addstudents");

    };


    // Search students
    const stud = students.filter((s) =>
        s.name.toLowerCase().includes(studSearch.toLowerCase())
    );


    // Edit student
    const edit = (id) => {

        Navigate(`/editstd/${id}`);

    };


    // Delete student
    const deleteStudent = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this student?"
        );

        if (!confirmDelete) {
            return;
        }


        try {

            const response = await fetch(
                `http://library-management-system-9ds.onrender.com/api/student/${id}`,
                {
                    method: "DELETE"
                }
            );

            const data = await response.json();


            if (response.ok) {

                alert(data.message);

                setStudents((currentStudents) =>
                    currentStudents.filter(
                        (student) => student._id !== id
                    )
                );

            } else {

                alert(
                    data.message || "Failed to delete student"
                );

            }

        } catch (error) {

            console.log(error);

            alert("Unable to connect to server");

        }

    };


    return (

        <div className="std-body">

            <div className="std-head">

                <h2>Student Details</h2>

            </div>


            <div className="std-button">

                <FaSearch className="std-icon" />

                <input
                    type="text"
                    placeholder="search by name"
                    value={studSearch}
                    onChange={(e) =>
                        setstudSearch(e.target.value)
                    }
                />

                <button onClick={addstd}>
                    + Add student
                </button>

            </div>


            <div className="std-table">

                {loading ? (

                    <p>Loading students...</p>

                ) : (

                    <table>

                        <thead>

                            <tr>
                                <td>Name</td>
                                <td>Reg.No</td>
                                <td>Department</td>
                                <td>Year</td>
                                <td>Gender</td>
                                <td>E-mail</td>
                                <td>Ph.No</td>
                                <th>Actions</th>
                            </tr>

                        </thead>


                        <tbody>

                            {stud.length > 0 ? (

                                stud.map((std) => (

                                    <tr key={std._id}>

                                        <td>{std.name}</td>

                                        <td>{std.regNo}</td>

                                        <td>{std.department}</td>

                                        <td>{std.year}</td>

                                        <td>{std.gender}</td>

                                        <td>{std.email}</td>

                                        <td>{std.phone}</td>


                                        <td className="actions">

                                            <button
                                                className="edit-btn"
                                                onClick={() =>
                                                    edit(std._id)
                                                }
                                            >
                                                <CiEdit />
                                            </button>


                                            <button
                                                className="delete-btn"
                                                onClick={() =>
                                                    deleteStudent(
                                                        std._id
                                                    )
                                                }
                                            >
                                                <MdOutlineDeleteOutline />
                                            </button>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td colSpan="8">
                                        No students found
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

export default Students;