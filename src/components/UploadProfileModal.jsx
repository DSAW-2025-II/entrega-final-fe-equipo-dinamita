
import React from 'react';

const UploadProfileModal = ({ isOpen, onClose, onUpload }) => {
  if (!isOpen) return null;

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && onUpload) {
      onUpload(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && onUpload) {
      onUpload(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      {/* Modal Container */}
      <div className="relative w-[668px] h-[906px] bg-custom-beige border-[17px] border-custom-yellow rounded-78">
        
        {/* Botón Cerrar */}
        <button 
          onClick={onClose}
          className="absolute w-18 h-18 top-[35px] right-[35px] text-black hover:opacity-70 transition-opacity"
        >
          <span className="material-symbols-outlined text-6xl">
            close
          </span>
        </button>
        
        {/* Título */}
        <div className="absolute w-[620px] h-[85px] left-[24px] top-[127px] bg-custom-yellow rounded-52 flex items-center justify-center">
          <h1 className="text-black font-bold text-[54px] leading-[65px] text-center">
            Sube tu foto de perfil
          </h1>
        </div>
        
        {/* Área de Subida */}
        <div 
          className="absolute w-[419px] h-[386px] left-[125px] top-[260px] bg-custom-dark-beige border-[7px] border-[#1B1B1B] rounded-23 flex items-center justify-center cursor-pointer hover:bg-custom-beige transition-colors"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => document.getElementById('file-input').click()}
        >
          {/* Input de archivo oculto */}
          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          
          {/* Icono de Subida */}
          <div className="text-[#1B1B1B] flex flex-col items-center">
            <span className="material-symbols-outlined text-[234px]">
              upload
            </span>
            <p className="text-2xl font-bold mt-4">Haz clic para subir</p>
          </div>
        </div>
        
        {/* Botón Aceptar */}
        <button 
          onClick={onClose}
          className="absolute w-[294px] h-[88px] left-[187px] top-[751px] bg-custom-yellow rounded-52 flex items-center justify-center hover:bg-opacity-80 transition-all"
        >
          <span className="text-black font-bold text-[56px] leading-[68px]">
            Aceptar
          </span>
        </button>
      </div>
    </div>
  );
};

export default UploadProfileModal;