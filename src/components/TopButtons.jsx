import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeLogo from "../assets/HomeLogo.svg";
import NavLogo from "../assets/NavLogo.svg";

import api from "../api/axios.js";

export default function TopButtons() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem("token");
      
      // Call the logout endpoint with the JWT token in the Authorization header
      await api.post("/auth/logout", {}, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      
      // Remove the JWT token from localStorage
      localStorage.removeItem("token");
      
      // Redirect to login page
      navigate("/login");
      
      // Close the navigation menu
      setIsNavOpen(false);
    } catch (error) {
      console.error("❌ Logout error:", error);
      
      // Even if there's an error, remove the token and redirect
      // This ensures the user can always log out
      localStorage.removeItem("token");
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
        <div className="flex justify-end items-center gap-6 p-6">
          <img
            src={HomeLogo}
            alt="Home"
            className="w-10 h-10 lg:w-12 lg:h-12 cursor-pointer transition-transform duration-200 hover:scale-110 brightness-0"
            onClick={() => navigate("/home")}
          />
          <img
            src={NavLogo}
            alt="Nav"
            className="w-10 h-10 lg:w-12 lg:h-12 cursor-pointer transition-transform duration-200 hover:scale-110 brightness-0"
            onClick={() => setIsNavOpen(false)}
          />
        </div>

        {/* Contenido del menú */}
        <ul className="flex flex-col gap-4 px-6 font-semibold text-xl">
          <li
            className="hover:bg-black hover:text-yellow-300 p-2 rounded-md cursor-pointer"
            onClick={() => navigate("/profile")}
          >
            Tu perfil
          </li>
          <li
            className="hover:bg-black hover:text-yellow-300 p-2 rounded-md cursor-pointer"
            onClick={() => navigate("/reservations")}
          >
            Mis reservas
          </li>
          <li
            className="hover:bg-black hover:text-yellow-300 p-2 rounded-md cursor-pointer"
            onClick={() => navigate("/beDriver")}
          >
            Sé conductor
          </li>
        </ul>

        <button
          onClick={handleLogout}
          className="mt-auto bg-black text-yellow-300 font-medium text-lg py-3 mx-6 mb-6 rounded-3xl hover:bg-gray-900 transition"
        >
          Cerrar sesión
        </button>
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
