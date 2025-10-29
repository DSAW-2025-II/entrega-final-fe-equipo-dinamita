import React from "react";
import Button from "./Button";
import Tittle from "./Tittle";

export default function TravelCard({ trip = {}, onOpen = () => {} }) {
  return (
    <div
      onClick={() => onOpen(trip)}
      className="relative w-[260px] h-[240px] cursor-pointer"
    >
      {/* Amarillo */}
      <div className="absolute inset-0 bg-[#FCF837] border-4 border-[#FE0144] rounded-2xl"></div>

      {/* Imagen */}
      <div
        className="absolute top-3 left-3 right-3 h-[90px] bg-cover bg-center rounded-xl"
        style={{
          backgroundImage: `url(${
            trip.image ||
            "https://via.placeholder.com/300x150/FE0144/FFF?text=Sin+imagen"
          })`,
        }}
      ></div>

      {/* Info box */}
      <div className="absolute bottom-3 left-3 right-3 bg-[#FFFEE5] rounded-xl p-3">
        {/* Botón ruta */}
        <Tittle
          variant="primary"
          size="semi"
          className="mb-1"
          onClick={() => onOpen(trip)}
        >
          Ver ruta
        </Tittle>

        <p className="text-sm font-bold text-[#1B1B1B]">
          Punto de partida: {trip.origen || "—"}
        </p>
        <p className="text-sm font-bold text-[#1B1B1B]">
          Destino: {trip.destino || "—"}
        </p>
        <p className="text-sm font-bold text-[#1B1B1B]">
          Hora de salida: {trip.hora || "—"}
        </p>
        <p className="text-sm font-bold text-[#1B1B1B]">
          Tarifa: ${trip.costo || "—"}
        </p>
      </div>
    </div>
  );
}
