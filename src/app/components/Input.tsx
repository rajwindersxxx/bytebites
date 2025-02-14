import React from 'react';
interface props {
  type?: string;
  placeHolder: string;
}
export default function Input({ type = 'text', placeHolder }: props) {
  return (
    <input
      type={type}
      className="p-4 border-primary border rounded-md"
      placeholder={placeHolder}
    />
  );
}
