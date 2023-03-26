import Image from 'next/image';

interface IconWithBackgroundProps {
  src: any;
  alt: string;
}

export default function IconWithBackground({
  src,
  alt,
}: IconWithBackgroundProps) {
  return (
    <div className="bg-custom-background-opacity-primary w-[50px] h-[50px] flex items-center justify-center rounded-[10px]">
      <Image src={src} alt={alt} />
    </div>
  );
}
