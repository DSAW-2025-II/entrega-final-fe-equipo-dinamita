import React, { useState } from "react";
import Button from "../components/Button"; 
import Tittle from "../components/Tittle"; 
import TopButtons from "../components/TopButtons"; 
import TravelCard from "../components/TravelCard";
import FilterModal from "../components/FilterModal";
import TravelModal from "../components/TravelModal";

export default function Home() { 

  const user = JSON.parse(localStorage.getItem("user"));
  const [openFilter, setOpenFilter] = useState(false);
  const userName = user.name;
  const toggleFilter = () => setOpenFilter((prev) => !prev);

  const [openModal, setOpenModal] = useState(false);
  const [selectedTravel, setSelectedTravel] = useState(null);

  const handleCardClick = (travel) => {
    setSelectedTravel(travel);
    setOpenModal(true);
  };

const travels = [
    {
      id: 1,
      image: "https://via.placeholder.com/300x150?text=Car+1",
      driverName: "Carlos Pérez",
      carBrand: "Mazda",
      carPlate: "ABC123",
      departurePoint: "Bogotá",
      destinationPoint: "Medellín",
      departureTime: "8:00 AM",
      farePerPassenger: 50000,
      driverPhone: "3001234567",
    },
  ];

  return ( 
  <div className="w-screen min-h-screen bg-black flex flex-col text-white font-inter"> 
    {/* 🔹 CONTENEDOR SUPERIOR: Hola + Filtro + TopButtons */}
    <div className="flex w-full max-w-6xl mx-auto items-start justify-between px-8 mt-7">
      
      {/* 🔸 Grupo izquierda: Hola + Filtro */}
      <div className="flex items-center space-x-6">
        <Tittle 
          variant="primary" 
          size="extraLarge"
        > 
          ¡Hola, {userName}!
        </Tittle> 

        <Button 
          variant="primary" 
          size="extraLarge"
          onClick={toggleFilter}
        > 
          Filtrado por:
        </Button>

        <FilterModal 
          isOpen={openFilter} 
          onClose={() => setOpenFilter(false)} 
        />
      </div>

      {/* 🔸 Botones arriba derecha */}
      <TopButtons />
    </div>

    {/* 🔹 CONTENEDOR DE TARJETA */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 px-10 mt-16">
       {travels.map((travel) => (
        <div key={travel.id} onClick={() => handleCardClick(travel)}>
        <TravelCard travel={travel} />
      </div>
      ))}
    </div>
    
    <TravelModal
       isOpen={openModal}
       onClose={() => setOpenModal(false)}
       travel={selectedTravel} />

    </div>
 
);

   }
