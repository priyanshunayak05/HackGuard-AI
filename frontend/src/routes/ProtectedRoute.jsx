
import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ROLE_HOME = {
    admin: "/admin",
    candidate: "/participant",
    participant: "/participant",
    judge: "/judge"
};

export default function ProtectedRoute({ allowedRoles }) {
    const { user, role, loading, isAuthenticated } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Verifying your session...</p>
            </div>
        );
    }

    if (!isAuthenticated || !user) {
        return (
            <Navigate
                to="/login"
                replace
                state={{ from: location }}
            />
        );
    }

    if (!allowedRoles.includes(role)) {
        return (
            <Navigate
                to={ROLE_HOME[role] || "/login"}
                replace
            />
        );
    }

    return <Outlet />;
}
