interface ReusableContainerProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

export default function ReusableContainer({
  children,
  onClick,
}: ReusableContainerProps) {
  return (
    <div
      onClick={onClick ? (e) => onClick(e) : undefined}
      className="flex w-full border-b-[1px] border-[#3A35411F] pb-3 mb-3 cursor-pointer"
    >
      {children}
    </div>
  );
}
