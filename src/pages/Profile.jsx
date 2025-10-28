import React from "react";
import Tittle from "../components/Tittle"; 
import TopButtons from "../components/TopButtons";
import Paragraph from "../components/Paragraph";

export default function Profile() {
  return (
    <div className="w-screen h-screen bg-black flex items-center justify-start text-white font-inter">
      {/* TÍTULO */}
      <Tittle
        variant="primary"
        size="extraLarge"
        className="self-start ml-10 mt-6"
      >
        Tu perfil
      </Tittle>

     {/* options */} 
     <TopButtons />

       <Paragraph>
        Tu foto

       </Paragraph>




    </div>
  );
}
