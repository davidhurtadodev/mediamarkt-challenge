interface ButtonProps {
  children: React.ReactNode;
  buttonType?: 'submit' | 'button' | 'reset';
  buttonShape?: string;
}

export default function Button({
  children,
  buttonType,
  buttonShape,
}: ButtonProps) {
  return (
    <button
      type={buttonType ? buttonType : 'button'}
      className={`bg-primary-accent text-white uppercase  ${
        buttonShape === 'circle' ? 'rounded-full' : 'rounded-[5px] w-full'
      }`}
    >
      {children}
    </button>
  );
}
