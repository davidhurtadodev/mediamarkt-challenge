interface ModalProps {
  children: React.ReactNode;
}

export default function Modal({ children }: ModalProps) {
  return (
    <div className="flex flex-col items-center rounded-[30px] px-[34px]">
      {children}
    </div>
  );
}
