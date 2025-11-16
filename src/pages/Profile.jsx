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
      <div className="w-screen h-screen bg-black flex flex-col text-white font-inter overflow-x-hidden overflow-y-auto lg:overflow-y-hidden lg:overflow-x-hidden">
        <LoadingModal message="Cargando perfil..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-black flex flex-col text-white font-inter overflow-x-hidden overflow-y-auto lg:overflow-y-hidden">
      {/* TÍTULO */}
      <div className="flex justify-between items-center">
        <Tittle
          variant="primary"
          size="extraLarge"
          className="self-start ml-10 mt-20 lg:mt-6 lg:ml-39">
          Mi perfil
        </Tittle>

        {/* BOTONES DE ARRIBA */}
        <TopButtons />
        </div>
        <div className="mx-auto w-full flex flex-col items-center lg:items-start lg:ml-8 lg:mr-8">
        <Paragraph
        variant="primary"
        size="medium"
        className="text-center self-center ml-0 mt-6 lg:text-left lg:self-start lg:ml-16">
            Tu foto:
        </Paragraph>
        

      {/* CONTENEDOR DE PERFIL */}
        <div className="lg:ml-10 mt-2 flex flex-col items-start space-y-4">
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
        className="mt-10 mx-auto lg:mx-0 lg:ml-7"
        onClick={() => navigate("/update-profile")}
      >
        Actualizar perfil
      </Button>
    </div>
    </div>
  );
}
