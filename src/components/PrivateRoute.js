import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext'; // Import AuthContext to check if user is authenticated

const PrivateRoute = ({ children }) => {
    const { isAuthenticated } = useAuth(); // Check if the user is authenticated

    return isAuthenticated ? children : <Navigate to="/login" />; // Redirect to login if not authenticated
};

export default PrivateRoute;
