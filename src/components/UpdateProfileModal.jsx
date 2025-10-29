import React from "react";
import { X } from "lucide-react"; // ícono de cerrar (de lucide-react)
import Button from "../components/Button"; // tu componente de botón

export default function ModalActualizarDato({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="relative bg-[#D9D9D9] rounded-2xl border-4 border-[#FEF801] w-[340px] p-6 text-black">
        {/* Botón de cerrar */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-black hover:text-gray-700"
        >
          <X size={22} />
        </button>

        {/* Contenido */}
        <h2 className="text-center text-lg font-bold mb-4">
          Actualiza tu dato
        </h2>

        <div className="flex flex-col space-y-3">
          <input
            type="text"
            placeholder="Nuevo [feature]"
            className="px-3 py-2 rounded-md border border-gray-400 w-full text-sm focus:outline-none focus:ring-2 focus:ring-[#FEF801]"
          />
          <input
            type="text"
            placeholder="Confirma el dato"
            className="px-3 py-2 rounded-md border border-gray-400 w-full text-sm focus:outline-none focus:ring-2 focus:ring-[#FEF801]"
          />
        </div>

        {/* Botón aceptar */}
        <div className="flex justify-center mt-5">
          <Button
            variant="primary"
            size="medium"
            onClick={() => alert("Dato actualizado")}
          >
            Aceptar
          </Button>
        </div>
      </div>
    </div>
  );
}
