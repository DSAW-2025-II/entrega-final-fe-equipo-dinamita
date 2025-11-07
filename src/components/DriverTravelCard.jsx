import React from "react";
import Button from "./Button";

export default function DriverTravelCard({ trip = {}, onCancel = () => {} }) {
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

  // Obtener información del viaje
  const departurePoint = trip.departurePoint || trip.origen || "—";
  const destinationPoint = trip.destinationPoint || trip.destino || "—";
  const route = trip.route || trip.ruta || "—";
  const departureTime = trip.departureTime || trip.hora;
  const passengers = trip.passengers || [];
  const isCancelled = trip.status === "cancelled";

  return (
    <div className="relative w-[303px] min-h-[400px] flex flex-col">
      {/* Fondo amarillo */}
      <div className="absolute inset-0 bg-[#FCF837] rounded-2xl card-shadow"></div>

      {/* Contenido */}
      <div className="relative flex flex-col h-full p-4">
        {/* Info box */}
        <div className="bg-[#FFFEE5] rounded-xl p-4 flex-1 flex flex-col">
          {/* Información del viaje */}
          <div className="flex-1 space-y-2 mb-4">
            <p className="text-sm text-[#1B1B1B]">
              <strong>Punto de partida:</strong> {departurePoint}
            </p>
            <p className="text-sm text-[#1B1B1B]">
              <strong>Punto de destino:</strong> {destinationPoint}
            </p>
            <p className="text-sm text-[#1B1B1B]">
              <strong>Ruta:</strong> {route}
            </p>
            <p className="text-sm text-[#1B1B1B]">
              <strong>Fecha y hora de salida:</strong> {formatDepartureTime(departureTime)}
            </p>

            {/* Sección de pasajeros */}
            <div className="mt-4 pt-3 border-t border-[#1B1B1B]/20">
              <p className="text-sm font-bold text-[#1B1B1B] mb-2">
                Pasajeros ({passengers.length})
              </p>
              {passengers.length > 0 ? (
                <div className="space-y-1">
                  {passengers.map((passenger, index) => (
                    <p key={index} className="text-xs text-[#1B1B1B] pl-2">
                      • {passenger.name || passenger || `Pasajero ${index + 1}`}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-[#1B1B1B]/60 italic pl-2">
                  No hay pasajeros registrados todavía
                </p>
              )}
            </div>
          </div>

          {/* Botón cancelar viaje - solo si no está cancelado */}
          {!isCancelled && (
            <div className="mt-auto pt-4">
              <Button
                variant="danger"
                size="semi"
                className="w-full"
                onClick={() => onCancel(trip)}
              >
                Cancelar viaje
              </Button>
            </div>
          )}
          
          {/* Indicador de viaje cancelado */}
          {isCancelled && (
            <div className="mt-auto pt-4">
              <div className="bg-gray-400 text-white text-center py-2 px-4 rounded-full">
                Viaje cancelado
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
