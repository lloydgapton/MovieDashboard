import React from 'react';
import { JSX } from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  primary?: boolean;
  danger?: boolean;
  small?: boolean;
}

export function Button({ 
  children, 
  onClick, 
  primary, 
  danger, 
  small, 
  ...props 
}: ButtonProps): JSX.Element {
  const baseClasses = "px-4 py-2 rounded font-medium transition-colors";
  const sizeClasses = small ? "px-2 py-1 text-sm" : "px-4 py-2";
  const colorClasses = primary 
    ? "bg-blue-500 hover:bg-blue-600 text-white" 
    : danger 
      ? "bg-red-500 hover:bg-red-600 text-white" 
      : "bg-gray-200 hover:bg-gray-300 text-gray-800";

  return (
    <button
      className={`${baseClasses} ${sizeClasses} ${colorClasses}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
