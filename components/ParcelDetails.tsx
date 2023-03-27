import { RootState } from '@/store';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { changeViewValue, changeAsideState } from '@/store/UISlice';
import IconWithBackground from './IconWithBackground';
import AsideSection from './AsideSection';
import backIcon from '@/public/assets/icons/back.svg';
import Image from 'next/image';
import Button from './Button';
import FormDriver from './Form/FormDriver';
import ItemComponent from './ItemComponent';
import Modal from './Modal/Modal';

export default function ParcelDetails() {
  const dispatch = useAppDispatch();
  const selectedParcelId = useAppSelector(
    (state: RootState) => state.parcel.selectedParcel.id
  );
  const allItems = useAppSelector((state: RootState) => state.item.value);
  let parcels = useAppSelector((state: RootState) => state.parcel.value);

  const selectedParcel = parcels.find(
    (parcel) => parcel.id.$oid === selectedParcelId
  );

  // const selectedParcelItems = selectedParcel?.items.map((itemOnParcel) => {
  //   return allItems.filter((item) =>
  //     item.id.$oid === itemOnParcel.$oid ? item : null
  //   );
  // });
  const selectedParcelItems = allItems.filter((item) => {
    return selectedParcel?.items.some(
      (itemInParcel) => item.id.$oid === itemInParcel.$oid
    );
  });

  const backIconClickHandler = () => {
    dispatch(changeViewValue('parcelList'));
  };
  const deliveryBtnHandler = (e: React.MouseEvent<HTMLElement>) => {
    dispatch(
      changeAsideState({
        isVisible: true,
        type: 'check-driver',
      })
    );
  };

  return (
    <div className="h-screen flex flex-col     border-b-[1px] border-[#3A35411F] pb-4">
      <Modal />
      <div>
        <div className="  flex items-center mb-6">
          <Image
            onClick={() => backIconClickHandler()}
            className="cursor-pointer"
            src={backIcon}
            alt={'back'}
          />
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
      <AsideSection>
        <FormDriver />
      </AsideSection>
    </div>
  );
}
