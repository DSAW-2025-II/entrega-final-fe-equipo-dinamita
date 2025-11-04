import React, { useState, useEffect } from "react";
import Button from "./Button";
import { X } from "lucide-react";
import api from "../api/axios";

export default function UpdateProfileModal({ isOpen, onClose, field, user, onSuccess }) {
  const [newValue, setNewValue] = useState("");
  const [confirmValue, setConfirmValue] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Resetear campos cuando el modal se abre o cambia el campo
  useEffect(() => {
    if (isOpen) {
      setNewValue("");
      setConfirmValue("");
      setError("");
    }
  }, [isOpen, field]);

  if (!isOpen) return null;

  // Textos según el campo
  const labels = {
    name: "Nombre",
    lastName: "Apellidos",
    phone: "Número de celular",
  };

  // Obtener el valor actual del campo
  const getCurrentValue = () => {
    if (field === "phone") {
      return user?.contactNumber || "";
    }
    return user?.[field] || "";
  };

  // Validar el nuevo valor según el campo
  const validateValue = (value) => {
    if (!value.trim()) {
      return `El ${labels[field]?.toLowerCase()} no puede estar vacío`;
    }

    if (field === "name" || field === "lastName") {
      if (value.trim().length < 2 || value.trim().length > 20) {
        return `El ${labels[field]?.toLowerCase()} debe tener entre 2 y 20 caracteres`;
      }
    } else if (field === "phone") {
      const phoneRegex = /^\d{10}$/;
      if (!phoneRegex.test(value.trim())) {
        return "El número de celular debe tener exactamente 10 dígitos";
      }
    }

    return null;
  };

  // Manejar el submit
  const handleSubmit = async () => {
    setError("");

    // Validar que ambos campos estén completos
    if (!newValue.trim() || !confirmValue.trim()) {
      setError("Por favor, completa ambos campos");
      return;
    }

    // Validar que ambos valores coincidan
    if (newValue.trim() !== confirmValue.trim()) {
      setError("Los valores no coinciden");
      return;
    }

    // Validar el formato del valor
    const validationError = validateValue(newValue);
    if (validationError) {
      setError(validationError);
      return;
    }

    // Validar que el nuevo valor sea diferente al actual
    const currentValue = getCurrentValue();
    if (newValue.trim() === currentValue) {
      setError(`El ${labels[field]?.toLowerCase()} debe ser diferente al actual`);
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const updateData = {};

      // Mapear el campo phone a contactNumber
      if (field === "phone") {
        updateData.contactNumber = newValue.trim();
      } else {
        updateData[field] = newValue.trim();
      }

      const response = await api.patch("/users/profile", updateData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        // Llamar a onSuccess para refrescar el usuario y cerrar el modal
        if (onSuccess) {
          await onSuccess();
        }
        onClose();
      }
    } catch (error) {
      console.error("Error actualizando perfil:", error);
      const backendErrors = error.response?.data?.errors;
      if (backendErrors) {
        // Si hay errores específicos del backend, mostrarlos
        const errorMessage = Object.values(backendErrors).join(", ");
        setError(errorMessage);
      } else {
        setError(error.response?.data?.message || "Error al actualizar. Intenta de nuevo.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !isLoading) {
      handleSubmit();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="relative bg-[#D2D1BE] text-black rounded-3xl p-6 w-80 border-4 border-[#FEF801]">
        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-black hover:text-gray-700"
          disabled={isLoading}
        >
          <X size={22} />
        </button>

        {/* Título */}
        <h2 className="text-center font-bold text-xl mb-6">
          Actualiza tu {labels[field] || "dato"}
        </h2>

        {/* Mensaje de error */}
        {error && (
          <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
            {error}
          </div>
        )}

        {/* Inputs */}
        <div className="flex flex-col gap-3">
          <input
            type={field === "phone" ? "tel" : "text"}
            placeholder={`Nuevo ${labels[field] || "dato"}`}
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-[#FFFFFF] text-center rounded-full px-4 py-2 text-sm text-[#1b1b1b] placeholder-[#A2A18A] font-inter font-medium border-gray-300 focus:outline-none shadow-lg shadow-black/20"
            disabled={isLoading}
          />
          <input
            type={field === "phone" ? "tel" : "text"}
            placeholder="Confirma el dato"
            value={confirmValue}
            onChange={(e) => setConfirmValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full bg-[#FFFFFF] text-center rounded-full px-4 py-2 text-sm text-[#1b1b1b] placeholder-[#A2A18A] font-inter font-medium border-gray-300 focus:outline-none shadow-lg shadow-black/20"
            disabled={isLoading}
          />
        </div>

        {/* Botón */}
        <div className="flex justify-center mt-6">
          <Button 
            size="smallPlus" 
            variant="primary" 
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "Actualizando..." : "Aceptar"}
          </Button>
        </div>
      </div>
    </div>
  );
}
