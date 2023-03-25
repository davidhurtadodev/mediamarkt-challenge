import { format } from 'date-fns';
import { Parcel } from '@/lib/types/Parcel';
import helper from '@/lib/helper';

interface ParcelContainerProps {
  parcel: Parcel;
}

export default function ParcelContainer({ parcel }: ParcelContainerProps) {
  return (
    <div
      className="border-b-[1px] border-[#3A35411F] pb-[14px] mb-4"
      key={parcel.id.$oid}
    >
      <h2 className=" px-[14px]  text-base text-gray font-medium mb-0">
        Parcel list {helper.formatDate(parcel.deliveryDate)}
      </h2>
      <div className="flex px-[14px] items-start">
        <div className="flex flex-col">
          <span className="text-[10px] text-gray opacity-[.87] font-normal">
            5 carriers {helper.verifyPassedDate(parcel.pickupDate)}
          </span>
          <span className="text-[10px] text-gray opacity-[.87] font-normal">
            {parcel.itemsCount} items
          </span>
        </div>
        <div className="mr-0 ml-auto flex">
          <span className="font-medium  text-primary-accent text-[10px] ">
            {helper.formatDate(parcel.deliveryDate)}
          </span>
        </div>
      </div>
    </div>
  );
}
