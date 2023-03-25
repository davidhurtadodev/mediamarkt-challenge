import { useEffect } from 'react';
import { fetchParcelsAsync } from '@/store/parcelSlice';
import { RootState } from '@/store';
import { useAppSelector } from '@/store/hooks';
import { useAppDispatch } from '@/store/hooks';
import { Parcel } from '@/lib/types/Parcel';
import ParcelContainer from './ParcelContainer';

export default function Main() {
  const dispatch = useAppDispatch();
  const parcels = useAppSelector((state: RootState) => state.parcel.value);
  useEffect(() => {
    dispatch(fetchParcelsAsync());
  }, [dispatch]);
  console.log(parcels);

  return (
    <div className="px-5 pt-12">
      <h1 className="font-medium px-[14px] text-2xl text-gray mb-6">
        Parcel Lists
      </h1>
      {parcels.map((parcel: Parcel) => {
        return <ParcelContainer parcel={parcel} key={parcel.id.$oid} />;
      })}
    </div>
  );
}
