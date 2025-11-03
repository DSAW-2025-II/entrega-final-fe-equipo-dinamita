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
        const response = await api.get("/vehicle/", {
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

      const response = await api.patch("/vehicle/soat", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setIsSuccess(true);
        // Refrescar la información del vehículo
        const vehicleResponse = await api.get("/vehicle/", {
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
    <div className="w-screen h-screen bg-black flex flex-col text-white font-inter overflow-y-auto py-8">
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
        <Tittle size="extraLarge" className="mb-0 inline-block">Mi vehículo</Tittle>
        <TopButtons />
      </div>

      {vehicle ? (
        <div className="flex flex-col lg:flex-row justify-center gap-6 w-full max-w-6xl mx-auto px-4">
          {/* Columna izquierda: Información del vehículo */}
          <div className="bg-[#D2D1BE] rounded-[20px] shadow-lg flex flex-col py-8 px-8 w-full max-w-md mx-auto">
            <Tittle size="semi" className="bg-[#FEF801] px-6 py-2 mb-6 shadow-md text-black text-center">
              Información del vehículo
            </Tittle>
            
            <div className="space-y-4">
              <div>
                <p className="text-black text-xl font-semibold">Placa: {vehicle.plate}</p>
              </div>
              
              <div>
                <p className="text-black text-xl font-semibold">Marca: {vehicle.brand}</p>
              </div>
              
              <div>
                <p className="text-black text-xl font-semibold">Modelo: {vehicle.model}</p>
              </div>
              
              <div>
                <p className="text-black text-xl font-semibold">Color: {vehicle.color}</p>
              </div>
              
              <div>
                <p className="text-black text-xl font-semibold">Capacidad: {vehicle.capacity} {vehicle.capacity === 1 ? 'pasajero' : 'pasajeros'}</p>
              </div>
            </div>

            {/* Botón para actualizar SOAT */}
            <div className="mt-6">
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
                  className="w-full"
                  onClick={() => document.getElementById('soat-upload').click()}
                >
                  Actualizar SOAT
                </Button>
              </label>
            </div>
          </div>

          {/* Columna derecha: Fotos del vehículo y SOAT */}
          <div className="flex flex-col gap-6 w-full max-w-md mx-auto">
            {/* Foto del vehículo */}
            <div className="bg-[#D2D1BE] rounded-[20px] shadow-lg flex flex-col items-center py-6 px-6">
              <Tittle size="semi" className="bg-[#FEF801] px-6 py-2 mb-4 shadow-md text-black">
                Foto del vehículo
              </Tittle>
              {vehicle.photo ? (
                <img
                  src={vehicle.photo}
                  alt="Vehículo"
                  className="w-full max-w-xs rounded-lg shadow-md"
                />
              ) : (
                <div className="w-full max-w-xs h-48 bg-gray-300 rounded-lg flex items-center justify-center">
                  <p className="text-black">Sin foto</p>
                </div>
              )}
            </div>

            {/* Foto del SOAT */}
            <div className="bg-[#D2D1BE] rounded-[20px] shadow-lg flex flex-col items-center py-6 px-6">
              <Tittle size="semi" className="bg-[#FEF801] px-6 py-2 mb-4 shadow-md text-black">
                SOAT
              </Tittle>
              {vehicle.soat ? (
                <img
                  src={vehicle.soat}
                  alt="SOAT"
                  className="w-full max-w-xs rounded-lg shadow-md"
                />
              ) : (
                <div className="w-full max-w-xs h-48 bg-gray-300 rounded-lg flex items-center justify-center">
                  <p className="text-black">Sin SOAT</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[#D2D1BE] rounded-[20px] shadow-lg flex flex-col items-center py-10 px-8 max-w-md mx-auto text-center">
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
