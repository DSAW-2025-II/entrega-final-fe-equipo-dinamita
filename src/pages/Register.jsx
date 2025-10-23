import React, { useState } from "react";
import Button from "../components/Button";
import api from "../api/axios.js";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    universityId: "",
    contactNumber: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validateEmptyFields = () => {
    let newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) newErrors[key] = "*Por favor, completa este campo.";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

    const handleSubmit = async () => {
    try {
      if (validateEmptyFields()) {
        const res = await api.post('auth/users/register', formData);
        console.log("Registro exitoso:", res.data);
        setErrors({});
      }
    } catch (error) {
      // Manejo de errores del backend: response.data.errors -> { universityId: "...", contactNumber: "...", ... }
      const backendErrors = error.response?.data?.errors;

      const newErrors = {};
      Object.entries(backendErrors).forEach(([key, val]) => {
        if (Array.isArray(val)) newErrors[key] = val.join(", ");
        else if (val && typeof val === "object") newErrors[key] = val.message || JSON.stringify(val);
        else newErrors[key] = String(val);
      });
      // fusiona con errores actuales (por ejemplo campos vacíos) y muestra solo los campos con error
      setErrors(prev => ({ ...prev, ...newErrors }));
      
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // limpiar error específico al escribir (mantiene otros errores)
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  return (
    <div className="w-full min-h-screen bg-black flex flex-col items-center justify-center text-white font-inter overflow-y-auto py-8">

      {/* Título */}
      <div className="bg-[#FEF801] text-[#1B1B1B] font-bold text-lg lg:text-3xl py-2 px-5 lg:px-6 rounded-full mb-2">
        Registro
      </div>

      {/* Contenedor del formulario */}
      <div
        className="bg-[#D2D1BE] w-[280px] lg:w-[410px] rounded-[18px] flex flex-col items-center justify-center gap-2 shadow-md p-6 transition-all duration-300"
      >
        {[
          { name: "name", placeholder: "Nombres" },
          { name: "lastName", placeholder: "Apellidos" },
          { name: "universityId", placeholder: "ID universidad" },
          { name: "contactNumber", placeholder: "Número de contacto" },
          { name: "email", placeholder: "Correo institucional" },
          { name: "password", placeholder: "Contraseña", type: "password" },
        ].map((input, index) => (
  <div
  key={index}
  className="w-full flex flex-col items-start justify-center transition-all duration-200"
>
  <input
    type={input.type || "text"}
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

  {/* Espacio de error dinámico */}
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

      {/* Botón */}
      <Button
        variant="primary"
        size="medium"
        className="mt-2"
        onClick={handleSubmit}
      >
        Ingresar
      </Button>
    </div>
  );
}