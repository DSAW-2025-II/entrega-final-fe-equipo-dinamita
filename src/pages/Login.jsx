import React from "react";
import Colors from '../assets/Colors';
import WillyHappy from '../assets/WillyHappy.svg';
import Button from '../components/Button';
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen bg-black flex flex-col items-center justify-center text-white font-inter overflow-hidden">
      {/* Logo */}
      <div className="flex flex-col items-center mb-6 lg:mb-8">
        <div className="flex items-center gap-2 lg:gap-3">
          <img
            src={WillyHappy}
            alt="logo"
            className="w-10 h-10 lg:w-20 lg:h-20"
          />
          <h1 className="text-2xl lg:text-4xl font-outfit">WHEELS</h1>
        </div>
        <h2 className="text-2xl lg:text-[40px] font-catamaran leading-none mt-2 lg:mt-4">
          Sabana
        </h2>
      </div>

      {/* Título */}
      <div className="bg-[#FEF801] text-[#1B1B1B] font-bold text-lg lg:text-3xl py-2 px-5 lg:px-6 rounded-full mb-6 lg:mb-3">
        Inicio de sesión
      </div>

      {/* Contenedor formulario */}
      <div className="bg-[#D2D1BE] w-[280px] lg:w-[410px] h-[180px] lg:h-[250px] rounded-[18px] flex flex-col items-center justify-center gap-4 lg:gap-6 shadow-md p-2 lg:p-4">
        <input
          type="email"
          placeholder="correo institucional"
          className="w-[240px] lg:w-[360px] h-[38px] lg:h-[60px] rounded-full px-4 lg:px-6 text-[14px] lg:text-[20px] text-[#A2A18A] placeholder-[#A2A18A] bg-white shadow-md focus:outline-none"
        />
        <input
          type="password"
          placeholder="contraseña"
          className="w-[240px] lg:w-[360px] h-[38px] lg:h-[60px] rounded-full px-4 lg:px-6 text-[14px] lg:text-[20px] text-[#A2A18A] placeholder-[#A2A18A] bg-white shadow-md focus:outline-none"
        />
        <p
          className="text-[12px] lg:text-[18px] text-white text-center mt-1"
          style={{ textShadow: '0 0 6px rgba(0,0,0,0.8)' }}>
          ¿No tienes cuenta?{" "}
          <button
            className="text-[#FEF801] hover:underline cursor-pointer"
            onClick={( )=> navigate("/register")}
            style={{ textShadow: '0 0 6px rgba(0,0,0,0.8)' }}>
            Regístrate
            
          </button>
        </p>

      </div>

      {/* Botón */}
      <Button
        variant="primary"
        size="medium"
        className="mt-2"
        onClick={() => console.log('Login clicked')}
      >
        Ingresar
      </Button>
    </div>
  );
}

export default Login;
