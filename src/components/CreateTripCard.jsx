import React, { useState, useEffect } from "react";
import Button from "./Button";
import api from "../api/axios";
import { useUser } from "../hooks/useUser";

const CreateTripCard = ({ onSuccess, onError }) => {
  const { user } = useUser();
  const [formData, setFormData] = useState({
    departurePoint: "",
    destinationPoint: "",
    route: "",
    departureTime: "",
    capacity: "",
    pricePassenger: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [vehicleSeats, setVehicleSeats] = useState(null);
  const [isLoadingVehicle, setIsLoadingVehicle] = useState(true);

  // Obtener información del vehículo del usuario
  useEffect(() => {
    const fetchVehicle = async () => {
      if (!user || !user.vehicleId) {
        setIsLoadingVehicle(false);
        return;
      }

      try {
        const token = localStorage.getItem("token");
        const response = await api.get(`/vehicles/${user.vehicleId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success && response.data.vehicle) {
          const vehicle = response.data.vehicle;
          // Obtener la cantidad de asientos (verificar diferentes nombres de campo)
          const seats = vehicle.seats || vehicle.capacity || vehicle.seatCapacity || vehicle.seatsCapacity;
          setVehicleSeats(seats);
        }
      } catch (error) {
        console.error("Error obteniendo vehículo:", error);
      } finally {
        setIsLoadingVehicle(false);
      }
    };

    fetchVehicle();
  }, [user]);

  function isNumbers(str) {
    return /^\d+$/.test(str.trim());
  }

  function validateFields() {
    let newErrors = {};

    // Punto de inicio
    if (!formData.departurePoint.trim())
      newErrors.departurePoint = "*Campo obligatorio.";

    // Punto de llegada
    if (!formData.destinationPoint.trim())
      newErrors.destinationPoint = "*Campo obligatorio.";

    // Ruta
    if (!formData.route.trim()) newErrors.route = "*Campo obligatorio.";

    // Hora de salida
    if (!formData.departureTime.trim()) {
      newErrors.departureTime = "*Campo obligatorio.";
    } else {
      // Validar que la fecha sea futura
      const departureDate = new Date(formData.departureTime);
      const now = new Date();
      
      if (isNaN(departureDate.getTime())) {
        newErrors.departureTime = "¡Fecha y hora no válidas!";
      } else if (departureDate <= now) {
        newErrors.departureTime = "¡La fecha y hora deben ser futuras!";
      }
    }

    // Capacidad (puestos disponibles)
    if (!formData.capacity.trim())
      newErrors.capacity = "*Campo obligatorio.";
    else if (!isNumbers(formData.capacity))
      newErrors.capacity = "¡Solo números!";
    else {
      const capacityNum = Number(formData.capacity);
      if (capacityNum <= 0) {
        newErrors.capacity = "¡Debe ser mayor que 0!";
      } else if (vehicleSeats !== null && capacityNum > vehicleSeats) {
        newErrors.capacity = `¡No puedes ofrecer más puestos (${capacityNum}) de los que tiene tu vehículo (${vehicleSeats})!`;
      }
    }

    // Tarifa pasajero
    if (!formData.pricePassenger.trim())
      newErrors.pricePassenger = "*Campo obligatorio.";
    else if (!isNumbers(formData.pricePassenger))
      newErrors.pricePassenger = "¡Solo números!";
    else if (Number(formData.pricePassenger) <= 0)
      newErrors.pricePassenger = "¡Debe ser mayor que 0!";

    return newErrors;
  }

  const handleSubmit = async () => {
    const newErrors = validateFields();
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      setIsLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await api.post(
          "/rides",
          {
            departurePoint: formData.departurePoint.trim(),
            destinationPoint: formData.destinationPoint.trim(),
            route: formData.route.trim(),
            departureTime: formData.departureTime,
            capacity: parseInt(formData.capacity),
            pricePassenger: parseInt(formData.pricePassenger),
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          // Limpiar el formulario
          setFormData({
            departurePoint: "",
            destinationPoint: "",
            route: "",
            departureTime: "",
            capacity: "",
            pricePassenger: "",
          });
          setErrors({});
          // Llamar a onSuccess si existe
          if (onSuccess) {
            onSuccess(response.data.ride);
          }
        }
      } catch (error) {
        // Manejo de errores similar al de Register
        const backendErrors = error.response?.data?.errors;
        const errorMessage = error.response?.data?.message;
        
        // Si es un error de "viaje en curso", pasarlo al componente padre para mostrar modal
        if (errorMessage && errorMessage.includes("Ya tienes un viaje en curso")) {
          if (onError) {
            onError([errorMessage]);
          }
          setErrors({ general: errorMessage });
        } else if (backendErrors && typeof backendErrors === "object") {
          const newErrors = {};
          Object.entries(backendErrors).forEach(([key, val]) => {
            if (Array.isArray(val)) {
              newErrors[key] = val.join(", ");
            } else if (val && typeof val === "object") {
              newErrors[key] = val.message || JSON.stringify(val);
            } else {
              newErrors[key] = String(val);
            }
          });
          setErrors(newErrors);
        } else {
          // Error general
          const generalError = errorMessage || "Error al crear el viaje. Intenta de nuevo.";
          setErrors({ general: generalError });
        }
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Para pricePassenger, solo permitir números
    if (name === "pricePassenger" || name === "capacity") {
      // Solo permitir dígitos
      const numericValue = value.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    
    // Limpiar error del campo al escribir
    setErrors((prev) => {
      const newErrors = { ...prev };
      delete newErrors[name];
      delete newErrors.general;
      return newErrors;
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  const inputFields = [
    { name: "departurePoint", placeholder: "Punto de inicio", type: "text" },
    { name: "destinationPoint", placeholder: "Punto de llegada", type: "text" },
    { name: "route", placeholder: "Ruta", type: "text" },
    { name: "departureTime", placeholder: "Fecha y hora de salida", type: "datetime-local" },
    { name: "capacity", placeholder: `Puestos disponibles${vehicleSeats !== null ? ` (máx. ${vehicleSeats})` : ""}`, type: "text" },
    { name: "pricePassenger", placeholder: "Tarifa por pasajero", type: "text" },
  ];

  return (
    <div className="flex flex-col items-center">
      <div
        className="bg-[#D2D1BE] w-[280px] lg:w-[410px] rounded-[18px] flex flex-col items-center justify-center gap-2 shadow-md p-6 transition-all duration-300"
        tabIndex={-1}
        onKeyDown={handleKeyDown}
      >
        {/* Error general */}
        {errors.general && (
          <div className="w-full mb-2">
            <span className="text-[#FE0144] text-[12px] lg:text-[14px] font-bold">
              {errors.general}
            </span>
          </div>
        )}

        {inputFields.map((input, index) => (
          <div
            key={index}
            className="w-full flex flex-col items-start justify-center transition-all duration-200"
          >
            <input
              type={input.type}
              name={input.name}
              placeholder={input.placeholder}
              value={formData[input.name]}
              onChange={handleChange}
              disabled={isLoading || (input.name === "capacity" && isLoadingVehicle)}
              className={`w-[240px] lg:w-[360px] h-[38px] lg:h-[50px] rounded-full px-4 lg:px-6 text-[14px] lg:text-[18px] bg-white text-[#1B1B1B] placeholder-[#A2A18A] shadow-md focus:outline-none transition-all font-medium ${
                errors[input.name]
                  ? "border-b-[3px] border-[#FE0144]"
                  : "border-b-[3px] border-transparent"
              } ${isLoading || (input.name === "capacity" && isLoadingVehicle) ? "opacity-50 cursor-not-allowed" : ""}`}
            />
            <div
              className={`transition-all duration-200 ${
                errors[input.name] ? "h-[16px]" : "h-[2px]"
              }`}
            >
              {errors[input.name] && (
                <span className="text-[#FE0144] text-[12px] lg:text-[14px] ml-3 mt-[-6px]">
                  {errors[input.name]}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="primary"
        size="medium"
        className="mt-4"
        onClick={handleSubmit}
        disabled={isLoading || isLoadingVehicle}
      >
        {isLoading ? "Creando..." : "Crear"}
      </Button>
      </div>
    
  );
};

export default CreateTripCard;
