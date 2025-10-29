import React, { useEffect } from "react";
import WillySad from "../assets/WillySad.svg";

const ErrorModal = ({ messages = [], onClose }) => {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="relative bg-[#D8D8C0] rounded-[38px] border-[9px] border-[#FE0144] shadow-md w-[330px] md:w-[430px] py-8 px-4 flex flex-col items-center">
        {/* Botón cerrar X */}
        <button
          onClick={onClose}
          className="absolute top-5 right-6 text-black hover:opacity-60 text-3xl md:text-4xl font-bold"
          aria-label="Cerrar"
        >
          ×
        </button>
        {/* Logo Willy triste */}
        <img
          src={WillySad}
          alt="Error icon"
          className="mx-auto mb-3 w-[120px] h-[120px] select-none"
          draggable="false"
        />
        {/* Mensajes de error */}
        <div className="flex flex-col gap-2 mt-5 mb-2 w-full">
          {messages.map((msg, i) => (
            <p
              key={i}
              className="text-black text-center text-lg md:text-2xl font-extrabold"
            >
              {msg}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ErrorModal;
