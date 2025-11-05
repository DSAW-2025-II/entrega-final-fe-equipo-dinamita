import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button"; 
import Tittle from "../components/Tittle"; 
import TopButtons from "../components/TopButtons"; 
import TravelContainer from "../components/TravelContainer";
import FilterModal from "../components/FilterModal";
import LoadingModal from "../components/LoadingModal";
import { useUser } from "../hooks/useUser";

export default function Home() { 
  const navigate = useNavigate();
  const { user, isLoading, refreshUser } = useUser();
  const [openFilter, setOpenFilter] = useState(false);
  const toggleFilter = () => setOpenFilter((prev) => !prev);
  const previousUserIdRef = useRef(null);

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
  <div className="flex w-full max-w-6xl mx-auto items-center justify-between mb-6 lg:mb-10 px-2">
  <Tittle 
    variant="primary" 
    size="extraLarge" 
    className="self-start ml-4 lg:ml-10 mt-4 lg:mt-6" > 
    ¡Hola, {user.name}!
  </Tittle> 
    
  {/* BOTÓN FILTRADO - solo mostrar si es passenger */}
  {!isDriver && (
    <div className="relative">
      <Button 
        variant="primary" 
        size="extraLarge" 
        className="self-start ml-2 lg:ml-8 mt-4 lg:mt-6 mb-4 lg:mb-6" 
        onClick={toggleFilter}> 
        Filtrado por:
      </Button>
      <FilterModal 
        isOpen={openFilter} 
        onClose={() => setOpenFilter(false)} 
      />
    </div>
  )}

  {/* options */} 
    <TopButtons />
  </div>
  
  {/* Contenido dinámico según el rol */}
  {isDriver ? (
    // Si es driver, mostrar menú del conductor
    <div className="flex flex-col items-start ml-8 gap-4 mt-4">
      <div className="flex items-center gap-4">
        <p className="text-[#FEF801] font-bold text-3xl">1.</p>
        <p className="text-white font-bold text-3xl">Crea un</p>
        <Button 
          variant="primary"
          size="medium"
          onClick={() => navigate('/create-trip')}
        >
          Nuevo viaje
        </Button>
      </div>
      
      <div className="flex items-center gap-4">
        <p className="text-[#FEF801] font-bold text-3xl">2.</p>
        <p className="text-white font-bold text-3xl">Maneja seguro y no olvides</p>
        <Button 
          variant="primary"
          size="medium"
          onClick={() => navigate("/finalize-trip")}
        >
          Finalizar tu viaje
        </Button>
      </div>
    </div>
  ) : (
    // Si es passenger, mostrar las tarjetas de viaje
    <div className="w-full max-w-6xl mx-auto px-2">
      {/* Título "Viajes Disponibles" */}
      <h2 className="text-[#FEF801] font-bold text-lg lg:text-3xl ml-4 lg:ml-10 mt-4 mb-4 lg:mb-6">
        Viajes Disponibles
      </h2>
      
      {/* Contenedor de tarjetas */}
      <div className="ml-4 lg:ml-10">
        <TravelContainer />
      </div>
    </div>
  )}

  

    </div>
 
);

   }
