import React, { useState, useEffect, useCallback } from "react";
import RegisterCard from "../components/RegisterCard";
import UploadProfileModal from "../components/UploadProfileModal.jsx";
import ErrorModal from "../components/ErrorModal.jsx";
import SuccessModal from "../components/SuccessModal";
import LoadingModal from "../components/LoadingModal";
import api from "../api/axios.js";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userFormData, setUserFormData] = useState(null);
  const [errorMessages, setErrorMessages] = useState([]); // Para mostrar mensajes error modal
  const [isLoading, setIsLoading] = useState(false); // loading para registro
  const [isSuccess, setIsSuccess] = useState(false); // modal de éxito

  // Handler cuando el RegisterCard valida todo OK
  const handleRegisterSuccess = (formValues) => {
    setUserFormData(formValues);
    setIsModalOpen(true);
  };

  // Handler omitir (subir datos a db sin foto - el backend usará el default)
  const handleModalSkip = async () => {
    if (!userFormData) return;
    setIsLoading(true);
    try {
      // Crear FormData sin foto - el backend usará el base64 por defecto
      const formDataToSend = new FormData();
      formDataToSend.append("name", userFormData.name);
      formDataToSend.append("lastName", userFormData.lastName);
      formDataToSend.append("universityId", userFormData.universityId);
      formDataToSend.append("email", userFormData.email);
      formDataToSend.append("contactNumber", userFormData.contactNumber);
      formDataToSend.append("password", userFormData.password);

      const res = await api.post("auth/users/register", formDataToSend);
      if (res.data.success) {
        setIsModalOpen(false);
        setUserFormData(null);
        setIsSuccess(true); // mostrar modal de éxito
        
      } else {
        let msgs = [];
        if (res.data.errors) {
          if (res.data.errors.universityId)
            msgs.push(res.data.errors.universityId);
          if (res.data.errors.email) msgs.push(res.data.errors.email);
        }
        setIsModalOpen(false);
        setErrorMessages(
          msgs.length > 0 ? msgs : ["Error de registro. Intenta de nuevo."],
        );
      }
    } catch (error) {
      let msgs = [];
      const backendErrors = error.response?.data?.errors;
      if (backendErrors) {
        if (backendErrors.universityId) msgs.push(backendErrors.universityId);
        if (backendErrors.email) msgs.push(backendErrors.email);
      }
      if (msgs.length === 0)
        msgs.push("No se pudo completar el registro. Intenta de nuevo.");
      setIsModalOpen(false);
      setErrorMessages(msgs);
    } finally {
      setIsLoading(false);
    }
  };

  // Handler para aceptar con foto
  const handleModalPhotoUpload = async (file) => {
    if (!userFormData) return;
    setIsLoading(true);

    try {
      // Crear FormData con archivo
      const formDataToSend = new FormData();
      formDataToSend.append("name", userFormData.name);
      formDataToSend.append("lastName", userFormData.lastName);
      formDataToSend.append("universityId", userFormData.universityId);
      formDataToSend.append("email", userFormData.email);
      formDataToSend.append("contactNumber", userFormData.contactNumber);
      formDataToSend.append("password", userFormData.password);
      formDataToSend.append("photo", file); // Archivo directamente

      const res = await api.post('auth/users/register', formDataToSend);
      if (res.data.success) {
        setIsModalOpen(false);
        setUserFormData(null);
        setIsSuccess(true);
        
      } else {
        let msgs = [];
        if (res.data.errors) {
          if (res.data.errors.universityId) msgs.push(res.data.errors.universityId);
          if (res.data.errors.email) msgs.push(res.data.errors.email);
        }
        setIsModalOpen(false);
        setErrorMessages(msgs.length > 0 ? msgs : ["Error de registro. Intenta de nuevo."]);
      }
    } catch (error) {
      let msgs = [];
      const backendErrors = error.response?.data?.errors;
      if (backendErrors) {
        if (backendErrors.universityId) msgs.push(backendErrors.universityId);
        if (backendErrors.email) msgs.push(backendErrors.email);
      }
      if (msgs.length === 0) msgs.push("No se pudo completar el registro. Intenta de nuevo.");
      setIsModalOpen(false);
      setErrorMessages(msgs);
    } finally {
      setIsLoading(false);
    }
  };

  const handleErrorModalClose = () => {
    setErrorMessages([]);
    setUserFormData(null);
    setIsModalOpen(false);
  };

  const handleSuccessClose = useCallback(() => {
    setIsSuccess(false);
    navigate('/login');
  }, [navigate]);

  // Auto-cerrar el modal de éxito después de 2 segundos
  useEffect(() => {
    if (isSuccess) {
      const timer = setTimeout(() => {
        handleSuccessClose();
      }, 2000);

      // Limpiar el timer si el componente se desmonta o el modal se cierra manualmente
      return () => clearTimeout(timer);
    }
  }, [isSuccess, handleSuccessClose]);

  return (
    <div className="w-full min-h-screen bg-black flex flex-col items-center justify-center text-white font-inter overflow-y-auto py-8">
      <div className="bg-[#FEF801] text-[#1B1B1B] font-bold text-lg lg:text-3xl py-2 px-5 lg:px-6 rounded-full mb-2">
        Crea tu Cuenta
      </div>
      {isLoading && <LoadingModal message="Procesando registro..." />}
      {isSuccess && <SuccessModal message={"¡Registro exitoso!"} onClose={handleSuccessClose} />}
      {errorMessages.length > 0 ? (
        <ErrorModal messages={errorMessages} onClose={handleErrorModalClose} />
      ) : !isModalOpen ? (
        <RegisterCard onSuccess={handleRegisterSuccess} />
      ) : (
        <UploadProfileModal
          isOpen={isModalOpen}
          onUpload={handleModalPhotoUpload}
          onSkip={handleModalSkip}
          isLoading={isLoading}
        />
      )}
    </div>
  );
}
