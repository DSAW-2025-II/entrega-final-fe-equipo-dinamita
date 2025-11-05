import React, { useState, useEffect } from "react";
import TravelCard from "./TravelCard";
import TravelModal from "./TravelModal";
import LoadingModal from "./LoadingModal";
import api from "../api/axios";

export default function TravelContainer() {
  const [rides, setRides] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTravel, setSelectedTravel] = useState(null);
  const [isTravelModalOpen, setIsTravelModalOpen] = useState(false);

  // Manejar cuando se hace clic en una tarjeta de viaje
  const handleTravelClick = (trip) => {
    setSelectedTravel(trip);
    setIsTravelModalOpen(true);
  };

  // Obtener todos los rides disponibles
  useEffect(() => {
    const fetchAllRides = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        
        const response = await api.get("/rides", { headers });

        if (response.data.success) {
          // Mapear los datos del backend al formato que espera TravelCard
          const mappedRides = response.data.rides.map((ride) => {
            return {
              id: ride.id,
              image: ride.image || null, // Imagen del vehículo
              origen: ride.departurePoint || "—",
              destino: ride.destinationPoint || "—",
              ruta: ride.route || "—",
              hora: null, // No usamos hora formateada aquí, se formatea en TravelCard
              costo: ride.pricePassenger || "—",
              puestos: ride.availableSeats || ride.capacity || 0,
              capacidad: ride.capacity || 0,
              availableSeats: ride.availableSeats || ride.capacity || 0,
              // Datos adicionales para el modal
              departurePoint: ride.departurePoint,
              destinationPoint: ride.destinationPoint,
              route: ride.route,
              departureTime: ride.departureTime,
              pricePassenger: ride.pricePassenger,
              capacity: ride.capacity,
              driverName: ride.driverName,
              driverContact: ride.driverContact,
              vehicle: ride.vehicle || {},
              status: ride.status,
              passengers: ride.passengers || [],
            };
          });

          setRides(mappedRides);
        }
      } catch (error) {
        console.error("Error obteniendo viajes:", error);
        setRides([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllRides();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <LoadingModal message="Cargando viajes..." />
      </div>
    );
  }

  if (rides.length === 0) {
    return (
      <div className="bg-[#D2D1BE] rounded-[20px] shadow-lg flex flex-col items-center py-10 px-8 max-w-md mx-auto text-center">
        <p className="text-black text-lg">
          No hay viajes disponibles en este momento.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {rides.map((trip) => (
          <TravelCard
            key={trip.id}
            trip={trip}
            onOpen={handleTravelClick}
          />
        ))}
      </div>
      <TravelModal
        isOpen={isTravelModalOpen}
        onClose={() => setIsTravelModalOpen(false)}
        travel={selectedTravel}
      />
    </>
  );
}
