import { Link } from "react-router-dom";
import "../css/Sidebar.css";
import { GiOpenBook } from "react-icons/gi";
import { RxDashboard } from "react-icons/rx";
import { PiNotebookBold } from "react-icons/pi";
import { PiStudentFill } from "react-icons/pi";
import { RiLogoutCircleLine } from "react-icons/ri";
import { LuBookOpenCheck } from "react-icons/lu";

function Sidebar()
{
    return(
        <div className="sidebar-body">
             
            <div className="header">
           
            <h3> <GiOpenBook />Library</h3>
            <p>Management System</p>
            </div>
            <div className="sidebar-container">
                <Link to="/Dashboard"><RxDashboard /> Dashboard</Link>
                <Link to="/Books"><PiNotebookBold />  Books</Link>
                <Link to="/Students"><PiStudentFill />  Students</Link>
                <Link to="/issueReturn"><LuBookOpenCheck />  
Issue/Return</Link>
               
            </div>
        </div>
    )
}

export default Sidebar;