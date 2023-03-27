import Image from 'next/image';
import Link from 'next/link';
import helper from '@/lib/helper';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { RootState } from '@/store';
import { changeViewValue } from '@/store/UISlice';
import ParcelListComponent from './ParcelListComponent';
import backIcon from '@/public/assets/icons/back.svg';

export default function ParcelList({}) {
  const dispatch = useAppDispatch();
  const selectedParcelListDate = useAppSelector(
    (state: RootState) => state.parcel.selectedParcelList.date
  );

  const parcelsLists = useAppSelector(
    (state: RootState) => state.parcel.parcelLists
  );

  //Find selected parcel list info
  const selectedList = parcelsLists.find(([date, parcelList]) => {
    return date === selectedParcelListDate;
  });
  const selectedParcelLists = selectedList![1];

  // Calculate total items of a parcel list
  const totalItems = selectedParcelLists.reduce(
    (acc, current) => acc + current.itemsCount,
    0
  );

  return (
    <>
      <div>
        <div className="flex items-center mb-6">
          <Link href="/">
            <Image className="cursor-pointer" src={backIcon} alt={'back'} />
          </Link>
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
