import React, { useState } from "react";
import LoadingModal from "./LoadingModal";

const VALID_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/webp",
];

const UploadProfileModal = ({ isOpen, onUpload, onSkip, isLoading = false }) => {
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");

  const validateAndSetFile = (file) => {
    if (file && VALID_IMAGE_TYPES.includes(file.type)) {
      setSelectedFile(file);
      setError("");
      const reader = new FileReader();
      reader.onload = (e) => setPreviewUrl(e.target.result);
      reader.readAsDataURL(file);
    } else {
      setError("Debes subir una imagen válida (jpg, png o webp)");
      setSelectedFile(null);
      setPreviewUrl(null);
    }
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    validateAndSetFile(file);
  };
  
  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    validateAndSetFile(file);
  };
  
  const handleDragOver = (event) => {
    event.preventDefault();
  };

  // Botón omitir
  const handleSkip = () => {
    onSkip && onSkip();
  };

  // Botón aceptar
  const handleAccept = () => {
    if (!selectedFile) {
      setError("Primero debes subir una foto de perfil válida.");
      return;
    }
    if (!VALID_IMAGE_TYPES.includes(selectedFile.type)) {
      setError("Archivo inválido. Debe ser jpg, png o webp");
      return;
    }
    setError("");
    onUpload && onUpload(selectedFile);
  };

  if (!isOpen) return null;

  return (
    <>
      {isLoading && <LoadingModal message="Procesando registro..." />}
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
        <div className="relative bg-[#D8D8C0] w-[370px] md:w-[420px] rounded-[45px] border-[10px] border-[#fefa01] shadow-xl flex flex-col items-center px-5 pt-5 pb-8">
          {/* Título */}
          <div className="w-full flex justify-center mb-3">
            <span className="bg-[#fefa01] rounded-full px-5 py-2 text-black font-extrabold text-xl md:text-2xl">
              Sube tu foto de perfil
            </span>
          </div>

          {/* Área de upload y preview */}
          <div className="flex flex-col items-center justify-center">
            <div
              className="w-[205px] h-[205px] bg-[#BBBCAB] rounded-[20px] border-4 border-black flex items-center justify-center cursor-pointer mb-4 overflow-hidden"
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => document.getElementById("file-input").click()}
              style={{ transition: "background 0.2s" }}
            >
              <input
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="preview"
                  className="object-cover w-full h-full"
                />
              ) : (
                <svg
                  width="85"
                  height="85"
                  viewBox="0 0 85 85"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="85" height="85" rx="15" fill="none" />
                  <path
                    d="M42.5 63V28M42.5 28L28 42.5M42.5 28L57 42.5"
                    stroke="#181818"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <rect
                    x="18"
                    y="60"
                    width="49"
                    height="6"
                    rx="3"
                    fill="#181818"
                  />
                </svg>
              )}
            </div>
            {/* Mensaje error */}
            {error && (
              <div className="text-[#FE0144] w-full text-center text-sm mb-2">
                {error}
              </div>
            )}
          </div>

          {/* Botones Omitir y Aceptar */}
          <div className="flex w-full justify-evenly mt-1">
            <button
              onClick={handleSkip}
              disabled={isLoading}
              className="bg-[#BBBCAB] text-black font-extrabold text-lg rounded-full px-7 py-2 shadow-inner border-2 border-black hover:bg-[#A0A090] focus:outline-none transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Omitir
            </button>
            <button
              onClick={handleAccept}
              disabled={isLoading}
              className="bg-[#FEFA01] text-black font-extrabold text-lg rounded-full px-7 py-2 border-2 border-[#FEFA01] hover:bg-[#EFEA10] shadow-inner focus:outline-none transition duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UploadProfileModal;
