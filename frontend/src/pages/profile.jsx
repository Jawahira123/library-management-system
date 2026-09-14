
import { useAuth } from "../context/AuthContext";
import "../css/profile.css";
import { FaUserCircle, FaUserShield } from "react-icons/fa";
import { MdEmail, MdLogout } from "react-icons/md";

function Profile() {

    const { adminUsername, logout } = useAuth();

    return (

        <div className="profile-page">

            <div className="profile-card">

                {/* Profile Header */}
                <div className="profile-header">

                    <div className="profile-icon">
                        <FaUserCircle />
                    </div>

                    <div className="profile-title">
                        <h1>Admin Profile</h1>
                        <p>Library Management System</p>
                    </div>

                </div>


                {/* Admin Name */}
                <div className="admin-info">

                    <h2>Administrator</h2>

                    <div className="active-status">
                        <span></span>
                        Active
                    </div>

                </div>


                {/* Account Information */}
                <div className="account-section">

                    <h3>Account Information</h3>

                    <div className="info-item">

                        <div className="info-icon">
                            <MdEmail />
                        </div>

                        <div>
                            <label>Username</label>
                            <p>{adminUsername}</p>
                        </div>

                    </div>


                    <div className="info-item">

                        <div className="info-icon">
                            <FaUserShield />
                        </div>

                        <div>
                            <label>Role</label>
                            <p>Administrator</p>
                        </div>

                    </div>

                </div>


                {/* Logout */}
                <button
                    className="logout-btn"
                    onClick={logout}
                >
                    <MdLogout />
                    Logout
                </button>

            </div>

        </div>
    );
}

export default Profile;
