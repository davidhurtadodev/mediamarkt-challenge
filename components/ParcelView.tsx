import Image from 'next/image';
import Link from 'next/link';
import { RootState } from '@/store';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { changeViewValue, changeAsideState } from '@/store/UISlice';
import backIcon from '@/public/assets/icons/back.svg';
import Button from './Button';
import ItemComponent from './ItemComponent';
import Modal from './Modal/Modal';

export default function ParcelView() {
  const dispatch = useAppDispatch();
  const selectedParcelId = useAppSelector(
    (state: RootState) => state.parcel.selectedParcel.id
  );

  //Get items's info of the parcel list
  const allItems = useAppSelector((state: RootState) => state.item.value);
  let parcels = useAppSelector((state: RootState) => state.parcel.value);

  const selectedParcel = parcels.find(
    (parcel) => parcel.id.$oid === selectedParcelId
  );

  const selectedParcelItems = allItems.filter((item) => {
    return selectedParcel?.items.some(
      (itemInParcel) => item.id.$oid === itemInParcel.$oid
    );
  });

  // const backIconClickHandler = () => {
  //   dispatch(changeViewValue('parcelList'));
  // };
  const deliveryBtnHandler = (e: React.MouseEvent<HTMLElement>) => {
    dispatch(
      changeAsideState({
        isVisible: true,
        type: 'check-driver',
      })
    );
  };

  return (
    <div className="h-screen flex flex-col   pb-4">
      <Modal />
      <div>
        <div className="  flex items-center mb-6">
          <Link href="/list">
            <Image
              // onClick={() => backIconClickHandler()}
              className="cursor-pointer"
              src={backIcon}
              alt={'back'}
            />
          </Link>
          <h1 className="font-medium  text-2xl text-gray ml-4">
            {selectedParcelId?.toUpperCase()} Parcel
          </h1>
        </div>

        <div className="mt-3">
          {selectedParcelItems?.map((item) => {
            return <ItemComponent key={item.id.$oid} item={item} />;
          })}
        </div>
      </div>
      <div className="w-full mt-auto mb-0">
        <Button onClick={deliveryBtnHandler}>Delivery</Button>
      </div>
    </div>
  );
}
