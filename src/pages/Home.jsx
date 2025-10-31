import React, { useState } from "react";
import Button from "../components/Button"; 
import Tittle from "../components/Tittle"; 
import TopButtons from "../components/TopButtons"; 
import TravelCard from "../components/TravelCard";
import FilterModal from "../components/FilterModal";

export default function Home() { 

  const user = JSON.parse(localStorage.getItem("user"));
  const [openFilter, setOpenFilter] = useState(false);
  const userName = user.name;
  const toggleFilter = () => setOpenFilter((prev) => !prev);

  return ( 
  <div className="w-screen h-screen bg-black flex flex-col justify-start text-white font-inter"> 
  {/* TÍTULO */} 
  <div className="flex w-full max-w-6xl mx-auto items-center justify-between mb-10 px-2">
  <Tittle 
    variant="primary" 
    size="extraLarge" 
    className="self-start ml-10 mt-6" > 
    ¡Hola, {userName}!
  </Tittle> 
    
  {/* BOTÓN */} 
   <div className="relative">
    <Button 
      variant="primary" 
      size="extraLarge" 
      className="self-start ml-8 mt-6 mb-6" 
      onClick={toggleFilter}> 
      Filtrado por:
    </Button>

    <FilterModal 
    isOpen={openFilter} 
    onClose={() => setOpenFilter(false)} />
    </div>

  {/* options */} 
    <TopButtons />
  </div>
  
    <div>
      <TravelCard />
    </div>

    </div> 
    );
   }
