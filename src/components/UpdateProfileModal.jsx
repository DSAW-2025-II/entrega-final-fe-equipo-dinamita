import React from "react";
import Button from "./Button";
import { X } from "lucide-react";

export default function UpdateProfileModal({ isOpen, onClose, field }) {
  if (!isOpen) return null;

  // textos según el campo
  const labels = {
    name: "Nombre",
    lastName: "Apellidos",
    phone: "Número de celular",
  };

  return (
    <div className="absolute top-30 left-150 z-50">
      <div className="relative bg-[#D2D1BE] text-black rounded-3xl p-6 w-80 border-4 border-[#FEF801]">
        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-black hover:text-gray-700"
        >
          <X size={22} />
        </button>

        {/* Título */}
        <h2 className="text-center font-bold text-xl mb-6">
          Actualiza tu dato
        </h2>

        {/* Inputs */}
        <div className="flex flex-col gap-3">
          <input
            type="text"
            placeholder={`Nuevo ${labels[field] || "dato"}`}
            className="w-full bg-[#FFFFFF] text-center rounded-full px-4 py-2 text-sm text-[#1b1b1b] placeholder-[#A2A18A] font-inter font-medium border-gray-300 focus:outline-none shadow-lg shadow-black/20"
          />
          <input
            type="text"
            placeholder="Confirma el dato"
            className="w-full bg-[#FFFFFF] text-center rounded-full px-4 py-2 text-sm text-[#1b1b1b] placeholder-[#A2A18A] font-inter font-medium border-gray-300 focus:outline-none shadow-lg shadow-black/20"
          />
        </div>

        {/* Botón */}
        <div className="flex justify-center mt-6">
          <Button size="smallPlus" variant="primary" onClick={onClose}>
            Aceptar
          </Button>
        </div>
      </div>
    </div>
  );
}
