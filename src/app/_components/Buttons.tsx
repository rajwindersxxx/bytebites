import React from "react";
interface props {
  children: React.ReactNode;
  type?: "submit" | "reset" | "button";
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
}
export function PrimaryButton({ children, type, className }: props) {
  return (
    <button
      type={type}
      className={`rounded-md bg-accent px-4 py-2 text-secondary transition-all hover:bg-primary disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
}

export function SecondaryButton({
  children,
  type,
  className,
  onClick,
  disabled = false,
}: props) {
  return (
    <button
      type={type}
      className={`rounded-md border border-accent px-4 py-2 text-secondary transition-all hover:bg-accent disabled:cursor-not-allowed dark:text-white ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
export function IconButton({
  children,
  type,
  className,
  onClick,
  disabled,
}: props) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-full bg-accent px-4 py-2 text-secondary transition-all hover:bg-primary ${className}`}
    >
      {children}
    </button>
  );
}
