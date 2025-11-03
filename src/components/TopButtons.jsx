import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeLogo from "../assets/HomeLogo.svg";
import NavLogo from "../assets/NavLogo.svg";
import { useUser } from "../hooks/useUser";
import api from "../api/axios.js";

export default function TopButtons() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();
  const { user, refreshUser, clearUser } = useUser();
  const currentRole = user?.currentRole || "passenger";
  const isDriver = currentRole === "driver";

  const handleBePassenger = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await api.patch(
        "/users/current-role",
        { currentRole: "passenger" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setIsNavOpen(false);
        await refreshUser();
        // Pequeño delay para asegurar que el estado se actualice antes de navegar
        setTimeout(() => {
          navigate("/home");
        }, 100);
      }
    } catch (error) {
      console.error("Error actualizando rol:", error);
    }
  };

  const handleBeDriver = async () => {
    // Verificar que el usuario tenga el rol 'driver' disponible
    if (!user?.roles?.includes("driver")) {
      setIsNavOpen(false);
      navigate("/be-driver");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await api.patch(
        "/users/current-role",
        { currentRole: "driver" },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setIsNavOpen(false);
        await refreshUser();
        // Pequeño delay para asegurar que el estado se actualice antes de navegar
        setTimeout(() => {
          navigate("/home");
        }, 100);
      }
    } catch (error) {
      console.error("Error actualizando rol:", error);
    }
  };

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      
      // Call the logout endpoint with the JWT token in the Authorization header
      if (token) {
        try {
          await api.post("/auth/logout", {}, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        } catch (error) {
          // Continuar con el logout aunque falle el endpoint
          console.error("Error en endpoint de logout:", error);
        }
      }
      
      // Limpiar el estado del usuario inmediatamente
      clearUser();
      
      // Remove the JWT token and user from localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      
      // Disparar evento para sincronizar otras pestañas
      window.dispatchEvent(new Event('tokenChange'));
      
      // Redirect to login page
      navigate("/login");
      
      // Close the navigation menu
      setIsNavOpen(false);
    } catch (error) {
      console.error("❌ Logout error:", error);
      
      // Even if there's an error, clean everything and redirect
      clearUser();
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.dispatchEvent(new Event('tokenChange'));
      navigate("/login");
      setIsNavOpen(false);
    }
  };

  return (
    <div className="z-50">
      {/* Overlay oscuro */}
      <div
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          isNavOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setIsNavOpen(false)}
      ></div>

      {/* Panel lateral con los iconos dentro */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[#FFED00] text-black shadow-xl transition-transform duration-500 ease-in-out flex flex-col ${
          isNavOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header del panel (botones dentro del bloque amarillo) */}
        <div className="flex justify-end items-center gap-6 p-6 bg-[#FFED00]">
          {/* Botón home - siempre uno solo */}
          <img
            src={HomeLogo}
            alt="Home"
            className="w-10 h-10 lg:w-12 lg:h-12 cursor-pointer transition-transform duration-200 hover:scale-110 brightness-0"
            onClick={() => {
              navigate("/home");
              setIsNavOpen(false);
            }}
          />
          <img
            src={NavLogo}
            alt="Nav"
            className="w-10 h-10 lg:w-12 lg:h-12 cursor-pointer transition-transform duration-200 hover:scale-110 brightness-0"
            onClick={() => setIsNavOpen(false)}
          />
        </div>

        {/* Contenido del menú - dinámico según el rol, diseño original (fondo amarillo, hover negro) */}
        <ul className="flex flex-col gap-4 px-6 pt-4 font-semibold text-xl text-black">
          <li
            className="hover:bg-black hover:text-yellow-300 p-2 rounded-md cursor-pointer"
            onClick={() => {
              navigate("/profile");
              setIsNavOpen(false);
            }}
          >
            Mi perfil
          </li>
          
          {isDriver ? (
            <>
              <li
                className="hover:bg-black hover:text-yellow-300 p-2 rounded-md cursor-pointer"
                onClick={handleBePassenger}
              >
                Sé pasajero
              </li>
              <li
                className="hover:bg-black hover:text-yellow-300 p-2 rounded-md cursor-pointer"
                onClick={() => {
                  navigate("/my-vehicle");
                  setIsNavOpen(false);
                }}
              >
                Mi vehículo
              </li>
              <li
                className="hover:bg-black hover:text-yellow-300 p-2 rounded-md cursor-pointer"
                onClick={() => {
                  navigate("/my-trips");
                  setIsNavOpen(false);
                }}
              >
                Mis viajes
              </li>
            </>
          ) : (
            <>
              <li
                className="hover:bg-black hover:text-yellow-300 p-2 rounded-md cursor-pointer"
                onClick={() => {
                  navigate("/reservations");
                  setIsNavOpen(false);
                }}
              >
                Mis reservas
              </li>
              <li
                className="hover:bg-black hover:text-yellow-300 p-2 rounded-md cursor-pointer"
                onClick={handleBeDriver}
              >
                Sé conductor
              </li>
            </>
          )}
        </ul>

        {/* Botón de cerrar sesión */}
        <div className="bg-[#FFED00] p-6">
          <button
            onClick={handleLogout}
            className="w-full bg-black text-yellow-300 font-medium text-lg py-3 rounded-3xl hover:bg-gray-900 transition"
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      {/* Botones flotantes cuando el menú está cerrado */}
      {!isNavOpen && (
        <div className="fixed top-6 right-10 flex items-center gap-8">
          <img
            src={HomeLogo}
            alt="Home"
            className="w-10 h-10 lg:w-12 lg:h-12 cursor-pointer transition-transform duration-200 hover:scale-110 hover:opacity-80"
            onClick={() => navigate("/home")}
          />
          <img
            src={NavLogo}
            alt="Nav"
            className="w-10 h-10 lg:w-12 lg:h-12 cursor-pointer transition-transform duration-200 hover:scale-110 hover:opacity-80"
            onClick={() => setIsNavOpen(true)}
          />
        </div>
      )}
    </div>
  );
}
