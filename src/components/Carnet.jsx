import React from "react";
import Paragraph from "../components/Paragraph";
import Picture from "./Picture";

export default function Carnet({ name, lastName, id, email, number, photo }) {
    return (
    <div className="flex flex-col items-start mt-4">
      {/* CONTENEDOR PRINCIPAL: FOTO + INFO */}
      <div className="flex flex-col lg:flex-row items-center lg:items-start space-x-6">
        {/* FOTO */}
        <div className="w-40 h-40 bg- overflow-hidden flex-shrink-0">
          <Picture photo={photo} />
        </div>

        {/* INFORMACIÓN */}
        <div className="flex flex-col text-left space-y-1 mt-2 lg:mt-0">
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
    </div>
  );
}
