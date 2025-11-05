import React from "react";
import { X } from "lucide-react";
import Button from "./Button";

export default function FilterModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
      <div className="absolute top-full -left-10 lg:right-0 lg:mt-3 bg-[#1B1B1B] border-4 border-[#FEF801] rounded-3xl p-6 w-80 shadow-[0_4px_8px_rgba(0,0,0,0.6)] z-50">
        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-[#FEF801] hover:text-white"
        >
          <X size={22} />
        </button>

        {/* Select */}
        <div className="flex flex-col mb-4">
          <select className="w-full bg-[#FEF801] text-black text-lg font-semibold rounded-full px-4 py-3 font-inter font-medium focus:outline-none cursor-pointer">
            <option value="">Capacidad</option>
            <option value="2">2 personas</option>
            <option value="3">3 personas</option>
            <option value="4">4 personas</option>
          </select>
        </div>

        {/* Input */}
        <input
          type="text"
          placeholder="Punto de partida"
          className="w-full rounded-full px-4 py-3 text-lg bg-[#FFFFFF] text-[#1b1b1b] placeholder-[#A2A18A] font-inter font-medium focus:outline-none mb-6"
        />

        {/* Botón borrar filtros */}
        <div className="flex justify-center">
          <Button
            variant="primary"
            size="smallPlus"
            onClick={onClose}
            className="font-bold"
          >
            Borrar filtros
          </Button>
        </div>
      </div>

  );
}
