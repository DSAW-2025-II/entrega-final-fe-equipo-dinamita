import React from "react";
import Tittle from "../components/Tittle";
import TopButtons from "../components/TopButtons";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import Carnet from "../components/Carnet";
import LoadingModal from "../components/LoadingModal";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

export default function Profile() {
  const navigate = useNavigate();
  const { user, isLoading } = useUser();

  // Mostrar loading mientras se obtienen los datos
  if (isLoading || !user) {
    return (
      <div className="w-screen h-screen bg-black flex items-center justify-center">
        <LoadingModal message="Cargando perfil..." />
      </div>
    );
  }

  return (
    <div className="w-screen h-screen bg-black flex flex-col text-white font-inter">
      {/* TÍTULO */}
      <div className="flex justify-between items-center">
        <Tittle
          variant="primary"
          size="extraLarge"
          className="self-start ml-10 mt-6">
          Tu perfil
        </Tittle>

        {/* BOTONES DE ARRIBA */}
        <TopButtons />
        </div>
        <div className="ml-8">
        <Paragraph
        variant="primary"
        size="medium"
        className="self-start ml-16 mt-6">
            Tu foto:
        </Paragraph>

      {/* CONTENEDOR DE PERFIL */}
      <div className="ml-10 mt-2 flex flex-col items-start space-y-4">
        {/* Info carnet */}
        <Carnet
          name={user.name}
          lastName={user.lastName}
          id={user.universityId}
          email={user.email || ""}
          number={user.contactNumber || ""}
          photo={user.photo || "/perfil.png"}
        />
      </div>
      {/* BOTÓN */}
      <Button
        variant="primary"
        size="medium"
        className="mt-10 ml-7"
        onClick={() => navigate("/update-profile")}
      >
        Actualizar perfil
      </Button>
    </div>
    </div>
  );
}
