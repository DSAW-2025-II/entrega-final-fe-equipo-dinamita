import React from "react";

const Paragraph = ({
  children,
  size = "medium",
  color = "text-[#FEF801]", // color por defecto (amarillo)
  className = "",
  ...props
}) => {
  const baseClasses = "font-bold inline-block";

  const sizes = {
    small: "text-sm",
    semi: "text-lg",
    medium: "text-lg lg:text-3xl",
    large: "text-xl",
    extraLarge: "text-lg lg:text-6xl mb-6 lg:mb-3",
  };

  const paragraphClasses = `
    ${baseClasses}
    ${sizes[size]}
    ${color}
    ${className}
  `.trim();

  return (
    <p className={paragraphClasses} {...props}>
      {children}
    </p>
  );
};

export default Paragraph;
