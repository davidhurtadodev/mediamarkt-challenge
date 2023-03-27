import Image from 'next/image';
import Link from 'next/link';
import Button from '../Button';
import successIcon from '@/public/assets/icons/success.svg';
import { useAppDispatch } from '@/store/hooks';
import { closeModal } from '@/store/UISlice';

export default function ModalSuccess() {
  const dispatch = useAppDispatch();
  const closeModalBtnHandler = () => {
    dispatch(closeModal(null));
  };
  return (
    <>
      <Image className="mb-5" src={successIcon} alt="success" />
      <h3 className="font-normal mb-8 text-xl leading-6">
        Parcel successfully delivered to the carrier
      </h3>
      <Link className="w-full" href="/list">
        <Button onClick={closeModalBtnHandler}>Go to parcel list</Button>
      </Link>
    </>
  );
}
