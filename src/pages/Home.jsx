import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button"; 
import Tittle from "../components/Tittle"; 
import TopButtons from "../components/TopButtons"; 
import TravelCard from "../components/TravelCard";
import TravelModal from "../components/TravelModal";
import FilterModal from "../components/FilterModal";
import LoadingModal from "../components/LoadingModal";
import Paragraph from "../components/Paragraph";
import { useUser } from "../hooks/useUser";

export default function Home() { 
  const navigate = useNavigate();
  const { user, isLoading, refreshUser } = useUser();
  const [openFilter, setOpenFilter] = useState(false);
  const [selectedTravel, setSelectedTravel] = useState(null);
  const [isTravelModalOpen, setIsTravelModalOpen] = useState(false);
  const toggleFilter = () => setOpenFilter((prev) => !prev);
  const previousUserIdRef = useRef(null);

  // Manejar cuando se hace clic en una tarjeta de viaje
  const handleTravelClick = (trip) => {
    setSelectedTravel(trip);
    setIsTravelModalOpen(true);
  };

  const isDriver = user?.currentRole === "driver";

  
  // Detectar cuando cambia el userId y forzar recarga
  useEffect(() => {
    if (user?.id) {
      const currentUserId = user.id;
      
      // Si hay un userId previo y es diferente, significa que cambió el usuario
      if (previousUserIdRef.current && previousUserIdRef.current !== currentUserId) {
        // El userId cambió (nuevo login después de logout)
        // Limpiar estado local y forzar recarga completa
        setOpenFilter(false);
        refreshUser();
      }
      
      // Guardar el userId actual
      previousUserIdRef.current = currentUserId;
    } else {
      // Si no hay usuario, limpiar la referencia y estado local
      previousUserIdRef.current = null;
      setOpenFilter(false);
    }
  }, [user?.id, refreshUser]);

  // Mostrar loading mientras se obtienen los datos
  if (isLoading || !user) {
    return (
      <div className="w-screen h-screen bg-black flex items-center justify-center">
        <LoadingModal message="Cargando..." />
      </div>
    );
  }

  return ( 
  <div className="w-screen h-screen bg-black flex flex-col justify-start text-white font-inter"> 
  {/* TÍTULO */} 
  <div className="flex w-full max-w-6xl mx-auto items-start justify-between mb-4 lg:mb-10 px-2">
  <div className="flex flex-col lg:flex-row items-center mt-16 lg:space-x-3 lg:ml-3 lg:mt-1">
  <Tittle 
    variant="primary" 
    size="extraLarge" 
    className="self-start text-xl ml-8 mt-8 lg:text-3xl lg:ml-10 lg:mt-6" > 
    ¡Hola, {user.name}!
  </Tittle> 
    
  {/* BOTÓN FILTRADO - solo mostrar si es passenger */}
  {!isDriver && (
    <div className="relative">
      <Button 
        variant="primary" 
        size="extraLarge" 
        className="self-start text-xl -ml-7 -mt-3 lg:text-3xl lg:ml-8 lg:mt-6 lg:mb-6" 
        onClick={toggleFilter}> 
        Filtrado por:
      </Button>
      <FilterModal 
        isOpen={openFilter} 
        onClose={() => setOpenFilter(false)} 
      />
    </div>
  )}
  </div>
  {/* options */} 
    <TopButtons />
  </div>

  <Paragraph
    className="text-[#FEF801] text-start ml-10 mt-0  lg:ml-12 text-lg lg:text-2xl"
  >
    {isDriver ? "Bienvenido al panel de conductor" : "Explora los viajes disponibles"}
  </Paragraph>
  <Paragraph
    className="text-white text-start ml-10 mt-0  lg:ml-12 text-lg lg:text-2xl"
  >
    {isDriver ?"¿Qué quieres hacer hoy?" : ""}
  </Paragraph>
  
  {/* Contenido dinámico según el rol */}
  {isDriver ? (
    // Si es driver, mostrar menú del conductor
    <div className="flex flex-col items-start ml-8 gap-4 mt-4">
      <div className="flex items-center gap-4">
        <p className="text-[#FEF801] font-bold text-3xl">◉</p>
        <Button 
          variant="primary"
          size="medium"
          onClick={() => navigate('/create-trip')}
        >
          Crea un nuevo viaje
        </Button>
      </div>
      
      <div className="flex items-center gap-4">
        <p className="text-[#FEF801] font-bold text-3xl">◉</p>
        <Button 
          variant="primary"
          size="medium"
          onClick={() => navigate("/finalize-trip")}
        >
          Finaliza tu viaje
        </Button>
      </div>
    </div>
  ) : (
    // Si es passenger, mostrar las tarjetas de viaje
    <div>
      <div className="grid grid-cols-4 gap-6 px-10 mt-10">
      <TravelCard onOpen={handleTravelClick} />
      <TravelModal 
        isOpen={isTravelModalOpen}
        onClose={() => setIsTravelModalOpen(false)}
        travel={selectedTravel}
      />
      </div>
    </div>
  )}

  

    </div>
 
);

   }
