import React from "react"; 
import Button from "../components/Button"; 
import Tittle from "../components/Tittle"; 
import HomeLogo from "../assets/HomeLogo.svg"; 
import NavLogo from "../assets/NavLogo.svg"; 
import TopButtons from "../components/TopButtons"; 
import TravelCard from "../components/TravelCard";

export default function Home() { 
  return ( 
  <div className="w-screen h-screen bg-black flex items-center justify-start text-white font-inter"> 
  {/* TÍTULO */} 
  <Tittle 
    variant="primary" 
    size="extraLarge" 
    className="self-start ml-10 mt-6" > 
    ¡Hola, [nombreUsuario]!
  </Tittle> 
    
  {/* BOTÓN */} 
    <Button 
      variant="primary" 
      size="extraLarge" 
      className="self-start ml-8 mt-6 mb-6" > 
      Filtrado por:
    </Button>
    
  {/* options */} 
    <TopButtons />

 
    <div>
      <TravelCard />

    </div>






    </div> 
    );
   }
