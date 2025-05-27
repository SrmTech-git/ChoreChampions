import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUserContext } from './UserContext';

function ProtectedRoute({ children }) {
    const { isAuthenticated, isLoading } = useUserContext();
    const location = useLocation();

    // Show loading spinner while checking authentication
    if (isLoading) {
        return (
            <div className="loading-container" style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '200px'
            }}>
                <div className="loading-spinner">Loading...</div>
            </div>
        );
    }

    // If not authenticated, redirect to login page
    // Pass current location so user can be redirected back after login
    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // If authenticated, render the protected component
    return children;
}

export default ProtectedRoute;