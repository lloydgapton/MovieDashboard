import React from 'react';
import { JSX } from 'react';
import styles from '../../styles/button.module.css';

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
  let className = styles.button;
  if (primary) className += ` ${styles.primary}`;
  else if (danger) className += ` ${styles.danger}`;
  else className += ` ${styles.default}`;

  if (small) className += ` ${styles.small}`;

  return (
    <button
      className={className}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
