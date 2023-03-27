import { overrideTailwindClasses } from 'tailwind-override';

interface ButtonProps {
  children: React.ReactNode;
  classNames?: string;
  buttonType?: 'submit' | 'button' | 'reset';
  buttonShape?: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

export default function Button({
  children,
  buttonType,
  onClick,
  classNames,
}: ButtonProps) {
  return (
    <button
      onClick={onClick ? (e) => onClick(e) : undefined}
      type={buttonType ? buttonType : 'button'}
      className={overrideTailwindClasses(
        `bg-primary-accent rounded-[5px] w-full py-3 text-white uppercase cursor-pointer  ${classNames}`
      )}
    >
      {children}
    </button>
  );
}
