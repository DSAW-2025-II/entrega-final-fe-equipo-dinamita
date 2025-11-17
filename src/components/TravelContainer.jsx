import React, { useState, useEffect } from "react";
import TravelCard from "./TravelCard";
import TravelModal from "./TravelModal";
import LoadingModal from "./LoadingModal";
import api from "../api/axios";
import { useUser } from "../hooks/useUser";

export default function TravelContainer({ filters = { capacity: "", departurePoint: "" }, onCloseFilter }) {
  const { user } = useUser();
  const [rides, setRides] = useState([]);
  const [allRides, setAllRides] = useState([]); // Guardar todos los viajes sin filtrar
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTravel, setSelectedTravel] = useState(null);
  const [isTravelModalOpen, setIsTravelModalOpen] = useState(false);

  // Manejar cuando se hace clic en una tarjeta de viaje
  const handleTravelClick = (trip) => {
    setSelectedTravel(trip);
    setIsTravelModalOpen(true);
    // Cerrar el modal de filtro si está abierto
    if (onCloseFilter) {
      onCloseFilter();
    }
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
          let mappedRides = response.data.rides.map((ride) => {
            // Usar nullish coalescing (??) en lugar de || para que 0 no se trate como falsy
            const availableSeats = ride.availableSeats !== undefined && ride.availableSeats !== null 
              ? ride.availableSeats 
              : (ride.capacity ?? 0);
            
            return {
              id: ride.id,
              image: ride.image || null, // Imagen del vehículo
              origen: ride.departurePoint || "—",
              destino: ride.destinationPoint || "—",
              ruta: ride.route || "—",
              hora: null, // No usamos hora formateada aquí, se formatea en TravelCard
              costo: ride.pricePassenger || "—",
              puestos: availableSeats,
              capacidad: ride.capacity ?? 0,
              availableSeats: availableSeats,
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
              driverId: ride.driverId, // Agregar driverId para poder filtrar
            };
          });

          // Filtrar los viajes del usuario si está autenticado (medida adicional en frontend)
          if (user && user.id) {
            mappedRides = mappedRides.filter(ride => ride.driverId !== user.id);
          }

          // Filtrar viajes sin asientos disponibles
          mappedRides = mappedRides.filter(ride => ride.availableSeats > 0);

          setAllRides(mappedRides); // Guardar todos los viajes
          setRides(mappedRides);
        }
      } catch (error) {
        console.error("Error obteniendo viajes:", error);
        setRides([]);
        setAllRides([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllRides();
  }, [user]);

  // Aplicar filtros cuando cambien
  useEffect(() => {
    if (allRides.length === 0) {
      setRides([]);
      return;
    }

    let filteredRides = [...allRides];

    // Filtrar por capacidad (asientos disponibles)
    if (filters.capacity && filters.capacity !== "") {
      const minCapacity = parseInt(filters.capacity);
      if (!isNaN(minCapacity)) {
        filteredRides = filteredRides.filter(ride => ride.availableSeats === minCapacity);
      }
    }

    // Filtrar por punto de partida
    if (filters.departurePoint && filters.departurePoint.trim() !== "") {
      const searchTerm = filters.departurePoint.trim().toLowerCase();
      filteredRides = filteredRides.filter(ride => {
        const departurePoint = (ride.departurePoint || "").toLowerCase();
        return departurePoint.includes(searchTerm);
      });
    }

    setRides(filteredRides);
  }, [filters, allRides]);

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
        onSuccess={() => {
          // Recargar los viajes después de una solicitud exitosa
          const fetchAllRides = async () => {
            setIsLoading(true);
            try {
              const token = localStorage.getItem("token");
              const headers = token ? { Authorization: `Bearer ${token}` } : {};
              
              const response = await api.get("/rides", { headers });

              if (response.data.success) {
                let mappedRides = response.data.rides.map((ride) => {
                  // Usar nullish coalescing (??) en lugar de || para que 0 no se trate como falsy
                  const availableSeats = ride.availableSeats !== undefined && ride.availableSeats !== null 
                    ? ride.availableSeats 
                    : (ride.capacity ?? 0);
                  
                  return {
                    id: ride.id,
                    image: ride.image || null,
                    origen: ride.departurePoint || "—",
                    destino: ride.destinationPoint || "—",
                    ruta: ride.route || "—",
                    hora: null,
                    costo: ride.pricePassenger || "—",
                    puestos: availableSeats,
                    capacidad: ride.capacity ?? 0,
                    availableSeats: availableSeats,
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
                    driverId: ride.driverId,
                  };
                });

                if (user && user.id) {
                  mappedRides = mappedRides.filter(ride => ride.driverId !== user.id);
                }

                // Filtrar viajes sin asientos disponibles
                mappedRides = mappedRides.filter(ride => ride.availableSeats > 0);

                setAllRides(mappedRides); // Guardar todos los viajes
                // Los filtros se aplicarán automáticamente en el useEffect
              }
            } catch (error) {
              console.error("Error obteniendo viajes:", error);
              setRides([]);
              setAllRides([]);
            } finally {
              setIsLoading(false);
            }
          };

          fetchAllRides();
        }}
      />
    </>
  );
}
