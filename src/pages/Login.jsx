import React, { useState } from "react";
import Colors from '../assets/Colors';
import WillyHappy from '../assets/WillyHappy.svg';
import Button from '../components/Button';
import LoadingModal from '../components/LoadingModal';
import SuccessModal from '../components/SuccessModal';
import { useNavigate } from "react-router-dom";
import api from "../api/axios.js";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // inicializar como objeto
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateEmptyFields = () => {
    let newErrors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) newErrors[key] = "*Por favor, completa este campo.";
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    try {
      if (validateEmptyFields()) {
        setIsLoading(true);
        const res = await api.post('/auth/login', formData);
        
        const token = res.data.token;
        localStorage.setItem("token", token);

        localStorage.setItem("user", JSON.stringify(res.data.user));
        
        setErrors({});
        setIsSuccess(true);
      }
    } catch (error) {
      // si backend devuelve errores por campo: response.data.errors -> { email: "...", password: "..." }
      const backendErrors = error.response?.data?.errors;

      console.log(backendErrors);

      if (backendErrors && typeof backendErrors === "object") {
        // normaliza y mezcla con errores actuales
        const newErrors = {};
        Object.entries(backendErrors).forEach(([key, val]) => {
          if (Array.isArray(val)) newErrors[key] = val.join(", ");
          else if (val && typeof val === "object") newErrors[key] = val.message || JSON.stringify(val);
          else newErrors[key] = String(val);
        });
        setErrors(prev => ({ ...prev, ...newErrors }));
      } 

      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // limpiar error específico al escribir
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    };
  };

  return (
    <>
      {isLoading && <LoadingModal message="Iniciando sesión..." />}
      {isSuccess && <SuccessModal message={"¡Login exitoso!"} onClose={()=>{setIsSuccess(false); navigate('/home')}} />}
      <div 
      className="w-full h-screen bg-black flex flex-col items-center justify-center text-white font-inter overflow-hidden"
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {/* Logo */}
      <div className="flex flex-col items-center mb-6 lg:mb-8">
        <div className="flex items-center justify-center gap-2 lg:gap-3">
          <img
            src={WillyHappy}
            alt="logo"
            className="w-10 h-10 lg:w-20 lg:h-20 object-contain"
          />
          <h1 className="text-2xl lg:text-4xl font-outfit leading-none m-0">
            WHEELS
          </h1>
        </div>
        <h2 className="text-2xl lg:text-[40px] font-catamaran leading-none mt-2 lg:mt-4">
          Sabana
        </h2>
      </div>

      {/* Título */}
      <div className="bg-[#FEF801] text-[#1B1B1B] font-bold text-lg lg:text-3xl py-2 px-5 lg:px-6 rounded-full mb-6 lg:mb-3">
        Inicio de sesión
      </div>

      {/* Contenedor formulario */}
      <div className="bg-[#D2D1BE] w-[280px] lg:w-[410px] h-auto rounded-[18px] flex flex-col items-center justify-center gap-4 lg:gap-6 shadow-md p-4">
        <div className="w-full flex flex-col items-start">
          <input
            name="email"
            type="email"
            placeholder="correo institucional"
            value={formData.email}
            onChange={handleChange}
            className={`w-[240px] lg:w-[360px] h-[38px] lg:h-[60px] rounded-full px-4 lg:px-6 text-[14px] lg:text-[20px] text-[#1b1b1b] placeholder-[#A2A18A] bg-white shadow-md focus:outline-none transition-all font-medium ${
              errors.email ? "border-b-[3px] border-[#FE0144]" : "border-b-[3px] border-transparent"
            }`}
          />
          {errors.email && (
            <span className="text-[#FE0144] text-[12px] lg:text-[14px] ml-3 mt-1">
              {errors.email}
            </span>
          )}
        </div>

        <div className="w-full flex flex-col items-start">
          <input
            name="password"
            type="password"
            placeholder="contraseña"
            value={formData.password}
            onChange={handleChange}
            className={`w-[240px] lg:w-[360px] h-[38px] lg:h-[60px] rounded-full px-4 lg:px-6 text-[14px] lg:text-[20px] text-[#1b1b1b] placeholder-[#A2A18A] bg-white shadow-md focus:outline-none transition-all font-medium ${
              errors.password ? "border-b-[3px] border-[#FE0144]" : "border-b-[3px] border-transparent"
            }`}
          />
          {errors.password && (
            <span className="text-[#FE0144] text-[12px] lg:text-[14px] ml-3 mt-1">
              {errors.password}
            </span>
          )}
        </div>

        {/* Mensaje general */}
        {errors.general && (
          <div className="w-full flex justify-center mt-2">
            <span className="text-[#FE0144] text-[14px] lg:text-[16px] text-center">
              {errors.general}
            </span>
          </div>
        )}

        <p
          className="text-[12px] lg:text-[18px] text-white text-center mt-1"
          style={{ textShadow: '0 0 6px rgba(0,0,0,0.8)' }}>
          ¿No tienes cuenta?{" "}
          <button
            className="text-[#FEF801] hover:underline cursor-pointer"
            onClick={() => navigate("/register")}
            style={{ textShadow: '0 0 6px rgba(0,0,0,0.8)' }}>
            Regístrate
          </button>
        </p>
      </div>

      {/* Botón */}
      <Button
        variant="primary"
        size="medium"
        className="mt-2"
        onClick={handleSubmit}
      >
        Ingresar
      </Button>
    </div>
    </>
  );
}

export default Login;