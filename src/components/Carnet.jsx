import React from "react";
import Paragraph from "../components/Paragraph";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import Picture from "./Picture";

export default function Carnet({ name, lastName, id, email, number, photo }) {
const navigate = useNavigate();
    return (
    <div className="flex flex-col items-start mt-4">
      {/* CONTENEDOR PRINCIPAL: FOTO + INFO */}
      <div className="flex items-start space-x-6">
        {/* FOTO */}
        <div className="w-40 h-40 bg- overflow-hidden flex-shrink-0">
          <Picture photo={photo} />
        </div>

        {/* INFORMACIÓN */}
        <div className="flex flex-col text-left space-y-1">
          <Paragraph size="medium">
            <span className="text-[#FEF801]">Nombre:</span>{" "}
            <span className="text-white">
              {name} {lastName}
            </span>
          </Paragraph>

          <Paragraph size="medium">
            <span className="text-[#FEF801]">ID:</span>{" "}
            <span className="text-white">{id}</span>
          </Paragraph>

          <Paragraph size="medium">
            <span className="text-[#FEF801]">Correo:</span>{" "}
            <span className="text-white">{email}</span>
          </Paragraph>

          <Paragraph size="medium">
            <span className="text-[#FEF801]">Número:</span>{" "}
            <span className="text-white">{number}</span>
          </Paragraph>
        </div>
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
  );
}
