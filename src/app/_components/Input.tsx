import React, { ChangeEventHandler } from 'react';
interface props {
  type?: string;
  placeHolder: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  value?: string
  disabled?:boolean
}
export default function Input({ type = 'text', placeHolder , onChange, value,disabled = false, ...props}: props) {
  return (
    <input
      type={type}
      className="p-4 border-primary border rounded-md"
      placeholder={placeHolder}
      onChange={onChange}
      value={value}
      disabled={disabled}
      {...props}
      required
    />
  );
}
