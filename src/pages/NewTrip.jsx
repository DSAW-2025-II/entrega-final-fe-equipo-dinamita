import React, { useState, useEffect } from "react";
import Tittle from "../components/Tittle";
import TopButtons from "../components/TopButtons";
import CreateTripCard from "../components/CreateTripCard";
import LoadingModal from "../components/LoadingModal";
import SuccessModal from "../components/SuccessModal";
import ErrorModal from "../components/ErrorModal";
import { useNavigate } from "react-router-dom";

export default function NewTrip() {
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const handleSuccess = () => {
    setIsSuccess(true);
  };

  const handleSuccessClose = () => {
    setIsSuccess(false);
    // Redirigir a la página de mis viajes después de crear exitosamente
    navigate("/my-trips");
  };

  const handleError = (messages) => {
    setErrorMessages(messages);
  };

  // Auto-cerrar el modal de éxito después de 2 segundos
  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        handleSuccessClose();
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  return (
    <div className="w-screen h-screen bg-black flex flex-col text-white font-inter">
      {/* Modales */}
      {isSuccess && (
        <SuccessModal
          message="¡Viaje creado exitosamente!"
          onClose={handleSuccessClose}
        />
      )}
      {errorMessages.length > 0 && (
        <ErrorModal
          messages={errorMessages}
          onClose={() => setErrorMessages([])}
        />
      )}

      {/* TÍTULO */}
      <div className="flex justify-between items-center">
        <Tittle
          variant="primary"
          size="extraLarge"
          className="self-start ml-4 lg:ml-10 mt-4 lg:mt-6">
          Crea un nuevo viaje
        </Tittle>

        {/* BOTONES DE ARRIBA */}
        <TopButtons />
      </div>
    
      {/* CONTENEDOR CENTRADO */}
      <div className="flex flex-1 items-center justify-center">
        <CreateTripCard onSuccess={handleSuccess} onError={handleError} />
      </div>

    </div>
  );
}