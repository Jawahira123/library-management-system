import Sidebar from "../components/sidebar";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import "../css/layout.css";

function Layout() {
    return (
        <div className="layout">

            <Sidebar />

            <div className="main-content">

                <Navbar />

                <div className="page-content">
                    <Outlet />
                </div>

            </div>

        </div>
    );
}

export default Layout;
