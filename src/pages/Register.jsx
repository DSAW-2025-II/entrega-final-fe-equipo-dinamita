import React, { useState } from "react";
import RegisterCard from "../components/RegisterCard";
import UploadProfileModal from "../components/UploadProfileModal.jsx";
import ErrorModal from "../components/ErrorModal.jsx";
import api from "../api/axios.js";

export default function Register() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userFormData, setUserFormData] = useState(null); 
  const [errorMessages, setErrorMessages] = useState([]); // Para mostrar mensajes error modal

  // Handler cuando el RegisterCard valida todo OK
  const handleRegisterSuccess = (formValues) => {
    setUserFormData(formValues); 
    setIsModalOpen(true);
  };

  // Handler omitir (subir datos a db sin foto)
  const handleModalSkip = async () => {
    if (!userFormData) return;
    try {
      const res = await api.post('auth/users/register', userFormData);
      if (res.data.success) {
        setIsModalOpen(false);
        setUserFormData(null);
        window.location.href = "/login";
      } else {
        // Si el backend retorna errores conocidos, muestra en el modal visual
        let msgs = [];
        if (res.data.errors) {
          if (res.data.errors.universityId) msgs.push(res.data.errors.universityId);
          if (res.data.errors.email) msgs.push(res.data.errors.email);
        }
        setIsModalOpen(false);
        setErrorMessages(msgs.length > 0 ? msgs : ["Error de registro. Intenta de nuevo."]);
      }
    } catch (error) {
      // Error de red o estructura inesperada
      let msgs = [];
      const backendErrors = error.response?.data?.errors;
      if (backendErrors) {
        if (backendErrors.universityId) msgs.push(backendErrors.universityId);
        if (backendErrors.email) msgs.push(backendErrors.email);
      }
      if (msgs.length === 0) msgs.push("No se pudo completar el registro. Intenta de nuevo.");
      setIsModalOpen(false);
      setErrorMessages(msgs);
    }
  };

  // Handler aceptar (por ahora deshabilitado/no hace nada)
  const handleModalAccept = async () => {
    alert("La funcionalidad de subir foto estará disponible pronto.");
  };

  // Cerrar modal de error: vuelve a mostrar form register
  const handleErrorModalClose = () => {
    setErrorMessages([]);
    setUserFormData(null);
    setIsModalOpen(false);
  };

  return (
    <div className="w-full min-h-screen bg-black flex flex-col items-center justify-center text-white font-inter overflow-y-auto py-8">
      <div className="bg-[#FEF801] text-[#1B1B1B] font-bold text-lg lg:text-3xl py-2 px-5 lg:px-6 rounded-full mb-2">
        Crea tu Cuenta
      </div>

      {errorMessages.length > 0 ? (
        <ErrorModal messages={errorMessages} onClose={handleErrorModalClose} />
      ) : !isModalOpen ? (
        <RegisterCard onSuccess={handleRegisterSuccess} />
      ) : (
        <UploadProfileModal
          isOpen={isModalOpen}
          onClose={handleModalAccept}
          onSkip={handleModalSkip}
        />
      )}
    </div>
  );
}
