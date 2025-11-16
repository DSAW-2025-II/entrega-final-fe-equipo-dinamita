import React, { useState } from "react";
import Button from "../components/Button"; 
import Tittle from "../components/Tittle"; 
import TopButtons from "../components/TopButtons";
import ErrorModal from "../components/ErrorModal";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

export default function BeDriver() { 
  const navigate = useNavigate();
  const { user } = useUser();
  const [showVehicleRequiredModal, setShowVehicleRequiredModal] = useState(false);

  // Función para verificar si el usuario tiene el rol 'driver' y manejar la navegación
  const handleDriverAction = (destination) => {
    // Verificar si el usuario tiene el rol 'driver' en su array de roles
    // Si no tiene este rol, significa que no ha registrado un vehículo
    if (!user || !user.roles || !user.roles.includes('driver')) {
      // No tiene el rol 'driver' (no ha registrado vehículo), mostrar modal y luego redirigir
      setShowVehicleRequiredModal(true);
    } else {
      // Tiene el rol 'driver' (tiene vehículo registrado), navegar normalmente
      navigate(destination);
    }
  };

  // Función para cerrar el modal y redirigir a registro de vehículo
  const handleModalClose = () => {
    setShowVehicleRequiredModal(false);
    navigate("/register-car");
  };
  
  return ( 
    <div className="w-screen h-screen bg-black flex flex-col justify-start text-white font-inter">

      {/* TÍTULO */} 
      <Tittle 
        variant="primary" 
        size="extraLarge" 
        className="self-start ml-10 mt-20 lg:mt-6" > 
        Sé conductor
      </Tittle> 

      <TopButtons />
         

      <div className="flex items-center ml-8 lg:ml-18 mt-4 gap-4">
        <p className="text-[#FEF801] font-bold text-3xl">1.</p>
        <Button 
          variant="primary" 
          size="medium"
          onClick={() => navigate("/register-car")}
        >
          Registra tu vehículo
        </Button>
      </div>

      <div className="flex items-center ml-8 lg:ml-18 mt-4 gap-4">
        <p className="text-[#FEF801] font-bold text-3xl">2.</p>
        <p className="text-white font-bold text-2xl lg:text-3xl">Crea un</p>
        <Button 
          variant="primary"
          size="medium"
          onClick={() => handleDriverAction("/create-trip")}
        > 
          Nuevo viaje
        </Button>
      </div>
      
     <div className="flex items-start ml-8 lg:ml-18 mt-4 gap-3">
      <p className="text-[#FEF801] font-bold text-3xl leading-none lg:mt-3">3.</p>
      <div className="flex flex-col lg:flex-row lg:items-center mt-1 lg:mt-0">
        <p className="text-white font-bold text-2xl lg:text-3xl leading-none">Maneja seguro</p>
        
        <div className="flex flex-col lg:flex-row lg:items-center">
          <p className="text-white font-bold text-2xl lg:text-3xl mt-2 lg:mt-0 lg:ml-3 leading-none">y no olvides</p>
          <Button 
            variant="primary"
            size="medium"
            onClick={() => handleDriverAction("/finalize-trip")}
            className="-ml-3 mt-4 lg:mt-0 lg:ml-3"
          >
            Finalizar tu viaje
          </Button>
        </div>
      </div>
    </div>

      {/* Modal vehículo no registrado */}
      {showVehicleRequiredModal && (
        <ErrorModal
          messages={["¡Primero debes registrar tu vehículo!"]}
          onClose={handleModalClose}
        />
      )}
    </div>
  );
}