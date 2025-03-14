import React from "react";

interface props {
  children: React.ReactNode;
  id: string;
  value: string;
}
function RadioButton({ children, id, value, ...props }: props) {
  return (
    <div className="flex items-center gap-2 w-32">
      <input
        type="radio"
        id={id}
        value={value}
        className="h-4 w-4"
        {...props}
      />
      <label htmlFor={id} className="text-xl">
        {children}
      </label>
    </div>
  );
}

export default RadioButton;
