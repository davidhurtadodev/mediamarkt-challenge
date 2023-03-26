import Image from 'next/image';
import helper from '@/lib/helper';
import { Parcel, ParcelWithCarrier } from '@/lib/types/Parcel';
import cargoImg from '@/public/assets/icons/cargo.svg';

interface ParcelListDetailsProps {
  parcels: ParcelWithCarrier[];
  pickUpDate: string;
}

export default function ParcelListDetails({
  pickUpDate,
  parcels,
}: ParcelListDetailsProps) {
  const totalItems = parcels.reduce(
    (acc, current) => acc + current.itemsCount,
    0
  );
  return (
    <div>
      <h1 className="font-medium px-[14px] text-2xl text-gray mb-6">
        Parcel List {helper.formatDate(pickUpDate)}
      </h1>
      <span className="text-[10px] font-normal text-[#3A3541DE]">
        {totalItems} items to be picked up
      </span>
      <div>
        {parcels.map((parcel) => {
          return (
            <div key={parcel.id.$oid}>
              <div className="bg-primary opacity-10">
                <Image src={cargoImg} alt={cargo} />
              </div>
              <h3>{parcel.id.$oid} Parcel</h3>
              {/* <span></span> */}
              <span>{parcel.itemsCount} to be picked up</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
