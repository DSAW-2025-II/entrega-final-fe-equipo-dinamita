import React, { useState, useEffect } from "react";
import Button from "./Button";

export default function TravelModal({ isOpen, onClose, travel }) {
  const [tickets, setTickets] = useState(1); // 👈 necesario

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

  return (
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
          <p><strong>Vehículo:</strong> {travel.vehicle.brand} {travel.vehicle.model}</p>
          <p><strong>Placa:</strong> {travel.vehicle.plate}</p>
          <p><strong>Punto de partida:</strong> {travel.departurePoint}</p>
          <p><strong>Punto de destino:</strong> {travel.destinationPoint}</p>
          <p><strong>Fecha y hora de salida:</strong> {formatDepartureTime(travel.departureTime)}</p>
          <p><strong>Tarifa por pasajero:</strong> {travel.pricePassenger} COP</p>
          <p><strong>Contacto del conductor:</strong> {travel.driverContact}</p>
        

        <div className="flex justify-between mt-2 items-center">
          <div className="flex items-center space-x-3 bg-[#FEF801] px-4 py-1 rounded-full">
            <Button
              variant="primary"
              size="small"
              className="text-black font-bold text-xl"
              onClick={() => setTickets((prev) => Math.max(1, prev - 1))}
            >
              -
            </Button>

            <span className="text-black font-bold text-lg">{tickets}</span>

            <Button
              variant="primary"
              size="small"
              className="text-black font-bold text-xl"
              onClick={() => setTickets((prev) => Math.min(4, prev + 1))}
            >
              +
            </Button>
          </div>

          <Button
            variant="primary"
            size="semi"
            onClick={onClose}
          >
            Aceptar
          </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
