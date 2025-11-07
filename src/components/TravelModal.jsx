import React, { useState, useEffect } from "react";
import Button from "./Button";
import api from "../api/axios";
import SuccessModal from "./SuccessModal";
import ErrorModal from "./ErrorModal";
import LoadingModal from "./LoadingModal";

export default function TravelModal({ isOpen, onClose, travel, onSuccess }) {
  const [tickets, setTickets] = useState(1); // 👈 necesario
  const [summaryError, setSummaryError] = useState(""); // Error del modal de resumen (se muestra ahí)
  const [showSummary, setShowSummary] = useState(false);
  const [passengerPoints, setPassengerPoints] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  // Cerrar modal con la tecla Escape
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      setTickets(1);
      setSummaryError("");
      setShowSummary(false);
      setPassengerPoints([]);
      setIsLoading(false);
      setIsSuccess(false);
      setErrorMessages([]);
    }
  }, [isOpen]);

  // Auto-cerrar el modal de éxito después de 1.5 segundos
  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        setIsSuccess(false);
        setShowSummary(false);
        if (onSuccess) {
          onSuccess();
        }
        onClose();
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isSuccess, onClose, onSuccess]);

  // Formatear la fecha y hora de salida
  const formatDepartureTime = (departureTime) => {
    if (!departureTime) return "—";
    
    try {
      const date = new Date(departureTime);
      if (isNaN(date.getTime())) return departureTime; // Si no es una fecha válida, devolver el valor original
      
      // Formato: "DD/MM/YYYY HH:MM"
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      
      return `${day}/${month}/${year}, ${hours}:${minutes}`;
    } catch (error) {
      console.error("Error formateando fecha:", error);
      return departureTime;
    }
  };

  if (!isOpen || !travel) return null;

  const handleDecrease = () => {
    setTickets((prev) => {
      const updated = Math.max(1, prev - 1);
      return updated;
    });
  };

  const handleIncrease = () => {
    setTickets((prev) => {
      const maxSeatsRaw = travel?.availableSeats ?? travel?.capacity ?? 4;
      const maxSeats = Math.max(0, maxSeatsRaw);
      const updated = Math.min(maxSeats, prev + 1);
      return updated;
    });
  };

  const handleNext = () => {
    if (!tickets || tickets < 1) {
      // Los botones de aumento/disminución siempre mantienen tickets >= 1, 
      // pero mantener la validación por si acaso
      return;
    }
    setSummaryError(""); // Limpiar cualquier error previo del resumen
    setPassengerPoints(Array.from({ length: tickets }, () => ""));
    setShowSummary(true);
  };

  const handleCloseSummary = () => {
    setShowSummary(false);
  };

  const handlePointChange = (index, value) => {
    setPassengerPoints((prev) => {
      const updated = [...prev];
      updated[index] = value;
      return updated;
    });
    // Limpiar el error del resumen cuando el usuario empieza a escribir
    if (summaryError) {
      setSummaryError("");
    }
  };

  const handleAccept = async () => {
    // Validar que todos los puntos estén completos
    const incompletePoints = passengerPoints.some(point => !point || !point.trim());
    if (incompletePoints) {
      setSummaryError("Por favor completa todos los puntos de los pasajeros");
      return;
    }

    setIsLoading(true);
    setSummaryError("");
    setErrorMessages([]);

    // Cerrar todos los modals excepto el de cargando
    setShowSummary(false);

    try {
      const token = localStorage.getItem("token");
      const response = await api.post(
        `/rides/${travel.id}/request`,
        {
          tickets: tickets,
          passengerPoints: passengerPoints
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setIsSuccess(true);
      }
    } catch (error) {
      console.error("Error solicitando viaje:", error);
      const errorMessage = error.response?.data?.message || "Error al solicitar el viaje. Intenta de nuevo.";
      setErrorMessages([errorMessage]);
      // No reabrir el modal de resumen, dejar que se muestre solo el modal de error
      setShowSummary(false);
    } finally {
      setIsLoading(false);
    }
  };

  const startsAtUniversity = Boolean(
    travel?.departurePoint?.toLowerCase?.().includes("universidad de la sabana")
  );
  const endsAtUniversity = Boolean(
    travel?.destinationPoint?.toLowerCase?.().includes("universidad de la sabana")
  );
  const summaryTitle = startsAtUniversity
    ? "Puntos de destino de los pasajeros:"
    : endsAtUniversity
    ? "Puntos de recogida de los pasajeros:"
    : "Rutas de los pasajeros:";
  const inputPlaceholder = startsAtUniversity
    ? "Destino del pasajero"
    : endsAtUniversity
    ? "Punto de recogida del pasajero"
    : "Punto para el pasajero";

  return (
    <>
      {isLoading && <LoadingModal message="Procesando solicitud..." />}
      {isSuccess && !isLoading && (
        <SuccessModal
          message="¡Solicitud de viaje realizada exitosamente!"
          onClose={() => {
            setIsSuccess(false);
            setShowSummary(false);
            if (onSuccess) {
              onSuccess();
            }
            onClose();
          }}
        />
      )}
      {errorMessages.length > 0 && !isLoading && (
        <ErrorModal
          messages={errorMessages}
          onClose={() => setErrorMessages([])}
        />
      )}

      {!isLoading && !isSuccess && errorMessages.length === 0 && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 z-50">
          <div className="bg-[#FEF801] border-4 border-[#1B1B1B] rounded-2xl shadow-xl p-4 w-[340px] lg:w-[400px] relative">
            <button
              onClick={onClose}
              className="absolute top-2 right-3 text-pink-600 font-bold text-lg cursor-pointer"
            >
              ✕
            </button>

            <img
              src={travel.image}
              alt="Car"
              className="rounded-lg mb-3 w-full h-40 object-cover"
            />

            <div className="bg-[#FFFDEB] rounded-2xl p-4 mt-3 border-2 border-[#FEF801] text-black space-y-1">
              <p><strong>Conductor:</strong> {travel.driverName}</p>
              <p><strong>Contacto:</strong> {travel.driverContact}</p>
              <p><strong>Vehículo:</strong> {travel.vehicle.brand} {travel.vehicle.model}</p>
              <p><strong>Placa:</strong> {travel.vehicle.plate}</p>
              <p><strong>Punto de partida:</strong> {travel.departurePoint}</p>
              <p><strong>Punto de destino:</strong> {travel.destinationPoint}</p>
              <p><strong>Ruta:</strong> {travel.route || "—"}</p>
              <p><strong>Fecha y hora de salida:</strong> {formatDepartureTime(travel.departureTime)}</p>
              <p><strong>Tarifa por pasajero:</strong> {travel.pricePassenger} COP</p>
            

              <div className="flex justify-between mt-2 items-center">
                <div className="flex items-center space-x-3 bg-[#FEF801] px-4 py-1 rounded-full">
                  <Button
                    variant="primary"
                    size="small"
                    className="text-black font-bold text-xl"
                    onClick={handleDecrease}
                  >
                    -
                  </Button>

                  <span className="text-black font-bold text-lg">{tickets}</span>

                  <Button
                    variant="primary"
                    size="small"
                    className="text-black font-bold text-xl"
                    onClick={handleIncrease}
                  >
                    +
                  </Button>
                </div>

                <Button
                  variant="primary"
                  size="semi"
                  onClick={handleNext}
                >
                  Siguiente
                </Button>
              </div>
            </div>
            {showSummary && !isLoading && !isSuccess && errorMessages.length === 0 && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/70 z-[60]">
                <div className="relative bg-white rounded-2xl p-6 w-[300px] lg:w-[360px] shadow-xl border-4 border-[#1B1B1B]">
                  <button
                    onClick={handleCloseSummary}
                    className="absolute top-2 right-3 text-[#FE0144] font-bold text-lg cursor-pointer"
                    aria-label="Cerrar resumen"
                  >
                    ✕
                  </button>
                  <h3 className="text-xl font-bold text-[#1B1B1B] mb-2 text-center">
                    Resumen de pasajes
                  </h3>
                  <p className="text-base text-[#1B1B1B] mb-4 text-center">
                    Pasajes seleccionados: <strong>{tickets}</strong>
                  </p>

                  <p className="text-sm text-[#1B1B1B] font-semibold mb-2">
                    {summaryTitle}
                  </p>

                  <div className="flex flex-col gap-3 max-h-52 overflow-y-auto pr-1">
                    {passengerPoints.map((value, index) => (
                      <div key={`passenger-point-${index}`} className="flex flex-col text-left">
                        <label className="text-xs text-[#1B1B1B] font-semibold mb-1">
                          Pasajero {index + 1}
                        </label>
                        <input
                          type="text"
                          value={value}
                          onChange={(e) => handlePointChange(index, e.target.value)}
                          placeholder={`${inputPlaceholder} ${index + 1}`}
                          className="w-full rounded-lg border border-[#1B1B1B] px-3 py-1.5 text-sm text-[#1B1B1B] bg-white placeholder:text-[#1B1B1B]/50 focus:outline-none focus:ring-2 focus:ring-[#FEF801]"
                        />
                      </div>
                    ))}
                  </div>

                  {summaryError && (
                    <div className="mt-3">
                      <p className="text-[#FE0144] text-sm font-bold text-center">
                        {summaryError}
                      </p>
                    </div>
                  )}

                  <div className="flex justify-center mt-5">
                    <Button
                      variant="primary"
                      size="semi"
                      onClick={handleAccept}
                      disabled={isLoading}
                    >
                      {isLoading ? "Procesando..." : "Aceptar"}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
