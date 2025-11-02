import React, { useState } from "react";
import Button from "./Button";

const CreateTripCard = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    startPoint: "",
    endPoint: "",
    route: "",
    departureTime: "",
    availableSeats: "",
    passengerFare: "",
  });

  const [errors, setErrors] = useState({});

  function isNumbers(str) {
    return /^\d+$/.test(str.trim());
  }

  function validateFields() {
    let newErrors = {};

    // Punto de inicio
    if (!formData.startPoint.trim())
      newErrors.startPoint = "*Campo obligatorio.";

    // Punto de llegada
    if (!formData.endPoint.trim())
      newErrors.endPoint = "*Campo obligatorio.";

    // Ruta
    if (!formData.route.trim()) newErrors.route = "*Campo obligatorio.";

    // Hora de salida
    if (!formData.departureTime.trim())
      newErrors.departureTime = "*Campo obligatorio.";

    // Puestos disponibles
    if (!formData.availableSeats.trim())
      newErrors.availableSeats = "*Campo obligatorio.";
    else if (!isNumbers(formData.availableSeats))
      newErrors.availableSeats = "¡Solo números!";
    else if (Number(formData.availableSeats) <= 0)
      newErrors.availableSeats = "¡Debe ser mayor que 0!";

    // Tarifa pasajero
    if (!formData.passengerFare.trim())
      newErrors.passengerFare = "*Campo obligatorio.";
    else if (!isNumbers(formData.passengerFare))
      newErrors.passengerFare = "¡Solo números!";
    else if (Number(formData.passengerFare) <= 0)
      newErrors.passengerFare = "¡Debe ser mayor que 0!";

    return newErrors;
  }

  const handleSubmit = () => {
    const newErrors = validateFields();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      onSuccess(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSubmit();
  };

  return (
    <div className="flex flex-col items-center">
      <div
        className="bg-[#D2D1BE] w-[280px] lg:w-[410px] rounded-[18px] flex flex-col items-center justify-center gap-2 shadow-md p-6 transition-all duration-300"
        tabIndex={-1}
        onKeyDown={handleKeyDown}
      >
        {[
          { name: "startPoint", placeholder: "Punto de inicio" },
          { name: "endPoint", placeholder: "Punto de llegada" },
          { name: "route", placeholder: "Ruta" },
          { name: "departureTime", placeholder: "Hora de salida" },
          { name: "availableSeats", placeholder: "Puestos disponibles" },
          { name: "passengerFare", placeholder: "Tarifa pasajero" },
        ].map((input, index) => (
          <div
            key={index}
            className="w-full flex flex-col items-start justify-center transition-all duration-200"
          >
            <input
              type="text"
              name={input.name}
              placeholder={input.placeholder}
              value={formData[input.name]}
              onChange={handleChange}
              className={`w-[240px] lg:w-[360px] h-[38px] lg:h-[50px] rounded-full px-4 lg:px-6 text-[14px] lg:text-[18px] bg-white text-[#1B1B1B] placeholder-[#A2A18A] shadow-md focus:outline-none transition-all font-medium ${
                errors[input.name]
                  ? "border-b-[3px] border-[#FE0144]"
                  : "border-b-[3px] border-transparent"
              }`}
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
      >
        Crear
      </Button>
      </div>
    
  );
};

export default CreateTripCard;
