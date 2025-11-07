import React, { useState, useEffect } from "react";
import Tittle from "../components/Tittle";
import TopButtons from "../components/TopButtons";
import ReservationCard from "../components/ReservationCard";
import LoadingModal from "../components/LoadingModal";
import api from "../api/axios";
import { useUser } from "../hooks/useUser";

export default function Reservations() {
  const { user, isLoading: isLoadingUser } = useUser();
  const [reservations, setReservations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Obtener reservas del usuario
  useEffect(() => {
    const fetchUserRequests = async () => {
      if (!user || isLoadingUser) return;

      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await api.get("/rides/requests", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          // Mapear los datos al formato que espera ReservationCard
          const mappedReservations = response.data.requests.map((request) => {
            return {
              id: request.id,
              image: request.image || null,
              origen: request.departurePoint || "—",
              destino: request.destinationPoint || "—",
              ruta: request.route || "—",
              costo: request.pricePassenger || "—",
              departurePoint: request.departurePoint,
              destinationPoint: request.destinationPoint,
              route: request.route,
              departureTime: request.departureTime,
              pricePassenger: request.pricePassenger,
              totalTickets: request.totalTickets || 0,
              userPassengers: request.userPassengers || [],
              driverName: request.driverName,
              driverContact: request.driverContact,
              vehicle: request.vehicle || {},
              status: request.status,
            };
          });

          setReservations(mappedReservations);
        }
      } catch (error) {
        console.error("Error obteniendo reservas:", error);
        setReservations([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserRequests();
  }, [user, isLoadingUser]);

  const handleReservationClick = (reservation) => {
    // Por ahora solo mostrar en consola, se puede agregar un modal después
    console.log("Reservación seleccionada:", reservation);
  };

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
          Mis reservas
        </Tittle>
        <TopButtons />
      </div>

      {/* Lista de reservas */}
      {reservations.length === 0 ? (
        <div className="bg-[#D2D1BE] rounded-[20px] shadow-lg flex flex-col items-center py-10 px-8 max-w-xs lg:max-w-md mx-auto text-center">
          <p className="text-black text-lg">
            No tienes reservas todavía.
          </p>
        </div>
      ) : (
        <div className="w-full max-w-6xl mx-auto px-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ml-4 lg:ml-10">
            {reservations.map((reservation) => (
              <ReservationCard
                key={reservation.id}
                reservation={reservation}
                onOpen={handleReservationClick}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
