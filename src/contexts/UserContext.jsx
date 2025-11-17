import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { UserContext } from "./UserContext";

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const clearUser = () => {
    setUser(null);
    setError(null);
    setIsLoading(false);
  };

  const fetchUser = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      
      if (!token) {
        clearUser();
        // No redirigir aquí, dejar que ProtectedRoute maneje la autenticación
        return;
      }

      const response = await api.get("/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data?.user) {
        // Establecer el nuevo usuario
        setUser(response.data.user);
        setError(null);
      }
    } catch (err) {
      console.error("Error obteniendo datos del usuario:", err);
      setError(err);
      setUser(null);
      
      // Si hay error de autenticación, limpiar token pero no redirigir
      // ProtectedRoute se encargará de la redirección
      if (err.response?.status === 401 || err.response?.status === 403) {
        clearUser();
        localStorage.removeItem("token");
        localStorage.removeItem("user");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const refreshUser = async () => {
    try {
      setIsLoading(true);
      const token = localStorage.getItem("token");
      if (!token) {
        clearUser();
        return;
      }

      const response = await api.get("/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data?.user) {
        // Establecer el nuevo usuario directamente
        setUser(response.data.user);
        setError(null);
      }
    } catch (err) {
      console.error("Error refrescando datos del usuario:", err);
      setError(err);
      clearUser();
      
      if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUser();
    } else {
      clearUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Escuchar cambios en localStorage para detectar logout/login
  useEffect(() => {
    const handleTokenChange = () => {
      const token = localStorage.getItem("token");
      if (token) {
        // Token fue agregado o cambiado (login)
        fetchUser();
      } else {
        // Token fue removido (logout)
        clearUser();
      }
    };

    const handleStorageChange = (e) => {
      // Evento storage solo funciona entre pestañas diferentes
      if (e.key === 'token') {
        handleTokenChange();
      }
    };

    // Escuchar eventos de storage (cuando se cambia desde otra pestaña)
    window.addEventListener('storage', handleStorageChange);
    
    // Escuchar cambios locales usando un evento personalizado
    window.addEventListener('tokenChange', handleTokenChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('tokenChange', handleTokenChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserContext.Provider value={{ user, isLoading, error, refreshUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};
