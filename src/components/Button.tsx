import React, { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  variant?: "primary" | "secondary" | "outline" | "danger" | "ghost";
  className?: string;
  disabled?: boolean;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  type = "button", 
  variant = "primary", 
  className = "", 
  disabled = false, 
  fullWidth = false 
}) => {
  const variants: Record<string, string> = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    outline: "btn-outline",
    danger: "btn-error",
    ghost: "btn-ghost",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn ${variants[variant]} ${fullWidth ? "btn-block" : ""} rounded-full font-semibold transition-all shadow-sm active:scale-95 ${className}`}
    >
      {disabled ? <span className="loading loading-spinner"></span> : children}
    </button>
  );
};

export default Button;
