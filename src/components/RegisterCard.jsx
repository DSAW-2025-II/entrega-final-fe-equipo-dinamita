import React, { useState } from "react";
import Button from './Button';

const RegisterCard = ({ onSuccess }) => {
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    universityId: "",
    contactNumber: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  function isNumbers(str) {
    return /^\d+$/.test(str.trim());
  }
  function isValidEmail(str) {
    return /@unisabana\.edu\.co$/i.test(str.trim());
  }
  function hasNumber(str) {
    return /[0-9]/.test(str);
  }
  function hasSpecialChar(str) {
    return /[!@#$%^&*(),.?":{}|<>_\-\\/~]/.test(str);
  }

  function validateFields() {
    let newErrors = {};
    // Nombre
    if (!formData.name.trim()) newErrors.name = "*Campo obligatorio.";
    else if (formData.name.length < 2 || formData.name.length > 20) newErrors.name = "¡Entre 2 y 20 caracteres!";
    // Apellido
    if (!formData.lastName.trim()) newErrors.lastName = "*Campo obligatorio.";
    else if (formData.lastName.length < 2 || formData.lastName.length > 20) newErrors.lastName = "¡Entre 2 y 20 caracteres!";
    // ID universidad
    if (!formData.universityId.trim()) newErrors.universityId = "*Campo obligatorio.";
    else if (!isNumbers(formData.universityId) || formData.universityId.length != 6) newErrors.universityId = "¡ID de 6 dígitos!";
    // Contacto
    if (!formData.contactNumber.trim()) newErrors.contactNumber = "*Campo obligatorio.";
    else if (!isNumbers(formData.contactNumber) || formData.contactNumber.length != 10) newErrors.contactNumber = "¡Contacto de 10 dígitos!";
    // Email
    if (!formData.email.trim()) newErrors.email = "*Campo obligatorio.";
    else if (!isValidEmail(formData.email)) newErrors.email = "¡No termina en @unisabana.edu.co!";
    // Password
    if (!formData.password.trim()) newErrors.password = "*Campo obligatorio.";
    else if (formData.password.length < 8) newErrors.password = "¡Mínimo 8 caracteres!";
    else if (!hasNumber(formData.password)) newErrors.password = "¡Al menos un número!";
    else if (!hasSpecialChar(formData.password)) newErrors.password = "¡Al menos un carácter especial!";
    return newErrors;
  }

  const handleSubmit = () => {
    const newErrors = validateFields();
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      onSuccess(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: "" }));
  };

  // Permitir registrar con Enter
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <>
      <div
        className="bg-[#D2D1BE] w-[280px] lg:w-[410px] rounded-[18px] flex flex-col items-center justify-center gap-2 shadow-md p-6 transition-all duration-300"
        tabIndex={-1}
        onKeyDown={handleKeyDown}
      >
        {[
          { name: "name", placeholder: "Nombres" },
          { name: "lastName", placeholder: "Apellidos" },
          { name: "universityId", placeholder: "ID universidad" },
          { name: "contactNumber", placeholder: "Número de contacto" },
          { name: "email", placeholder: "Correo institucional" },
          { name: "password", placeholder: "Contraseña", type: "password" },
        ].map((input, index) => (
          <div
            key={index}
            className="w-full flex flex-col items-start justify-center transition-all duration-200"
          >
            <input
              type={input.type || "text"}
              name={input.name}
              placeholder={input.placeholder}
              value={formData[input.name]}
              onChange={handleChange}
              className={`w-[240px] lg:w-[360px] h-[38px] lg:h-[50px] rounded-full px-4 lg:px-6 text-[14px] lg:text-[18px] bg-white text-[#1B1B1B] placeholder-[#A2A18A] shadow-md focus:outline-none transition-all font-medium ${
                errors[input.name]
                  ? "border-b-[3px] border-[#FE0144]"
                  : "border-b-[3px] border-transparent"
              }`}
            />
            <div className={`transition-all duration-200 ${errors[input.name] ? "h-[16px]" : "h-[2px]"}`}>
              {errors[input.name] && (
                <span className="text-[#FE0144] text-[12px] lg:text-[14px] ml-3 mt-[-6px]">
                  {errors[input.name]}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      <Button
        variant="primary"
        size="medium"
        className="mt-2"
        onClick={handleSubmit}
      >
        Registrar
      </Button>
    </>
  );
};

export default RegisterCard;