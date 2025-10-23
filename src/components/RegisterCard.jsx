import React from "react";
import Button from './Button';

const RegisterCard = ({ 
  formData, 
  errors, 
  handleChange, 
  handleSubmit 
}) => {
  return (
    <>
      {/* Contenedor del formulario */}
      <div className="bg-[#D2D1BE] w-[280px] lg:w-[410px] rounded-[18px] flex flex-col items-center justify-center gap-2 shadow-md p-6 transition-all duration-300">
        {[
          { name: "name", placeholder: "Nombres" },
          { name: "lastName", placeholder: "Apellidos" },
          { name: "universityId", placeholder: "ID universidad" },
          { name: "contactNumber", placeholder: "Número de contacto" },
          { name: "email", placeholder: "Correo institucional" },
          { name: "password", placeholder: "Contraseña", type: "password" },
        ].map((input, index) => (
          <div
            key={index}
            className="w-full flex flex-col items-start justify-center transition-all duration-200"
          >
            <input
              type={input.type || "text"}
              name={input.name}
              placeholder={input.placeholder}
              value={formData[input.name]}
              onChange={handleChange}
              className={`w-[240px] lg:w-[360px] h-[38px] lg:h-[50px] rounded-full px-4 lg:px-6 text-[14px] lg:text-[18px] bg-white text-[#1B1B1B] placeholder-[#A2A18A] shadow-md focus:outline-none transition-all font-medium ${
                errors[input.name]
                  ? "border-b-[3px] border-[#FE0144]"
                  : "border-b-[3px] border-transparent"
              }`}
            />

            {/* Espacio de error dinámico */}
            <div
              className={`transition-all duration-200 ${
                errors[input.name] ? "h-[16px]" : "h-[2px]"
              }`}
            >
              {errors[input.name] && (
                <span className="text-[#FE0144] text-[12px] lg:text-[14px] ml-3 mt-[-6px]">
                  {errors[input.name]}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Botón */}
      <Button
        variant="primary"
        size="medium"
        className="mt-2"
        onClick={handleSubmit}
      >
        Registrar
      </Button>
    </>
  );
};

export default RegisterCard;