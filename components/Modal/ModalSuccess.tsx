import Image from 'next/image';
import Button from '../Button';
import successIcon from '@/public/assets/icons/success.svg';

export default function ModalSuccess() {
  return (
    <>
      <Image className="mb-5" src={successIcon} alt="success" />
      <h3 className="font-normal text-xl leading-6">
        Parcel successfully delivered to the carrier
      </h3>
      <Button>Go to parcel list</Button>
    </>
  );
}
