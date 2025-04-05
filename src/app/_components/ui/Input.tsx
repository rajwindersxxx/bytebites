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
const Input = React.forwardRef<HTMLInputElement, props>(function Input(
  {
    type = "text",
    placeHolder,
    onChange,
    value,
    disabled = false,
    className = 'p-4',
    name,
    defaultValue,
    ...props
  }: props,
  ref
) {
  return (
    <input
      type={type}
      className={`rounded-md border border-primary dark:text-natural-cream dark:bg-gray-300 dark:disabled:bg-gray-400 ${className}`}
      placeholder={placeHolder}
      onChange={onChange}
      value={value}
      name={name}
      defaultValue={defaultValue}
      disabled={disabled}
      ref={ref}
      autoComplete="true"
      {...props}
      // required
    />
  );
});

export default Input;
