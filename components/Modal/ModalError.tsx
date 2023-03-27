import Image from 'next/image';
import Button from '../Button';
import errorIcon from '@/public/assets/icons/smartphoneModal.svg';
import { useAppDispatch } from '@/store/hooks';
import { closeModal } from '@/store/UISlice';

export default function ModalError() {
  const dispatch = useAppDispatch();
  const closeModalBtnHandler = () => {
    dispatch(closeModal(null));
  };
  return (
    <>
      <Image className="mb-5" src={errorIcon} alt="success" />
      <h3 className="font-normal mb-8 text-xl leading-6">
        Some information is wrong
      </h3>
      <Button onClick={closeModalBtnHandler}>Back</Button>
    </>
  );
}
