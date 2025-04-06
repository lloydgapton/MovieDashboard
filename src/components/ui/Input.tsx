import React from 'react';
import { JSX } from 'react';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
}

export function Input({ 
  value, 
  onChange, 
  placeholder, 
  error, 
  ...props 
}: InputProps): JSX.Element {
  return (
    <div className="flex flex-col">
      <input
        className={`border p-2 rounded ${error ? "border-red-500" : ""}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />
      {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
    </div>
  );
}
