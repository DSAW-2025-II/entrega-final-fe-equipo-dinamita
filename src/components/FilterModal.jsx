import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import Button from "./Button";

export default function FilterModal({ isOpen, onClose, onCloseWithoutClear, filters, setFilters }) {
  const [localFilters, setLocalFilters] = useState({
    capacity: "",
    departurePoint: ""
  });

  // Sincronizar filtros locales con los filtros del padre cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      setLocalFilters({
        capacity: filters.capacity || "",
        departurePoint: filters.departurePoint || ""
      });
    }
  }, [isOpen, filters]);

  // Cerrar modal con tecla Escape (sin limpiar filtros)
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape" && isOpen) {
        if (onCloseWithoutClear) {
          onCloseWithoutClear();
        } else if (onClose) {
          onClose();
        }
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleEscape);
    }

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose, onCloseWithoutClear]);

  const handleSearch = (e) => {
    e?.stopPropagation();
    const newFilters = {
      capacity: localFilters.capacity,
      departurePoint: localFilters.departurePoint.trim()
    };
    setFilters(newFilters);
    // Cerrar sin limpiar filtros
    if (onCloseWithoutClear) {
      onCloseWithoutClear();
    } else if (onClose) {
      onClose();
    }
  };

  const handleClearFilters = () => {
    setLocalFilters({ capacity: "", departurePoint: "" });
    setFilters({ capacity: "", departurePoint: "" });
  };

  if (!isOpen) return null;

  return (
      <div className="absolute top-full left-4 lg:left-0 lg:right-0 lg:mt-3 bg-[#1B1B1B] border-4 border-[#FEF801] rounded-3xl p-6 w-80 shadow-[0_4px_8px_rgba(0,0,0,0.6)] z-50">
        {/* Botón de cerrar */}
        <button
          onClick={() => {
            if (onCloseWithoutClear) {
              onCloseWithoutClear();
            } else if (onClose) {
              onClose();
            }
          }}
          className="absolute top-3 right-3 text-[#FEF801] hover:text-white"
        >
          <X size={22} />
        </button>

        {/* Select */}
        <div className="flex flex-col mb-4">
          <select 
            value={localFilters.capacity}
            onChange={(e) => setLocalFilters({ ...localFilters, capacity: e.target.value })}
            className="w-full bg-[#FEF801] text-black text-lg font-semibold rounded-full px-4 py-3 font-inter font-medium focus:outline-none cursor-pointer"
          >
            <option value="">Capacidad</option>
            <option value="1">1 persona</option>
            <option value="2">2 personas</option>
            <option value="3">3 personas</option>
            <option value="4">4 personas</option>
          </select>
        </div>

        {/* Input */}
        <input
          type="text"
          placeholder="Punto de partida"
          value={localFilters.departurePoint}
          onChange={(e) => setLocalFilters({ ...localFilters, departurePoint: e.target.value })}
          className="w-full rounded-full px-4 py-3 text-lg bg-[#FFFFFF] text-[#1b1b1b] placeholder-[#A2A18A] font-inter font-medium focus:outline-none mb-6"
        />

        {/* Botones borrar filtros y buscar */}
        <div className="flex justify-center gap-3">
          <Button
            variant="primary"
            size="smallPlus"
            onClick={handleClearFilters}
            className="font-bold"
          >
            Borrar filtros
          </Button>
          <Button
            variant="primary"
            size="smallPlus"
            onClick={handleSearch}
            className="font-bold"
          >
            Buscar
          </Button>
        </div>
      </div>

  );
}
