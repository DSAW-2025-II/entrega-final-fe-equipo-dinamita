import React from "react";
import Tittle from "../components/Tittle";
import Button from "../components/Button";
import TopButtons from "../components/TopButtons";

export default function RegisterCar() {
  return (
    <div className="relative w-full min-h-screen bg-black flex flex-col pt-8 pb-10 px-2 font-inter overflow-hidden lg:h-screen lg:overflow-hidden">
      {/* Header: Título alineado izquierda, TopButtons a la derecha */}
      <div className="flex w-full max-w-6xl mx-auto items-center justify-between mb-1 px-2">
        <Tittle size="extraLarge" className="mb-0 inline-block">Datos del vehículo</Tittle>
        <TopButtons />
      </div>

      {/* Tarjetas alineadas tipo row */}
      <div className="flex flex-col items-center lg:flex-row justify-center gap-y-4 lg:gap-x-2 w-full max-w-6xl mx-auto mb-4">
        {/* Tarjeta izquierda: Datos básicos vehículo */}
        <div className="bg-[#D2D1BE] rounded-[20px] shadow-lg flex flex-col items-center py-5 px-3 w-[90vw] max-w-[350px] mx-auto">
          <Tittle size="semi" className="bg-[#FEF801] px-9 py-2 mb-4 shadow-md text-black">PLACA</Tittle>
          {/* Casillas placa */}
          <div className="flex gap-2 mb-6 mt-1">
            {[...Array(6)].map((_, i) => (
              <input
                key={i}
                type="text"
                maxLength={1}
                className="w-10 h-14 bg-white rounded-md shadow text-center text-2xl font-semibold border-none outline-none"
                disabled
              />
            ))}
          </div>
          {/* Inputs */}
          <input
            type="number"
            className="w-11/12 rounded-full py-2 px-3 text-lg bg-white placeholder-[#bab9a0] mb-4 shadow font-medium border-none focus:outline-none"
            placeholder="Capacidad de pasajeros"
            disabled
          />
          <input
            type="text"
            className="w-11/12 rounded-full py-2 px-4 text-lg bg-white placeholder-[#bab9a0] mb-4 shadow font-medium border-none focus:outline-none"
            placeholder="Marca"
            disabled
          />
          <input
            type="text"
            className="w-11/12 rounded-full py-2 px-4 text-lg bg-white placeholder-[#bab9a0] mb-2 shadow font-medium border-none focus:outline-none"
            placeholder="Modelo"
            disabled
          />
        </div>
        {/* Tarjeta derecha: Uploads vehículo y SOAT */}
        <div className="bg-[#D2D1BE] rounded-[20px] shadow-lg flex flex-col items-center py-2 px-3 w-[90vw] max-w-[300px] mx-auto mt-[-15px]">
          <Tittle size="semi" className="bg-[#FEF801] px-6 py-2 mb-2 mt-1 shadow-md text-black">Foto de tu vehículo</Tittle>
          <div className="mb-4" />
          <div className="w-32 h-32 bg-[#BBBCAB] border-4 border-black rounded-[15px] flex items-center justify-center mb-6 cursor-pointer">
            <svg className="w-14 h-14 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M7 10l5-5m0 0l5 5m-5-5v12"/></svg>
          </div>
          <Tittle size="semi" className="bg-[#FEF801] px-7 py-2 mb-2 shadow-md text-black">Foto del SOAT</Tittle>
          <div className="mb-2" />
          <div className="w-32 h-32 bg-[#BBBCAB] border-4 border-black rounded-[15px] flex items-center justify-center cursor-pointer">
            <svg className="w-14 h-14 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M7 10l5-5m0 0l5 5m-5-5v12"/></svg>
          </div>
        </div>
      </div>
      {/* Botón registrar */}
      <div className="w-full flex justify-center mt-1">
        <Button size="extraLarge">Registrar vehículo</Button>
      </div>
    </div>
  );
}