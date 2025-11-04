import React, { useState, useEffect } from "react";
import Tittle from "../components/Tittle";
import TopButtons from "../components/TopButtons";
import UpdateProfileModal from "../components/UpdateProfileModal";
import Button from "../components/Button";
import Picture from "../components/Picture";
import LoadingModal from "../components/LoadingModal";
import SuccessModal from "../components/SuccessModal";
import ErrorModal from "../components/ErrorModal";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import Paragraph from "../components/Paragraph";
import api from "../api/axios";

export default function UpdateProfile() {
const [openModal, setOpenModal] = useState(false);
const [selectedField, setSelectedField] = useState("");
const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
const [isSuccess, setIsSuccess] = useState(false);
const [errorMessages, setErrorMessages] = useState([]);

const openModalFor = (field) => {
setSelectedField(field);
setOpenModal(true);
};

const navigate = useNavigate();
const { user, isLoading, refreshUser } = useUser();

// Auto-cerrar el modal de éxito después de 1.5 segundos
useEffect(() => {
  if (isSuccess) {
    const timer = setTimeout(() => {
      setIsSuccess(false);
    }, 1500);

    // Limpiar el timer si el componente se desmonta o el modal se cierra manualmente
    return () => clearTimeout(timer);
  }
}, [isSuccess]);

const handlePhotoUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) {
    setErrorMessages(["Por favor, selecciona una imagen válida"]);
    return;
  }

  setIsUploadingPhoto(true);
  try {
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("photo", file);

    const response = await api.patch("/users/photo", formData, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (response.data.success) {
      setIsSuccess(true);
      // Refrescar la información del usuario
      await refreshUser();
    }
  } catch (error) {
    console.error("Error actualizando foto:", error);
    setErrorMessages(["Error al actualizar la foto. Intenta de nuevo."]);
  } finally {
    setIsUploadingPhoto(false);
    e.target.value = ""; // Reset input
  }
};

if (isLoading || !user) {
  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center">
      <LoadingModal message="Cargando..." />
    </div>
  );
}
  return (
    <div className="w-screen h-screen bg-black flex flex-col text-white font-inter">
      {isUploadingPhoto && <LoadingModal message="Actualizando foto de perfil..." />}
      {isSuccess && (
        <SuccessModal
          message="¡Datos actualizados exitosamente!"
          onClose={() => setIsSuccess(false)}
        />
      )}
      {errorMessages.length > 0 && (
        <ErrorModal
          messages={errorMessages}
          onClose={() => setErrorMessages([])}
        />
      )}

        <div className="flex justify-between items-center">
        <Tittle
            variant="primary"
            size="extraLarge"
            className="self-start ml-10 mt-6">
                Actualiza tus datos
        </Tittle>

        <TopButtons />
        </div>

      {/* Sección de foto */}
      <div className="flex items-start gap-8 mt-4">
    {/* Columna izquierda: texto + foto */}
    <div className="flex flex-col items-start ml-3">
        <Paragraph 
        size="medium" 
        color="text-[#FEF801]" 
        className="mb-2 ml-21 mt-2">
        Tu foto:
        </Paragraph>
        <Picture photo={user.photo || "/perfil.png"} className="ml-15 mt-[1rem]"/>
        
        {/* Botón para actualizar foto */}
        <div className="mt-4 ml-15">
          <label className="block">
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
              id="photo-upload"
            />
            <Button
              variant="primary"
              size="semi"
              className="!py-1 !px-4"
              onClick={() => document.getElementById('photo-upload').click()}
            >
              Actualizar foto
            </Button>
          </label>
        </div>
    </div>

    {/* Columna derecha: botones */}
    <div className="flex flex-col gap-3 mt-19">
        <Button
        variant="primary"
        size="semi"
        className="!py-1 !px-4"
        onClick={() => openModalFor("name")}
        >
        Nombre
        </Button>
        <Button
        variant="primary"
        size="semi"
        className="!py-1 !px-4"
        onClick={() => openModalFor("lastName")}
        >
        Apellidos
        </Button>
        <Button
        variant="primary"
        size="semi"
        className="!py-1 !px-4"
        onClick={() => openModalFor("phone")}
        >
        Número de celular
        </Button>
    </div>
    </div>

    {/* Modal */}
    <UpdateProfileModal
      isOpen={openModal}
      onClose={() => setOpenModal(false)}
      field={selectedField}
      user={user}
      onSuccess={async () => {
        // Refrescar la información del usuario después de actualizar
        await refreshUser();
        setIsSuccess(true);
      }}
    />

    <button
    className="text-[#FEF801] hover:underline cursor-pointer font-bold text-xl mt-50 ml-0 mb-6"
    onClick={() => navigate("/profile")}
    style={{ textShadow: "0 0 6px rgba(0,0,0,0.8)" }}>
        Volver
    </button>    
    </div>

  );
}
