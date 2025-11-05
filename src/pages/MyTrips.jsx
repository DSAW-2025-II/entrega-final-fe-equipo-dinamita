import React from "react";
import Tittle from "../components/Tittle";
import TopButtons from "../components/TopButtons";
import LoadingModal from "../components/LoadingModal";
import { useUser } from "../hooks/useUser";

export default function MyTrips() {
  const { user, isLoading } = useUser();

  if (isLoading || !user) {
    return (
      <div className="w-screen h-screen bg-black flex items-center justify-center">
        <LoadingModal message="Cargando..." />
      </div>
    );
  }

  return (
    <div className="w-screen h-screen bg-black flex flex-col text-white font-inter overflow-y-auto py-8">
      <div className="flex w-full max-w-6xl mx-auto items-center justify-between mb-8 px-2">
        <Tittle size="extraLarge" className="mb-0 inline-block">Mis viajes</Tittle>
        <TopButtons />
      </div>
      
      {/* Aquí irá la lista de viajes del conductor */}
      <div className="bg-[#D2D1BE] rounded-[20px] shadow-lg flex flex-col items-center py-10 px-8 max-w-xs lg:max-w-md mx-auto text-center">
        <Tittle size="semi" className="bg-[#FEF801] px-6 py-2 mb-4 shadow-md text-black">
          Mis viajes como conductor
        </Tittle>
        <p className="text-black text-lg">
          Aquí se mostrarán tus viajes como conductor
        </p>
      </div>
    </div>
  );
}

