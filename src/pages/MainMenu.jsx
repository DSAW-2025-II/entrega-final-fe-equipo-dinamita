import React from "react";

export default function Register() {
  return (
    <div className="w-screen h-screen bg-black flex flex-col items-center justify-center text-white font-inter">
      {/* LOGO (espacio reservado) */}
      <div className="flex flex-col items-center mb-6 md:mb-12">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 md:w-24 md:h-24 bg-gray-800 rounded-full" />
          <h1 className="text-3xl md:text-5xl font-outfit">WHEELS</h1>
        </div>
        <h2 className="text-4xl md:text-[100px] font-catamaran leading-none mt-2 md:mt-4">
          Sabana
        </h2>
      </div>

      {/* TÍTULO */}
      <div className="bg-[#FEF801] text-[#1B1B1B] font-bold text-xl md:text-5xl py-2 px-8 md:px-10 rounded-full mb-6 md:mb-10 border border-[#FEF801]">
        Registro
      </div>

      {/* FORMULARIO */}
      <div className="bg-[#D2D1BE] rounded-[28px] flex flex-col items-center justify-center gap-4 md:gap-6 p-6 md:p-10 w-[290px] md:w-[620px] shadow-md">
        <input
          type="text"
          placeholder="Nombres"
          className="w-[245px] md:w-[460px] h-[38px] md:h-[70px] rounded-full px-4 md:px-6 text-[16px] md:text-[24px] text-[#A2A18A] placeholder-[#A2A18A] bg-white shadow-md focus:outline-none"
        />
        <input
          type="text"
          placeholder="Apellidos"
          className="w-[245px] md:w-[460px] h-[38px] md:h-[70px] rounded-full px-4 md:px-6 text-[16px] md:text-[24px] text-[#A2A18A] placeholder-[#A2A18A] bg-white shadow-md focus:outline-none"
        />
        <input
          type="text"
          placeholder="ID universidad"
          className="w-[245px] md:w-[460px] h-[38px] md:h-[70px] rounded-full px-4 md:px-6 text-[16px] md:text-[24px] text-[#A2A18A] placeholder-[#A2A18A] bg-white shadow-md focus:outline-none"
        />
        <input
          type="text"
          placeholder="Número de contacto"
          className="w-[245px] md:w-[460px] h-[38px] md:h-[70px] rounded-full px-4 md:px-6 text-[16px] md:text-[24px] text-[#A2A18A] placeholder-[#A2A18A] bg-white shadow-md focus:outline-none"
        />
        <input
          type="email"
          placeholder="Correo institucional"
          className="w-[245px] md:w-[460px] h-[38px] md:h-[70px] rounded-full px-4 md:px-6 text-[16px] md:text-[24px] text-[#A2A18A] placeholder-[#A2A18A] bg-white shadow-md focus:outline-none"
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="w-[245px] md:w-[460px] h-[38px] md:h-[70px] rounded-full px-4 md:px-6 text-[16px] md:text-[24px] text-[#A2A18A] placeholder-[#A2A18A] bg-white shadow-md focus:outline-none"
        />
      </div>

      {/* BOTÓN */}
      <button className="mt-8 md:mt-10 bg-[#FEF801] text-[#1B1B1B] font-bold text-[20px] md:text-3xl py-2 md:py-3 px-8 md:px-12 rounded-full border border-[#FEF801] hover:bg-[#fef801d8] transition">
        Ingresar
      </button>
    </div>
  );
}