import React from "react";
import Tittle from "../components/Tittle";
import TopButtons from "../components/TopButtons";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import Carnet from "../components/Carnet";
import CreateTripCard from "../components/CreateTripCard";
import { useNavigate } from "react-router-dom";


export default function NewTrip() {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen bg-black flex flex-col text-white font-inter">
      {/* TÍTULO */}
      <div className="flex justify-between items-center">
        <Tittle
          variant="primary"
          size="extraLarge"
          className="self-start ml-10 mt-6">
          Crea un nuevo viaje
        </Tittle>

        {/* BOTONES DE ARRIBA */}
        <TopButtons />
        </div>
    
      {/* CONTENEDOR CENTRADO */}
      <div className="flex flex-1 items-center justify-center">
        <CreateTripCard />
      </div>

    </div>
    );
    
}