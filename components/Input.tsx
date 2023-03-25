import { HTMLInputTypeAttribute } from 'react';
interface InputProps {
  labelText?: string;
  type?: HTMLInputTypeAttribute;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
}

export default function InputProps({ labelText, type, onChange }: InputProps) {
  return (
    <div>
      {labelText && <label>{labelText}</label>}
      <input
        className="w-full text-gray rounded[6px] border-[rgba(58, 53, 65, 0.23)]"
        type={type && type}
        onChange={(e) => onChange(e)}
      />
    </div>
  );
}
