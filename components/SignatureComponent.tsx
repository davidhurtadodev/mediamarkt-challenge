import SignaturePad from 'react-signature-canvas';
import Link from 'next/link';
import Button from './Button';
import { changeAsideState } from '@/store/UISlice';
import { useAppDispatch } from '@/store/hooks';

export default function SignatureComponent() {
  const dispatch = useAppDispatch();

  //Close Aside
  const saveSignatureBtnHandler = () => {
    dispatch(
      changeAsideState({
        isVisible: false,
        type: null,
      })
    );
  };
  return (
    <div>
      <SignaturePad
        canvasProps={{
          className: ' w-full border-2 bg-[#BAEAEA] rounded-[6px] mb-[76px]',
        }}
      />
      <Link className="w-full" href="/list">
        <Button onClick={() => saveSignatureBtnHandler()}>Save</Button>
      </Link>
    </div>
  );
}
