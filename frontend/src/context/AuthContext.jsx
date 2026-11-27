
import React, {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";

import apiClient from "../services/api";

const AuthContext = createContext(null);

function mapRole(role) {
    if (role === "candidate") return "participant";
    return role;
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const restoreSession = async () => {
            const token = localStorage.getItem("hackguard_token");

            if (!token) {
                setLoading(false);
                return;
            }

            try {
                const response = await apiClient.get("/auth/me");

                setUser(response.user);
            } catch (error) {
                localStorage.removeItem("hackguard_token");
                localStorage.removeItem("hackguard_role");
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        restoreSession();
    }, []);

    const login = async (email, password) => {
        const response = await apiClient.post("/auth/login", {
            email,
            password
        });

        localStorage.setItem(
            "hackguard_token",
            response.token
        );

        setUser(response.user);

        return response.user;
    };

    const register = async (formData) => {
        const response = await apiClient.post(
            "/auth/signup",
            formData
        );

        localStorage.setItem(
            "hackguard_token",
            response.token
        );

        setUser(response.user);

        return response.user;
    };

    const logout = () => {
        localStorage.removeItem("hackguard_token");
        localStorage.removeItem("hackguard_role");
        localStorage.removeItem("hackguard_active_hackathon");

        setUser(null);
    };

    const role = mapRole(user?.role);

    return (
        <AuthContext.Provider
            value={{
                user,
                role,
                login,
                register,
                logout,
                loading,
                isAuthenticated: Boolean(user)
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used within AuthProvider"
        );
    }

    return context;
}
