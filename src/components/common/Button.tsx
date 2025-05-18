import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
  disabled?: boolean;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  disabled = false,
  icon,
}) => {
  const baseClasses = 'font-medium rounded transition-all duration-200 flex items-center justify-center';
  
  const variantClasses = {
    primary: 'bg-primary text-dark hover:bg-accent focus:ring-2 focus:ring-primary/50',
    secondary: 'bg-dark text-light border border-primary hover:bg-dark/80 focus:ring-2 focus:ring-dark/50',
    outline: 'bg-transparent text-primary border border-primary hover:bg-primary/10 focus:ring-2 focus:ring-primary/30',
  };
  
  const sizeClasses = {
    sm: 'text-xs px-3 py-1.5',
    md: 'text-sm px-4 py-2',
    lg: 'text-base px-6 py-3',
  };
  
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer';
  const widthClass = fullWidth ? 'w-full' : '';
  
  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${disabledClasses} ${className}`;
  
  return (
    <button
      type={type}
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;