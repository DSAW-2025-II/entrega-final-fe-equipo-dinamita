import React, { useState, useEffect } from "react";
import Tittle from "../components/Tittle";
import TopButtons from "../components/TopButtons";
import TravelCard from "../components/TravelCard";
import TravelModal from "../components/TravelModal";
import LoadingModal from "../components/LoadingModal";
import InfoMyTrips from "../components/InfoMyTrips";
import { useUser } from "../hooks/useUser";
import api from "../api/axios";

export default function MyTrips() {
  const { user, isLoading: isLoadingUser } = useUser();
  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTravel, setSelectedTravel] = useState(null);
  const [isInfoMyTripsOpen, setIsInfoMyTripsOpen] = useState(false);

  // Manejar cuando se hace clic en una tarjeta de viaje
  const handleTravelClick = (trip) => {
    setSelectedTravel(trip);
    setIsInfoMyTripsOpen(true);
  };

  // Obtener viajes del conductor
  useEffect(() => {
    const fetchDriverRides = async () => {
      if (!user || isLoadingUser) return;

      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/rides/driver", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          // Mapear los datos del backend al formato que espera TravelCard
          const mappedTrips = response.data.rides.map((ride) => {
            // Formatear la fecha y hora
            const departureDate = ride.departureTime 
              ? new Date(ride.departureTime) 
              : null;
            
            const formattedTime = departureDate
              ? departureDate.toLocaleTimeString("es-CO", {
                  hour: "2-digit",
                  minute: "2-digit",
                })
              : "—";

            return {
              id: ride.id,
              image: ride.image || null, // Imagen del vehículo
              origen: ride.departurePoint || "—",
              destino: ride.destinationPoint || "—",
              ruta: ride.route || "—",
              hora: formattedTime,
              costo: ride.pricePassenger || "—",
              puestos: ride.availableSeats || ride.capacity || 0,
              capacidad: ride.capacity || 0,
              // Datos adicionales para el modal
              departurePoint: ride.departurePoint,
              destinationPoint: ride.destinationPoint,
              route: ride.route,
              departureTime: ride.departureTime,
              pricePassenger: ride.pricePassenger,
              availableSeats: ride.availableSeats,
              capacity: ride.capacity,
              status: ride.status,
              passengers: ride.passengers || [],
            };
          });

          setTrips(mappedTrips);
        }
      } catch (error) {
        console.error("Error obteniendo viajes:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDriverRides();
  }, [user, isLoadingUser]);

  if (isLoadingUser || isLoading || !user) {
    return (
      <div className="w-screen h-screen bg-black flex items-center justify-center">
        <LoadingModal message="Cargando..." />
      </div>
    );
  }

  return (
    <div className="w-screen h-screen bg-black flex flex-col text-white font-inter overflow-y-auto py-8">
      <div className="flex w-full max-w-6xl mx-auto items-center justify-between mb-8 px-2">
        <Tittle size="extraLarge" className="mb-0 inline-block ml-4 lg:ml-10">
          Mis viajes
        </Tittle>
        <TopButtons />
      </div>
      
      {/* Lista de viajes */}
      {trips.length === 0 ? (
        <div className="bg-[#D2D1BE] rounded-[20px] shadow-lg flex flex-col items-center py-10 px-8 max-w-xs lg:max-w-md mx-auto text-center">
          <Tittle size="semi" className="bg-[#FEF801] px-6 py-2 mb-4 shadow-md text-black">
            Mis viajes como conductor
          </Tittle>
          <p className="text-black text-lg">
            No has creado ningún viaje todavía. ¡Crea tu primer viaje!
          </p>
        </div>
      ) : (
        <div className="w-full max-w-6xl mx-auto px-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ml-4 lg:ml-10">
            {trips.map((trip) => (
              <TravelCard
                key={trip.id}
                trip={trip}
                onOpen={handleTravelClick}
              />
            ))}
          </div>
          <InfoMyTrips
            isOpen={isInfoMyTripsOpen}
            onClose={() => setIsInfoMyTripsOpen(false)}
            travel={selectedTravel}
          />
        </div>
      )}
    </div>
  );
}

