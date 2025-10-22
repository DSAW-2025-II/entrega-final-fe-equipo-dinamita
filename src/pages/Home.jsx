import React from "react"; 
import Button from "../components/Button"; 
import Tittle from "../components/Tittle"; 
import HomeLogo from "../assets/HomeLogo.svg"; 
import NavLogo from "../assets/NavLogo.svg"; 
import TopButtons from "../components/TopButtons"; 

export default function Home() { 
  return ( 
  <div className="w-screen h-screen bg-black flex flex-col items-center justify-start text-white font-inter"> 
  {/* LOGO (espacio reservado) */} 
  {/* TÍTULO */} 
  <Tittle 
    variant="primary" 
    size="extraLarge" 
    className="self-start ml-10 mt-6" > 
    ¡Hola, [nombreUsuario]!
  </Tittle> 
  {/* options */} 
  <TopButtons /> 
  <div className="flex flex-col space-between mb-6 lg:mb-8">
    
  {/* BOTÓN */} 
  <button className="mt-8 md:mt-10 bg-[#FEF801] text-[#1B1B1B] font-bold text-[20px] md:text-3xl py-2 md:py-3 px-8 md:px-12 rounded-full border border-[#FEF801] hover:bg-[#fef801d8] transition"> 
    Filtrado por: 
    </button> 
    </div> 
    </div> 
    );
   }
