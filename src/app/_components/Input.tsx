import React, { ChangeEventHandler } from "react";
interface props {
  type?: string;
  placeHolder: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string;
  disabled?: boolean;
  className?: string;
  name?: string;
  defaultValue?: string | number;
}
export default function Input({
  type = "text",
  placeHolder,
  onChange,
  value,
  disabled = false,
  className = 'p-4',
  name,
  defaultValue,
  ...props
}: props) {
  return (
    <input
      type={type}
      className={`rounded-md border border-primary ${className}`}
      placeholder={placeHolder}
      onChange={onChange}
      value={value}
      name={name}
      defaultValue={defaultValue}
      disabled={disabled}
      {...props}
      // required
    />
  );
}
