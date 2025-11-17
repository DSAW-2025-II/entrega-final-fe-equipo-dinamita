import React, { useState, useEffect } from "react";
import Tittle from "../components/Tittle";
import TopButtons from "../components/TopButtons";
import LoadingModal from "../components/LoadingModal";
import Button from "../components/Button";
import SuccessModal from "../components/SuccessModal";
import ErrorModal from "../components/ErrorModal";
import { useUser } from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

export default function MyVehicle() {
  const { user } = useUser();
  const navigate = useNavigate();
  const [vehicle, setVehicle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploadingSOAT, setIsUploadingSOAT] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  useEffect(() => {
    const fetchVehicle = async () => {
      if (!user?.vehicleId) {
        setIsLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem("token");
        const response = await api.get(`/vehicle/${user.vehicleId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.success) {
          setVehicle(response.data.vehicle);
        }
      } catch (error) {
        console.error("Error obteniendo vehículo:", error);
        setErrorMessages(["Error al cargar la información del vehículo"]);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      fetchVehicle();
    }
  }, [user]);

  const handleSOATUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrorMessages(["Por favor, selecciona una imagen válida"]);
      return;
    }

    setIsUploadingSOAT(true);
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("soat", file);

      const response = await api.patch(`/vehicle/soat/${user.vehicleId}`, formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setIsSuccess(true);
        // Refrescar la información del vehículo
        const vehicleResponse = await api.get(`/vehicle/${user.vehicleId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (vehicleResponse.data.success) {
          setVehicle(vehicleResponse.data.vehicle);
        }
      }
    } catch (error) {
      console.error("Error actualizando SOAT:", error);
      setErrorMessages(["Error al actualizar el SOAT. Intenta de nuevo."]);
    } finally {
      setIsUploadingSOAT(false);
      e.target.value = ""; // Reset input
    }
  };

  if (isLoading) {
    return (
      <div className="w-screen h-screen bg-black flex items-center justify-center">
        <LoadingModal message="Cargando..." />
      </div>
    );
  }

  if (!user?.vehicleId) {
    return (
      <div className="w-screen h-screen bg-black flex flex-col items-center justify-center px-2 font-inter overflow-y-auto py-8">
        <div className="flex w-full max-w-6xl mx-auto items-center justify-between mb-8 px-2">
          <Tittle size="extraLarge" className="mb-0 inline-block">Mi vehículo</Tittle>
          <TopButtons />
        </div>
        <div className="bg-[#D2D1BE] rounded-[20px] shadow-lg flex flex-col items-center py-10 px-8 max-w-md text-center">
          <Tittle size="semi" className="bg-[#FEF801] px-6 py-2 mb-4 shadow-md text-black">
            No tienes vehículo registrado
          </Tittle>
          <p className="text-black text-lg mb-6">
            Para ser conductor, primero debes registrar tu vehículo.
          </p>
          <Button size="medium" onClick={() => navigate("/register-car")}>
            Registrar vehículo
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-screen h-screen bg-black flex flex-col text-white font-inter overflow-y-auto py-4 lg:py-8">
      {isUploadingSOAT && <LoadingModal message="Actualizando SOAT..." />}
      {isSuccess && (
        <SuccessModal
          message="¡SOAT actualizado exitosamente!"
          onClose={() => setIsSuccess(false)}
        />
      )}
      {errorMessages.length > 0 && (
        <ErrorModal
          messages={errorMessages}
          onClose={() => setErrorMessages([])}
        />
      )}

      <div className="flex w-full max-w-6xl mx-auto items-center justify-between mb-8 px-2">
        <Tittle 
        size="extraLarge" 
        className="self-start ml-10 mt-15 lg:-mt-2">Mi vehículo</Tittle>
        <TopButtons />
      </div>

      {vehicle ? (
        <div className="flex flex-col lg:flex-row justify-center gap-6 w-full max-w-6xl mx-auto px-4 -mt-3 lg:mt-0">
           {/* 🔹 Columna izquierda (nuevo diseño) */}
          <div className="relative bg-[#1B1B1B] rounded-[28px] shadow-lg w-full max-w-xs lg:max-w-sm mx-auto pb-4 lg:h-[460px] vehicle-shadow lg:ml-15" >
            <div className="flex justify-center items-center px-4 pb-6">
            {vehicle.photo ? (
                <img
                  src={vehicle.photo}
                  alt="Vehículo"
                  className="w-full h-[140px] lg:h-[170px] object-cover rounded-[20px] shadow-lg mt-6 z-10 relative"
                />
              ) : (
                <div className="w-90 max-w-xs h-38 bg-gray-300 rounded-lg flex items-center justify-center">
                  <p className="text-black">Sin foto</p>
                </div>
              )}
            </div>

            {/* Fondo amarillo claro */}
            <div className="bg-[#FFFEE5] rounded-[17px] mx-4 -mt-4 p-3 lg:p-4 shadow-md text-black">
             
              <p className="font-bold text-base lg:text-lg">Marca: <span className="font-normal">{vehicle.brand}</span></p>
              <p className="font-bold text-base lg:text-lg">Modelo: <span className="font-normal">{vehicle.model}</span></p>
              <p className="font-bold text-base lg:text-lg">Color: <span className="font-normal">{vehicle.color}</span></p>
              <p className="font-bold text-base lg:text-lg">Capacidad de pasajeros: <span className="font-normal">{vehicle.capacity}</span></p>

              {/* PLACA */}
              <div className="text-center mt-0">
                <p className="font-extrabold text-black text-lg mb-2">PLACA</p>
                <div className="flex justify-center gap-2">
                  {vehicle.plate.split("").map((char, i) => (
                    <div
                      key={i}
                      className="bg-[#FEF801] w-10 h-14 rounded-md shadow-md flex items-center justify-center font-bold text-black text-xl"
                    >
                      {char}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Columna derecha: Fotos del vehículo y SOAT */}
          <div className="flex flex-col gap-6 items-center w-full">
            <Tittle 
             size="semi"
             className="mb-1 lg:mb-4 mt-7 lg:mt-0 shadow-md text-xl lg:text-3xl text-center ">
                SOAT
              </Tittle>
            {/* Foto del SOAT */}
            <div className="bg-[#D2D1BE] rounded-[20px] w-full max-w-xs mx-auto lg:max-w-[26rem] shadow-lg border-[#1B1B1B] border-20 flex flex-col items-center py-3 px-6">
              
              {vehicle.soat ? (
                <img
                  src={vehicle.soat}
                  alt="SOAT"
                  className="w-full max-w-xs lg:max-w-md lg:max-h-[250px] rounded-2xl shadow-md"
                />
              ) : (
                <div className="w-full
                 max-w-xs h-48 bg-gray-300 rounded-lg flex items-center justify-center">
                  <p className="text-black">Sin SOAT</p>
                </div>
              )}
            </div>
            {/* Botón para actualizar SOAT */}
            <div className="w-full flex justify-center">
              <label className="block">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleSOATUpload}
                  className="hidden"
                  id="soat-upload"
                />
                <Button
                  size="medium"
                  onClick={() => document.getElementById('soat-upload').click()}
                >
                  Actualiza tu SOAT
                </Button>
              </label>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[#D2D1BE] rounded-[20px] shadow-lg flex flex-col items-center py-10 px-8 max-w-xs lg:max-w-md mx-auto text-center">
          <Tittle size="semi" className="bg-[#FEF801] px-6 py-2 mb-4 shadow-md text-black">
            Error al cargar vehículo
          </Tittle>
          <p className="text-black text-lg">
            No se pudo cargar la información del vehículo
          </p>
        </div>
      )}
    </div>
  );
}
