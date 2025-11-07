import React, { useState, useEffect } from "react";
import Tittle from "../components/Tittle";
import TopButtons from "../components/TopButtons";
import DriverTravelCard from "../components/DriverTravelCard";
import LoadingModal from "../components/LoadingModal";
import ErrorModal from "../components/ErrorModal";
import SuccessModal from "../components/SuccessModal";
import { useUser } from "../hooks/useUser";
import api from "../api/axios";

export default function MyTrips() {
  const { user, isLoading: isLoadingUser } = useUser();
  const [trips, setTrips] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessages, setErrorMessages] = useState([]);
  const [isSuccess, setIsSuccess] = useState(false);

  // Función para mapear los rides a formato de trips
  const mapRidesToTrips = (rides) => {
    return rides.map((ride) => {
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
        image: ride.image || null,
        origen: ride.departurePoint || "—",
        destino: ride.destinationPoint || "—",
        ruta: ride.route || "—",
        hora: formattedTime,
        costo: ride.pricePassenger || "—",
        puestos: ride.availableSeats || ride.capacity || 0,
        capacidad: ride.capacity || 0,
        departurePoint: ride.departurePoint,
        destinationPoint: ride.destinationPoint,
        route: ride.route,
        departureTime: ride.departureTime,
        pricePassenger: ride.pricePassenger,
        availableSeats: ride.availableSeats,
        capacity: ride.capacity,
        driverName: ride.driverName,
        driverContact: ride.driverContact,
        vehicle: ride.vehicle,
        status: ride.status,
        passengers: ride.passengers || [],
      };
    });
  };

  // Función para obtener los viajes del conductor
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
        const mappedTrips = mapRidesToTrips(response.data.rides);
        setTrips(mappedTrips);
      }
    } catch (error) {
      console.error("Error obteniendo viajes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Manejar cancelación de viaje
  const handleCancelTrip = async (trip) => {
    if (!window.confirm("¿Estás seguro de que deseas cancelar este viaje?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await api.delete(`/rides/${trip.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        setIsSuccess(true);
        // Recargar la lista de viajes
        await fetchDriverRides();
      }
    } catch (error) {
      console.error("Error cancelando viaje:", error);
      setErrorMessages([
        error.response?.data?.message || "Error al cancelar el viaje. Intenta de nuevo."
      ]);
    }
  };

  // Obtener viajes del conductor al cargar
  useEffect(() => {
    fetchDriverRides();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isLoadingUser]);

  // Auto-cerrar el modal de éxito después de 1.5 segundos
  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        setIsSuccess(false);
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isSuccess]);

  if (isLoadingUser || isLoading || !user) {
    return (
      <div className="w-screen h-screen bg-black flex items-center justify-center">
        <LoadingModal message="Cargando..." />
      </div>
    );
  }

  return (
    <div className="w-screen h-screen bg-black flex flex-col text-white font-inter overflow-y-auto py-8">
      {isSuccess && (
        <SuccessModal
          message="¡Viaje cancelado exitosamente!"
          onClose={() => setIsSuccess(false)}
        />
      )}
      {errorMessages.length > 0 && (
        <ErrorModal
          messages={errorMessages}
          onClose={() => setErrorMessages([])}
        />
      )}

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
          {/* Viajes activos */}
          {trips.filter(trip => trip.status !== "cancelled").length > 0 && (
            <div className="mb-8">
              <Tittle 
                size="large" 
                className="mb-4 ml-4 lg:ml-10"
              >
                Mis viajes activos
              </Tittle>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ml-4 lg:ml-10">
                {trips
                  .filter(trip => trip.status !== "cancelled")
                  .map((trip) => (
                    <DriverTravelCard
                      key={trip.id}
                      trip={trip}
                      onCancel={handleCancelTrip}
                    />
                  ))}
              </div>
            </div>
          )}

          {/* Viajes cancelados */}
          {trips.filter(trip => trip.status === "cancelled").length > 0 && (
            <div className="mt-8">
              <Tittle 
                size="large" 
                className="mb-4 ml-4 lg:ml-10"
              >
                Mis viajes cancelados
              </Tittle>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ml-4 lg:ml-10">
                {trips
                  .filter(trip => trip.status === "cancelled")
                  .map((trip) => (
                    <DriverTravelCard
                      key={trip.id}
                      trip={trip}
                      onCancel={handleCancelTrip}
                    />
                  ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

