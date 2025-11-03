import React from "react";
import Button from "../components/Button"; 
import Tittle from "../components/Tittle"; 
import TopButtons from "../components/TopButtons";
import Carnet from "../components/Carnet";
import Paragraph from "../components/Paragraph";
import { useNavigate } from "react-router-dom";

export default function BeDriver() { 
  const navigate = useNavigate();
  
  return ( 
    <div className="w-screen h-screen bg-black flex flex-col justify-start text-white font-inter">

  {/* TÍTULO */} 
  <Tittle 
    variant="primary" 
    size="extraLarge" 
    className="self-start ml-10 mt-6" > 
    Sé conductor
  </Tittle> 

  <TopButtons />
     <div className="ml-8">
        <Carnet/>
    </div>

    <div className="flex items-center ml-18 mt-4 gap-4">
    <p className="text-[#FEF801] font-bold text-3xl">1.</p>
    <Button 
      variant="primary" 
      size="medium"
       onClick={() => navigate("/register-car")}
    >
      Registra tu vehículo
    </Button>
    </div>

    <div className="flex items-center ml-18 mt-4 gap-4">
    <p className="text-[#FEF801] font-bold text-3xl">2.</p>
    <p className="text-white font-bold text-3xl">Crea un</p>
    <Button 
      variant="primary"
      size="medium"
       onClick={() => navigate("/create-trip")}
    > Nuevo viaje
    </Button>
    </div>
    
     <div className="flex items-center ml-18 mt-4 gap-4">
    <p className="text-[#FEF801] font-bold text-3xl">3.</p>
    <p className="text-white font-bold text-3xl">Maneja seguro y no olvides</p>
    <Button 
      variant="primary"
      size="medium"
      onClick={() => navigate("/finalize-trip")}
    > Finalizar tu viaje
    </Button>
    </div>
      
  </div>
  )
}