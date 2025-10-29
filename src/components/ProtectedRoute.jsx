import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import api from '../api/axios.js';

const ProtectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setIsAuthenticated(false);
        setIsLoading(false);
        return;
      }

      // Verify token with backend using axios
      try {
        await api.get('/auth/verify', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        
        setIsAuthenticated(true);
      } catch (error) {
        // Token is invalid or expired
        console.error('❌ Error verifying token:', error);
        localStorage.removeItem('token');
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (isLoading) {
    // Show loading state while checking authentication
    return (
      <div className="w-screen h-screen bg-black flex items-center justify-center">
        <div className="text-white text-xl">Verificando...</div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Render protected content if authenticated
  return children;
};

export default ProtectedRoute;
