import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function ProtectedRoute() {

    const { adminLoggedIn } = useAuth();

    if (!adminLoggedIn) {
        return <Navigate to="/Login" replace />;
    }

    return <Outlet />;
}

export default ProtectedRoute;