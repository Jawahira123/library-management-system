
import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [adminLoggedIn, setAdminLoggedIn] = useState(
        localStorage.getItem("adminLoggedIn") === "true"
    );

    const [adminUsername, setAdminUsername] = useState(
        localStorage.getItem("adminUsername") || ""
    );

    const login = (username) => {

        localStorage.setItem("adminLoggedIn", "true");
        localStorage.setItem("adminUsername", username);

        setAdminLoggedIn(true);
        setAdminUsername(username);
    };

    const logout = () => {

        localStorage.removeItem("adminLoggedIn");
        localStorage.removeItem("adminUsername");

        setAdminLoggedIn(false);
        setAdminUsername("");
    };

    return (
        <AuthContext.Provider
            value={{
                adminLoggedIn,
                adminUsername,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
