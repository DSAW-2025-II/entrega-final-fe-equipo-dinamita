import React from "react";
import Colors from '../assets/Colors';
import Button from '../components/Button';

const Login = () => {
  return (
    <div className="w-screen h-screen bg-black flex flex-col items-center justify-center text-white font-inter">
      {/* Logo */}
      <div className="flex flex-col items-center mb-8 md:mb-12">
        <div className="flex items-center gap-3">
          <img
            src="/wheel-disks-icon-logo-isolated-260nw-1921600658.png"
            alt="logo"
            className="w-12 h-12 md:w-24 md:h-24"
          />
          <h1 className="text-3xl md:text-5xl font-outfit">WHEELS</h1>
        </div>
        <h2 className="text-4xl md:text-[100px] font-catamaran leading-none mt-2 md:mt-4">
          Sabana
        </h2>
      </div>

      {/* Título */}
      <div className="bg-[#FEF801] text-[#1B1B1B] font-bold text-xl md:text-5xl py-2 px-8 md:px-10 rounded-full mb-6 md:mb-10">
        Inicio de sesión
      </div>

      {/* Contenedor formulario */}
      <div className="bg-[#D2D1BE] w-[290px] md:w-[609px] h-[160px] md:h-[448px] rounded-[28px] flex flex-col items-center justify-center gap-4 md:gap-6 shadow-md">
        <input
          type="email"
          placeholder="correo institucional"
          className="w-[245px] md:w-[460px] h-[38px] md:h-[70px] rounded-full px-4 md:px-6 text-[16px] md:text-[24px] text-[#A2A18A] placeholder-[#A2A18A] bg-white shadow-md focus:outline-none"
        />
        <input
          type="password"
          placeholder="contraseña"
          className="w-[245px] md:w-[460px] h-[38px] md:h-[70px] rounded-full px-4 md:px-6 text-[16px] md:text-[24px] text-[#A2A18A] placeholder-[#A2A18A] bg-white shadow-md focus:outline-none"
        />
        <p className="text-[14px] md:text-[20px] text-white text-center mt-1">
          ¿No tienes cuenta?{" "}
          <span className="text-[#FEF801] hover:underline cursor-pointer">
            Regístrate
          </span>
        </p>
      </div>

      {/* Botón */}
      <Button 
        variant="primary" 
        size="medium" 
        className="mt-8 md:mt-10"
        onClick={() => console.log('Login clicked')}
      >
        Ingresar
      </Button>
    </div>
  );
}

export default Login;
