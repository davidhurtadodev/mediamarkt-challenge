import { HTMLInputTypeAttribute } from 'react';
interface InputProps {
  labelText?: string;
  type?: HTMLInputTypeAttribute;
  onChange: (e: React.FormEvent<HTMLInputElement>) => void;
  value?: string;
}

export default function Input({
  labelText,
  type,
  onChange,
  value,
}: InputProps) {
  return (
    <div className="relative mb-5">
      {labelText && (
        <label className="text-[#3A3541AD] bg-white px-1 text-xs absolute -top-2 background-white left-4">
          {labelText}
        </label>
      )}
      <input
        className="focus-visible:outline-none w-full text-gray text-base h-[56px] px-3 rounded-[6px] border-[#3A35413B] border-[1px]"
        type={type && type}
        onChange={(e) => onChange(e)}
        value={value && value}
      />
    </div>
  );
}
