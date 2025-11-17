import React, { useState } from "react";
import WillyHappy from "../assets/WillyHappy.svg";
import Paragraph from "../components/Paragraph.jsx";
import Button from "../components/Button.jsx";
import TopButtons from "../components/TopButtons.jsx";
import SuccessModal from "../components/SuccessModal.jsx";
import ErrorModal from "../components/ErrorModal.jsx";
import LoadingModal from "../components/LoadingModal.jsx";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function FinalizeTrip() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const handleFinalizeTrip = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await api.patch("/rides/finalize", {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setIsSuccess(true);
        // Redirigir a my-trips después de 1.5 segundos
        setTimeout(() => {
          navigate("/my-trips");
        }, 1500);
      }
    } catch (error) {
      console.error("Error finalizando viaje:", error);
      const errorMessage = error.response?.data?.message || "Error al finalizar el viaje";
      setErrorMessages([errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen bg-black flex flex-col justify-start text-white font-inter">
      {isLoading && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <LoadingModal message="Finalizando viaje..." />
        </div>
      )}

      {isSuccess && (
        <SuccessModal
          message="¡Viaje finalizado exitosamente!"
          onClose={() => setIsSuccess(false)}
        />
      )}

      {errorMessages.length > 0 && (
        <ErrorModal
          messages={errorMessages}
          onClose={() => setErrorMessages([])}
        />
      )}

      <TopButtons />    
      <div className="flex flex-col items-center mt-20">
        <Paragraph
          variant="primary"
          size="extraLarge"
          className="text-center mt-20 lg:mt-6 !text-3xl lg:!text-5xl"
        >
          ¿Terminaste tu viaje?
        </Paragraph>
        <img src={WillyHappy} alt="Willy Happy" className="mt-10 w-64 h-64"/>
        <Button
          variant="primary"
          size="extraLarge"
          className="mt-8 !text-2xl lg:!text-3xl"
          onClick={handleFinalizeTrip}
          disabled={isLoading}
        >
          Finalizar viaje
        </Button>
      </div>
    </div>
  );
}