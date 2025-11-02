import WillyHappy from "../assets/WillyHappy.svg";
import Paragraph from "../components/Paragraph.jsx";
import Button from "../components/Button.jsx";
import TopButtons from "../components/TopButtons.jsx";
import { useNavigate } from "react-router-dom";

export default function FinalizeTrip() {
  const navigate = useNavigate();

return (
    <div className="w-screen h-screen bg-black flex flex-col justify-start text-white font-inter">
      <TopButtons />    
        <div className="flex flex-col items-center mt-20">
            
            <Paragraph
            variant="primary"
            size="extraLarge"
            className="text-center mt-6"
            >
            ¿Terminaste tu viaje?
            </Paragraph>
            <img src={WillyHappy} alt="Willy Happy" className="mt-10 w-64 h-64"/>
            <Button
            variant="primary"
            size="extraLarge"
            className="mt-10"
            onClick={() => navigate("/profile")}
            >
            Finalizar viaje
            </Button>
        </div>
    </div>
  );
}