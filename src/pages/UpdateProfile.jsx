import React, { useState } from "react";
import Tittle from "../components/Tittle";
import TopButtons from "../components/TopButtons";
import UpdateProfileModal from "../components/UpdateProfileModal";
import Button from "../components/Button";
import Picture from "../components/Picture";
import LoadingModal from "../components/LoadingModal";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import Paragraph from "../components/Paragraph";

export default function UpdateProfile() {
const [openModal, setOpenModal] = useState(false);
const [selectedField, setSelectedField] = useState("");

const openModalFor = (field) => {
setSelectedField(field);
setOpenModal(true);
};

const navigate = useNavigate();
const { user, isLoading } = useUser();

if (isLoading || !user) {
  return (
    <div className="w-screen h-screen bg-black flex items-center justify-center">
      <LoadingModal message="Cargando..." />
    </div>
  );
}
  return (
    <div className="w-screen h-screen bg-black flex flex-col text-white font-inter">
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
