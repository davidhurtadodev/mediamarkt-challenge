import { HTMLInputTypeAttribute } from 'react';
interface InputProps {
  labelText?: string;
  type?: HTMLInputTypeAttribute;
}

export default function InputProps({ labelText, type }: InputProps) {
  return (
    <div>
      {labelText && <label>{labelText}</label>}
      <input
        className="w-full text-gray rounded[6px] border-[rgba(58, 53, 65, 0.23)]"
        type={type && type}
      />
    </div>
  );
}
