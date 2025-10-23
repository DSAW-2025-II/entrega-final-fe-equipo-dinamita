import React, { useState } from "react";
import RegisterCard from "../components/RegisterCard";
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
        Crea tu Cuenta
      </div>

      <RegisterCard
        formData={formData}
        errors={errors}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
