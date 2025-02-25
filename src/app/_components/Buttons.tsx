import React from 'react';
interface props {
  children: React.ReactNode;
  type?: 'submit' | 'reset' | 'button';
  className?: string;
  onClick?: () => void;
  disabled?: boolean
}
export function PrimaryButton({ children, type, className }: props) {
  return (
    <button
      type={type}
      className={`bg-accent text-secondary hover:bg-primary px-4 py-2 rounded-md transition-all ${className}`}
    >
      {children}
    </button>
  );
}
export function IconButton({ children, type, className , onClick, disabled}: props) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`bg-accent text-secondary hover:bg-primary px-4 py-2 rounded-full transition-all ${className}`}
    >
      {children}
    </button>
  );
}
export function SecondaryButton({ children, type, className, onClick , disabled = false}: props) {
  return (
    <button
      type={type}
      className={`border border-accent text-secondary hover:bg-accent px-4 py-2 rounded-md transition-all ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
