import React from 'react';

const Tittle = ({ 
  children, 
  onClick, 
  variant = 'primary',
  size = 'medium',
  className = '', 
  disabled = false,
  type = 'button',
  ...props 
}) => {
  const variants = {
    primary: 'bg-[#FEF801] text-[#1B1B1B]',
    secondary: 'bg-transparent text-[#FEF801] border border-[#FEF801]',
  };

  const sizes = {
    small: "px-3 py-1 text-sm",
    medium: "py-1.5 lg:py-2 px-3 lg:px-5 text-lg lg:text-3xl rounded-full",
    large: "px-10 py-4 text-xl",
    extraLarge: "bg-[#FEF801] text-[#1B1B1B] font-bold text-lg lg:text-3xl py-2 px-5 lg:px-6 rounded-full mb-6 lg:mb-3",
  };

  const baseClasses = 'font-bold rounded-full border transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FEF801]';
  
  const tittleClasses = `
    ${baseClasses}
    ${variants[variant]}
    ${sizes[size]}
    ${className}
  `.trim();

  return (
    <p 
      className={tittleClasses}
      {...props}
    >
      {children}
    </p>
  );
};

export default Tittle;
