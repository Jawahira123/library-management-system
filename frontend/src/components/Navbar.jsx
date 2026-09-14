import { Link } from "react-router-dom";
import "../css/Navbar.css";
import { useAuth } from "../context/AuthContext";

function Navbar() {

    const { adminLoggedIn, adminUsername } = useAuth();

    return (
        <div className="nav-body">

            {adminLoggedIn ? (
                <Link to="/profile">
                    {adminUsername}
                </Link>
            ) : (
                <Link to="/Login">
                    Login
                </Link>
            )}

        </div>
    );
}

export default Navbar;