import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Adjust path accordingly

const AdminRoute = ({ children }) => {
	const { userCurrent } = useAuth();

	// Checking if the user is an admin
	return userCurrent?.role === 'admin' ? children : <Navigate to="/" />;
};

export default AdminRoute;