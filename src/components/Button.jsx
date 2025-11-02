import React from "react";

const Button = ({
  children,
  onClick,
  variant = "primary",
  size = "medium",
  className = "",
  disabled = false,
  type = "button",
  ...props
}) => {
  // Define button variants
  const variants = {
    primary: 'bg-[#FEF801] text-[#1B1B1B] border-[#FEF801] hover:bg-[#fef801d8]',
    secondary: 'bg-transparent text-[#FEF801] border-[#FEF801] hover:bg-[#FEF801] hover:text-[#1B1B1B]',
    gray: 'bg-[#BBBCAB] text-black border-2 border-black hover:bg-[#A0A090] shadow-inner',
    danger: 'bg-red-500 text-white border-red-500 hover:bg-red-600',
    success: 'bg-green-500 text-white border-green-500 hover:bg-green-600',
  };

  // Define button sizes
  const sizes = {
    small: "px-3 py-1 text-sm",
    smallPlus: "px-3 py-1 text-lg font-bold",
    semi: "px-4 py-1.5 text-base lg:text-2xl rounded-full",
    medium: "py-1.5 lg:py-2 px-3 lg:px-5 text-lg lg:text-3xl rounded-full",
    modal: "px-7 py-2 text-lg rounded-full font-extrabold",
    large: "px-10 py-4 text-xl",
    extraLarge:
      "bg-[#FEF801] text-[#1B1B1B] font-bold text-lg lg:text-3xl py-2 px-5 lg:px-6 rounded-full mb-6 lg:mb-3",
  };

  // Base classes
  const baseClasses =
    "w-fit font-bold rounded-full border transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FEF801]";

  // Disabled state
  const disabledClasses = disabled
    ? "opacity-50 cursor-not-allowed hover:bg-[#FEF801]"
    : "";

  // Combine all classes
  const buttonClasses = `
    ${baseClasses}
    ${variants[variant]}
    ${sizes[size]}
    ${disabledClasses}
    ${className}
  `.trim();

  return (
    <button
      type={type}
      onClick={onClick}
      className={buttonClasses}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
