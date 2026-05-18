import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAdmin } = useAuth();

  console.log("ProtectedRoute: Checking access...", { isAdmin });

  if (!isAdmin) {
    // If not admin, cleanly redirect to home
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
