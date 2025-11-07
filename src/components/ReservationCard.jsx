import React from "react";
import Button from "./Button";
import Tittle from "./Tittle";

export default function ReservationCard({ reservation = {}, onOpen = () => {} }) {
  // Formatear la fecha y hora de salida
  const formatDepartureTime = (departureTime) => {
    if (!departureTime) return "—";
    
    try {
      const date = new Date(departureTime);
      if (isNaN(date.getTime())) return departureTime;
      
      // Formato: "DD/MM/YYYY, HH:MM"
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

  return (
    <div
      onClick={() => onOpen(reservation)}
      className="relative w-[303px] h-[350px] cursor-pointer"
    >
      {/* Amarillo */}
      <div className="absolute inset-0 bg-[#FCF837] rounded-2xl card-shadow"></div>

      {/* Imagen */}
      <div
        className="absolute top-3 left-3 right-3 h-[110px] bg-cover bg-center rounded-xl"
        style={{
          backgroundImage: `url(${
            reservation.image ||
            "https://via.placeholder.com/300x150/FE0144/FFF?text=Sin+imagen"
          })`,
        }}
      ></div>

      {/* Info box */}
      <div className="absolute bottom-3 left-3 right-3 bg-[#FFFEE5] rounded-xl p-3">
        {/* Botón ver detalles */}
        

        <Tittle
          variant="primary"
          size="semi"
          className="mb-1 ml-1"
          onClick={() => onOpen(reservation)}
        >
          Pasajes: {reservation.totalTickets || 0}
        </Tittle>

        <p className="text-sm text-[#1B1B1B]">
          <strong>Punto de partida:</strong> {reservation.departurePoint || "—"}
        </p>
        <p className="text-sm text-[#1B1B1B]">
          <strong>Destino:</strong> {reservation.destinationPoint || "—"}
        </p>
        <p className="text-sm text-[#1B1B1B]">
          <strong>Ruta:</strong> {reservation.route || "—"}
        </p>
        <p className="text-sm text-[#1B1B1B]">
          <strong>Fecha y hora de salida:</strong> {formatDepartureTime(reservation.departureTime)}
        </p>
        <p className="text-sm text-[#1B1B1B]">
          <strong>Tarifa:</strong> {reservation.pricePassenger || "—"} COP
        </p>
      </div>
    </div>
  );
}

