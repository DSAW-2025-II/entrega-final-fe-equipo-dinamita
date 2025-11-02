import React from "react";
import Tittle from "../components/Tittle";
import TopButtons from "../components/TopButtons";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import Carnet from "../components/Carnet";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const navigate = useNavigate();

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
          name="[name]"
          lastName="[lastName]"
          id="[id]"
          email="[email]"
          number="[number]"
          photo="/perfil.png"
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
