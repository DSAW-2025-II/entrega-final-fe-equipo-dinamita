import React, { useState, useEffect } from "react";
import imageCompression from "browser-image-compression";
import Tittle from "../components/Tittle";
import Button from "../components/Button";
import TopButtons from "../components/TopButtons";
import LoadingModal from "../components/LoadingModal";
import SuccessModal from "../components/SuccessModal";
import ErrorModal from "../components/ErrorModal";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";

const MAX_FILE_SIZE_MB = 3;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;

export default function RegisterCar() {
  const navigate = useNavigate();
  const { refreshUser } = useUser();
  
  const [formData, setFormData] = useState({
    plate: ["", "", "", "", "", ""], // 6 caracteres para la placa
    brand: "",
    model: "",
    capacity: "",
    color: "",
  });
  
  const [photo, setPhoto] = useState(null);
  const [soat, setSoat] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [soatPreview, setSoatPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  const [hasVehicle, setHasVehicle] = useState(false);
  const [isCheckingVehicle, setIsCheckingVehicle] = useState(true);

  // Verificar si el usuario ya tiene un vehículo registrado
  useEffect(() => {
    const checkUserVehicle = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await api.get("/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data?.user?.vehicleId) {
          setHasVehicle(true);
        }
      } catch (error) {
        console.error("Error verificando vehículo:", error);
        // Si hay error de autenticación, redirigir a login
        if (error.response?.status === 401 || error.response?.status === 403) {
          navigate("/login");
        }
      } finally {
        setIsCheckingVehicle(false);
      }
    };

    checkUserVehicle();
  }, [navigate]);


  // Handler para casillas de placa
  const handlePlateChange = (index, value) => {
    const newPlate = [...formData.plate];
    // Solo permitir letras en los primeros 3 caracteres, números en los últimos 3
    if (index < 3) {
      if (/^[A-Za-z]*$/.test(value)) {
        newPlate[index] = value.toUpperCase();
      }
    } else {
      if (/^[0-9]*$/.test(value)) {
        newPlate[index] = value;
      }
    }
    setFormData({ ...formData, plate: newPlate });
    // Auto-focus al siguiente campo
    if (value && index < 5) {
      document.getElementById(`plate-${index + 1}`)?.focus();
    }
  };

  // Handler para inputs normales
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  // Handler para foto del vehículo
  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setErrors((prev) => ({ ...prev, photo: "La foto debe ser una imagen" }));
      return;
    }

    try {
      const compressed = await imageCompression(file, {
        maxSizeMB: 2.5,
        maxWidthOrHeight: 1600,
        useWebWorker: true,
        alwaysKeepResolution: false,
      });

      if (compressed.size > MAX_FILE_SIZE_BYTES) {
        setErrors((prev) => ({
          ...prev,
          photo: `La foto debe pesar menos de ${MAX_FILE_SIZE_MB}MB. Reduce la resolución e inténtalo de nuevo.`,
        }));
        return;
      }

      setErrors((prev) => ({ ...prev, photo: "" }));
      setPhoto(compressed);
      setPhotoPreview(URL.createObjectURL(compressed));
    } catch (error) {
      console.error("Error comprimiendo foto:", error);
      setErrors((prev) => ({ ...prev, photo: "No se pudo procesar la imagen. Intenta con otra." }));
    }
  };

  // Handler para foto del SOAT
  const handleSoatUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const isImage = file.type.startsWith("image/");
    const isPdf = file.type === "application/pdf";

    if (!isImage && !isPdf) {
      setErrors((prev) => ({ ...prev, soat: "Solo se permiten imágenes o PDF" }));
      return;
    }

    try {
      const processedFile = isImage
        ? await imageCompression(file, {
            maxSizeMB: 2.5,
            maxWidthOrHeight: 1600,
            useWebWorker: true,
            alwaysKeepResolution: false,
          })
        : file;

      if (processedFile.size > MAX_FILE_SIZE_BYTES) {
        setErrors((prev) => ({
          ...prev,
          soat: `El archivo de SOAT debe pesar menos de ${MAX_FILE_SIZE_MB}MB. Comprímelo e inténtalo de nuevo.`,
        }));
        return;
      }

      setErrors((prev) => ({ ...prev, soat: "" }));
      setSoat(processedFile);
      setSoatPreview(isImage ? URL.createObjectURL(processedFile) : null);
    } catch (error) {
      console.error("Error procesando SOAT:", error);
      setErrors((prev) => ({ ...prev, soat: "No se pudo procesar el archivo. Intenta con otro." }));
    }
  };

  // Validar formulario
  const validateForm = () => {
    const newErrors = {};
    const plateStr = formData.plate.join("");
    
    if (plateStr.length !== 6) {
      newErrors.plate = "La placa debe tener 6 caracteres";
    } else {
      const plateRegex = /^[A-Za-z]{3}\d{3}$/;
      if (!plateRegex.test(plateStr)) {
        newErrors.plate = "La placa debe tener 3 letras seguidas de 3 números";
      }
    }
    
    if (!formData.brand.trim()) newErrors.brand = "Marca es requerida";
    if (!formData.model.trim()) newErrors.model = "Modelo es requerido";
    if (!formData.capacity || parseInt(formData.capacity) < 1 || parseInt(formData.capacity) > 4) {
      newErrors.capacity = "Capacidad debe ser entre 1 y 4";
    }
    if (!photo) {
      newErrors.photo = "Foto del vehículo es requerida";
    } else if (photo.size > MAX_FILE_SIZE_BYTES) {
      newErrors.photo = `La foto del vehículo debe pesar menos de ${MAX_FILE_SIZE_MB}MB`;
    }

    if (!soat) {
      newErrors.soat = "Foto del SOAT es requerida";
    } else if (soat.size > MAX_FILE_SIZE_BYTES) {
      newErrors.soat = `El archivo de SOAT debe pesar menos de ${MAX_FILE_SIZE_MB}MB`;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Enviar formulario
  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      const plateStr = formData.plate.join("").toUpperCase();
      
      // Crear FormData para enviar archivos
      const formDataToSend = new FormData();
      formDataToSend.append("brand", formData.brand.trim());
      formDataToSend.append("model", formData.model.trim());
      formDataToSend.append("plate", plateStr);
      formDataToSend.append("capacity", parseInt(formData.capacity));
      if (formData.color.trim()) {
        formDataToSend.append("color", formData.color.trim());
      }
      formDataToSend.append("photo", photo);
      formDataToSend.append("soat", soat);
      
      const token = localStorage.getItem("token");
      const response = await api.post("/vehicle/register", formDataToSend, {
        headers: {
          Authorization: `Bearer ${token}`,
          // Axios detecta automáticamente FormData y establece el Content-Type correcto
        },
      });

      if (response.data) {
        setIsSuccess(true);
        // Refrescar el contexto del usuario para obtener los roles actualizados
        await refreshUser();
        setTimeout(() => {
          setIsSuccess(false);
          navigate("/home");
        }, 2000);
      }
    } catch (error) {
      const backendErrors = error.response?.data?.errors || {};
      const messages = Object.values(backendErrors);
      if (messages.length === 0) {
        messages.push("Error al registrar el vehículo. Intenta de nuevo.");
      }
      setErrorMessages(messages);
    } finally {
      setIsLoading(false);
    }
  };

  // Si está verificando, mostrar loading
  if (isCheckingVehicle) {
    return (
      <div className="relative w-full min-h-screen bg-black flex flex-col items-center justify-center">
        <LoadingModal message="Verificando..." />
      </div>
    );
  }

  // Si ya tiene vehículo, mostrar mensaje
  if (hasVehicle) {
    return (
      <div className="relative w-full min-h-screen bg-black flex flex-col items-center justify-center px-2 font-inter">
        <div className="flex w-full max-w-6xl mx-auto items-center justify-between mb-8 px-2">
          <Tittle size="extraLarge" className="mb-0 inline-block">Datos del vehículo</Tittle>
          <TopButtons />
        </div>
        
        <div className="bg-[#D2D1BE] rounded-[20px] shadow-lg flex flex-col items-center py-10 px-8 max-w-md text-center">
          <Tittle size="semi" className="bg-[#FEF801] px-6 py-2 mb-4 shadow-md text-black">
            Ya tienes un vehículo registrado
          </Tittle>
          <p className="text-black text-lg mb-6">
            Solo puedes tener un vehículo por usuario. Si necesitas actualizar la información de tu vehículo, contacta con soporte.
          </p>
          <Button size="medium" onClick={() => navigate("/home")}>
            Volver al inicio
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen bg-black flex flex-col pt-8 pb-10 px-2 font-inter overflow-hidden lg:h-screen lg:overflow-hidden">
      {isLoading && <LoadingModal message="Registrando vehículo..." />}
      {isSuccess && <SuccessModal message="¡Vehículo registrado exitosamente!" onClose={() => { setIsSuccess(false); navigate("/home"); }} />}
      {errorMessages.length > 0 && <ErrorModal messages={errorMessages} onClose={() => setErrorMessages([])} />}

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
          <div className="flex gap-2 mb-2 mt-1">
            {[...Array(6)].map((_, i) => (
              <input
                key={i}
                id={`plate-${i}`}
                type="text"
                maxLength={1}
                value={formData.plate[i]}
                onChange={(e) => handlePlateChange(i, e.target.value)}
                className={`w-10 h-14 bg-white rounded-md shadow text-center text-2xl font-semibold border-none outline-none ${errors.plate ? "border-b-2 border-[#FE0144]" : ""}`}
              />
            ))}
          </div>
          {errors.plate && <span className="text-[#FE0144] text-xs mb-2">{errors.plate}</span>}
          
          {/* Inputs */}
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleChange}
            min="1"
            max="4"
            className={`w-11/12 rounded-full py-2 px-3 text-lg bg-white placeholder-[#bab9a0] mb-2 shadow font-medium border-none focus:outline-none ${errors.capacity ? "border-b-2 border-[#FE0144]" : ""}`}
            placeholder="Capacidad de pasajeros"
          />
          {errors.capacity && <span className="text-[#FE0144] text-xs mb-2">{errors.capacity}</span>}
          
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className={`w-11/12 rounded-full py-2 px-4 text-lg bg-white placeholder-[#bab9a0] mb-2 shadow font-medium border-none focus:outline-none ${errors.brand ? "border-b-2 border-[#FE0144]" : ""}`}
            placeholder="Marca"
          />
          {errors.brand && <span className="text-[#FE0144] text-xs mb-2">{errors.brand}</span>}
          
          <input
            type="text"
            name="model"
            value={formData.model}
            onChange={handleChange}
            className={`w-11/12 rounded-full py-2 px-4 text-lg bg-white placeholder-[#bab9a0] mb-2 shadow font-medium border-none focus:outline-none ${errors.model ? "border-b-2 border-[#FE0144]" : ""}`}
            placeholder="Modelo"
          />
          {errors.model && <span className="text-[#FE0144] text-xs mb-2">{errors.model}</span>}
          
          <input
            type="text"
            name="color"
            value={formData.color}
            onChange={handleChange}
            className={`w-11/12 rounded-full py-2 px-4 text-lg bg-white placeholder-[#bab9a0] mb-2 shadow font-medium border-none focus:outline-none ${errors.color ? "border-b-2 border-[#FE0144]" : ""}`}
            placeholder="Color"
          />
          {errors.color && <span className="text-[#FE0144] text-xs mb-2">{errors.color}</span>}
        </div>
        
        {/* Tarjeta derecha: Uploads vehículo y SOAT */}
        <div className="bg-[#D2D1BE] rounded-[20px] shadow-lg flex flex-col items-center py-2 px-3 w-[90vw] max-w-[300px] mx-auto mt-[-15px]">
          <Tittle size="semi" className="bg-[#FEF801] px-6 py-2 mb-2 mt-1 shadow-md text-black">Foto de tu vehículo</Tittle>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
            id="vehicle-photo-input"
          />
          <div
            onClick={() => document.getElementById("vehicle-photo-input").click()}
            className="w-32 h-32 bg-[#BBBCAB] border-4 border-black rounded-[15px] flex items-center justify-center mb-2 cursor-pointer overflow-hidden"
          >
            {photoPreview ? (
              <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <svg className="w-14 h-14 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M7 10l5-5m0 0l5 5m-5-5v12"/></svg>
            )}
          </div>
          {errors.photo && <span className="text-[#FE0144] text-xs mb-2">{errors.photo}</span>}
          
          <Tittle size="semi" className="bg-[#FEF801] px-7 py-2 mb-2 mt-2 shadow-md text-black">Foto del SOAT</Tittle>
          <input
            type="file"
            accept="image/*,.pdf"
            onChange={handleSoatUpload}
            className="hidden"
            id="soat-photo-input"
          />
          <div
            onClick={() => document.getElementById("soat-photo-input").click()}
            className="w-32 h-32 bg-[#BBBCAB] border-4 border-black rounded-[15px] flex items-center justify-center cursor-pointer overflow-hidden"
          >
            {soatPreview ? (
              <img src={soatPreview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <svg className="w-14 h-14 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2M7 10l5-5m0 0l5 5m-5-5v12"/></svg>
            )}
          </div>
          {errors.soat && <span className="text-[#FE0144] text-xs mt-1">{errors.soat}</span>}
        </div>
      </div>
      {/* Botón registrar */}
      <div className="w-full flex justify-center mt-1">
        <Button size="extraLarge" onClick={handleSubmit}>Registrar vehículo</Button>
      </div>
    </div>
  );
}