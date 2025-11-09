import React from "react";
import Tittle from "../components/Tittle";
import TopButtons from "../components/TopButtons";

export default function Reservations() {
  return (
    <div className="w-screen h-screen bg-black flex items-center justify-start text-white font-inter">
      {/* TÍTULO */}
      <Tittle
        variant="primary"
        size="extraLarge"
        className="self-start ml-10 mt-20 lg:mt-6"
      >
        Mis reservas
      </Tittle>

      {/* options */}
      <TopButtons />
    </div>
  );
}
