import Image from 'next/image';
import helper from '@/lib/helper';
import { ParcelWithCarrier } from '@/lib/types/Parcel';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { RootState } from '@/store';
import { changeViewValue } from '@/store/UISlice';
import ParcelListComponent from './ParcelListComponent';
import backIcon from '@/public/assets/icons/back.svg';

interface ParcelListDetailsProps {
  parcels: ParcelWithCarrier[];
  pickUpDate: string;
}

export default function ParcelListDetails({}) {
  const dispatch = useAppDispatch();
  const selectedParcelListDate = useAppSelector(
    (state: RootState) => state.parcel.selectedParcelList.date
  );

  const parcelsLists = useAppSelector(
    (state: RootState) => state.parcel.parcelLists
  );
  const selectedList = parcelsLists.find(([date, parcelList]) => {
    return date === selectedParcelListDate;
  });
  const selectedParcelLists = selectedList![1];

  const totalItems = selectedParcelLists.reduce(
    (acc, current) => acc + current.itemsCount,
    0
  );

  const backIconClickHandler = () => {
    dispatch(changeViewValue('listOfParcelLists'));
  };

  return (
    <>
      <div>
        <div className="  flex items-center mb-6">
          <Image
            onClick={() => backIconClickHandler()}
            className="cursor-pointer"
            src={backIcon}
            alt={'back'}
          />
          <h1 className="font-medium  text-2xl text-gray ml-4">
            Parcel List {helper.formatDate(selectedParcelListDate!)}
          </h1>
        </div>
        <span className="text-[10px] font-normal text-[#3A3541DE] ">
          {totalItems} items to be picked up
        </span>
        <div className="mt-3">
          {selectedParcelLists.map((parcel) => {
            return <ParcelListComponent parcel={parcel} key={parcel.id.$oid} />;
          })}
        </div>
      </div>
    </>
  );
}
