import { RootState } from '@/store';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { changeViewValue } from '@/store/UISlice';
import IconWithBackground from './IconWithBackground';
import backIcon from '@/public/assets/icons/back.svg';
import Image from 'next/image';
import Button from './Button';
import ItemComponent from './ItemComponent';
import helper from '@/lib/helper';
import productIconOptions from '@/lib/misc/productIconOptions';

export default function ParcelDetails() {
  const dispatch = useAppDispatch();
  const selectedParcelId = useAppSelector(
    (state: RootState) => state.UI.selectedParcel.id
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

  console.log(selectedParcelItems);

  return (
    <div className="h-screen flex flex-col px-5 pt-12 cursor-pointer    border-b-[1px] border-[#3A35411F] pb-4">
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
        <Button>Delivery</Button>
      </div>
    </div>
  );
}
