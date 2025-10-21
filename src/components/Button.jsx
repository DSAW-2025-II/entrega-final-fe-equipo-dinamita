import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  variant = 'primary',
  size = 'medium',
  className = '', 
  disabled = false,
  type = 'button',
  ...props 
}) => {
  // Define button variants
  const variants = {
    primary: 'bg-[#FEF801] text-[#1B1B1B] border-[#FEF801] hover:bg-[#fef801d8]',
    secondary: 'bg-transparent text-[#FEF801] border-[#FEF801] hover:bg-[#FEF801] hover:text-[#1B1B1B]',
    danger: 'bg-red-500 text-white border-red-500 hover:bg-red-600',
    success: 'bg-green-500 text-white border-green-500 hover:bg-green-600',
  };

  // Define button sizes
  const sizes = {
    small: 'text-sm py-1 px-4',
    medium: 'text-[20px] md:text-3xl py-2 md:py-3 px-8 md:px-12',
    large: 'text-xl md:text-4xl py-3 md:py-4 px-10 md:px-16',
  };

  // Base classes
  const baseClasses = 'font-bold rounded-full border transition duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FEF801]';
  
  // Disabled state
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed hover:bg-[#FEF801]' : '';
  
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
