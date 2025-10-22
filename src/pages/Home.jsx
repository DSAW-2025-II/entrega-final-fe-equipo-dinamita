import React from "react";
import Button from "../components/Button";
import Tittle from "../components/Tittle";
import HomeLogo from "../assets/HomeLogo.svg";
import NavLogo from "../assets/NavLogo.svg";

export default function Home() {
  return (
    <div className="w-screen h-screen bg-black flex flex-col items-center justify-start text-white font-inter">
      {/* LOGO (espacio reservado) */}

      {/* TÍTULO */}
      <Tittle
        variant="primary"
        size="extraLarge"
        className="self-start ml-10 mt-6"
      >
        ¡Hola, [nombreUsuario]!
      </Tittle>
     
      {/* options */}
    <div className="absolute top-6 right-10 flex items-center gap-8">
      <img
        src={HomeLogo}
        alt="Home"
        className="w-10 h-10 lg:w-12 lg:h-12 cursor-pointer transition-transform duration-200 hover:scale-110 hover:opacity-80"
      />

      <img
        src={NavLogo}
        alt="Nav"
        className="w-10 h-10 lg:w-12 lg:h-12 cursor-pointer transition-transform duration-200 hover:scale-110 hover:opacity-80"
      />
    </div>




        <div className="flex flex-col items-center mb-6 lg:mb-8">
          

      {/* BOTÓN */}
      <button className="mt-8 md:mt-10 bg-[#FEF801] text-[#1B1B1B] font-bold text-[20px] md:text-3xl py-2 md:py-3 px-8 md:px-12 rounded-full border border-[#FEF801] hover:bg-[#fef801d8] transition">
        Ingresar
      </button>
    </div>
    </div>

  );
}