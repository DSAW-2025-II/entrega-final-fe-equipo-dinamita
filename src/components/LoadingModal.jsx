import React from "react";

const LoadingModal = ({ message = "Cargando..." }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[100]">
      <div className="relative bg-[#D8D8C0] rounded-[38px] border-[9px] border-[#FEF801] shadow-md w-[330px] md:w-[430px] py-8 px-4 flex flex-col items-center">
        {/* Spinner */}
        <div className="animate-spin rounded-full h-20 w-20 border-b-4 border-[#1B1B1B] mb-4"></div>
        
        {/* Mensaje */}
        <p className="text-black text-center text-lg md:text-2xl font-extrabold">
          {message}
        </p>
      </div>
    </div>
  );
};

export default LoadingModal;

