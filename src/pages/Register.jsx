import React, { use } from "react";

import Button from "../components/Button";


export default function Register() {
  const[name, setName] = useState("");
  const[lastName, setLastName] = useState("");
  const[universityID, setUniversityID] = useState("");
  const[contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const validate = () => {
    if(!name || !lastName || !universityID || !contactNumber || !email || !password){
      setError ("Por favor, complete todos los campos.");
      return false;
    }
  }


  return (

    <div className="w-full h-screen bg-black flex flex-col items-center justify-center text-white font-inter overflow-hidden">

      {/* Título */}
      <div className="bg-[#FEF801] text-[#1B1B1B] font-bold text-lg lg:text-3xl py-2 px-5 lg:px-6 rounded-full mb-6 lg:mb-3">
        Registro
      </div>

      {/* Contenedor formulario */}
      <div className="bg-[#D2D1BE] w-[280px] lg:w-[410px] h-[180px] lg:h-[370px] rounded-[18px] flex flex-col items-center justify-center gap-2 lg:gap-2 shadow-md p-2 lg:p-4">
        <input
          type="text"
          placeholder="Nombres"
          className="w-[240px] lg:w-[360px] h-[38px] lg:h-[50px] rounded-full px-4 lg:px-6 text-[14px] lg:text-[20px] text-[#A2A18A] placeholder-[#A2A18A] bg-white shadow-md focus:outline-none"
        />
        <input
          type="text"
          placeholder="Apellidos"
          className="w-[240px] lg:w-[360px] h-[38px] lg:h-[50px] rounded-full px-4 lg:px-6 text-[14px] lg:text-[20px] text-[#A2A18A] placeholder-[#A2A18A] bg-white shadow-md focus:outline-none"
        />
        <input
          type="text"
          placeholder="ID universidad"
          className="w-[240px] lg:w-[360px] h-[38px] lg:h-[50px] rounded-full px-4 lg:px-6 text-[14px] lg:text-[20px] text-[#A2A18A] placeholder-[#A2A18A] bg-white shadow-md focus:outline-none"
        />
        <input
          type="tel"
          placeholder="Número de contacto"
          className="w-[240px] lg:w-[360px] h-[38px] lg:h-[50px] rounded-full px-4 lg:px-6 text-[14px] lg:text-[20px] text-[#A2A18A] placeholder-[#A2A18A] bg-white shadow-md focus:outline-none"
        />
        <input
          type="email"
          placeholder="Correo institucional"
          className="w-[240px] lg:w-[360px] h-[38px] lg:h-[50px] rounded-full px-4 lg:px-6 text-[14px] lg:text-[20px] text-[#A2A18A] placeholder-[#A2A18A] bg-white shadow-md focus:outline-none"
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="w-[240px] lg:w-[360px] h-[38px] lg:h-[50px] rounded-full px-4 lg:px-6 text-[14px] lg:text-[20px] text-[#A2A18A] placeholder-[#A2A18A] bg-white shadow-md focus:outline-none"
        />
      </div>

      {/* Botón */}
      <Button
        variant="primary"
        size="medium"
        className="mt-2"
        onClick={() => console.log('Login clicked')}
      >
        Registrar
      </Button>

    </div>

  );
}