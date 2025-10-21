import React from "react";

export default function Register() {
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
      <div className="bg-[#FEF801] text-[#1B1B1B] font-bold text-xl md:text-5xl py-2 px-8 md:px-10 rounded-full mb-6 md:mb-10 border border-[#FEF801]">
        Registro
      </div>

      {/* Contenedor formulario */}
      <div className="bg-[#D2D1BE] w-[290px] md:w-[620px] min-h-[320px] md:h-[780px] rounded-[28px] flex flex-col items-center justify-center gap-3 md:gap-6 shadow-md">
        <input
          type="text"
          placeholder="Nombres"
          className="w-[245px] md:w-[460px] h-[38px] md:h-[70px] rounded-full px-4 md:px-6 text-[16px] md:text-[24px] text-[#A2A18A] placeholder-[#A2A18A] bg-white shadow-md focus:outline-none"
        />
        <input
          type="text"
          placeholder="Apellidos"
          className="w-[245px] md:w-[460px] h-[38px] md:h-[70px] rounded-full px-4 md:px-6 text-[16px] md:text-[24px] text-[#A2A18A] bg-white shadow-md focus:outline-none"
        />
        <input
          type="text"
          placeholder="ID universidad"
          className="w-[245px] md:w-[460px] h-[38px] md:h-[70px] rounded-full px-4 md:px-6 text-[16px] md:text-[24px] text-[#A2A18A] bg-white shadow-md focus:outline-none"
        />
        <input
          type="tel"
          placeholder="Número de contacto"
          className="w-[245px] md:w-[460px] h-[38px] md:h-[70px] rounded-full px-4 md:px-6 text-[16px] md:text-[24px] text-[#A2A18A] bg-white shadow-md focus:outline-none"
        />
        <input
          type="email"
          placeholder="Correo institucional"
          className="w-[245px] md:w-[460px] h-[38px] md:h-[70px] rounded-full px-4 md:px-6 text-[16px] md:text-[24px] text-[#A2A18A] bg-white shadow-md focus:outline-none"
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="w-[245px] md:w-[460px] h-[38px] md:h-[70px] rounded-full px-4 md:px-6 text-[16px] md:text-[24px] text-[#A2A18A] bg-white shadow-md focus:outline-none"
        />
      </div>

      {/* Botón */}
      <button className="mt-8 md:mt-10 bg-[#FEF801] text-[#1B1B1B] font-bold text-[20px] md:text-3xl py-2 md:py-3 px-8 md:px-12 rounded-full border border-[#FEF801] hover:bg-[#fef801d8] transition">
        Ingresar
      </button>
    </div>
  );
}