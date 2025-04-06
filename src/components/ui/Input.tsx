import React from 'react';
import { JSX } from 'react';
import styles from '../../styles/input.module.css';

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
    <div className={styles.inputWrapper}>
      <input
        className={`${styles.inputField} ${error ? styles.inputError : ''}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
}
