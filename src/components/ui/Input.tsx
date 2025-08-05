import React, {forwardRef} from 'react';
import styles from '../../styles/input.module.css';

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { 
  value, 
  onChange, 
  placeholder, 
  error, 
  ...props }, ref
){
  // Forward the ref and other props to the input element
  // Apply styles conditionally based on error state 
  return (
    <div className={styles.inputWrapper}>
      <input
        ref={ref}
        className={`${styles.inputField} ${error ? styles.inputError : ''}`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        {...props}
      />
      {error && <span className={styles.errorText}>{error}</span>}
    </div>
  );
}); 
