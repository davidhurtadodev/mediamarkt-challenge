import Link from 'next/link';
import IconWithBackground from './IconWithBackground';
import ReusableContainer from './ReusableContainer';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { RootState } from '@/store';
import { changeViewValue } from '@/store/UISlice';
import { changeSelectedParcel } from '@/store/parcelSlice';
import { ParcelWithCarrier } from '@/lib/types/Parcel';
import cargoImg from '@/public/assets/icons/cargo.svg';

interface ParcelListComponentProps {
  parcel: ParcelWithCarrier;
}

export default function ParcelListComponent({
  parcel,
}: ParcelListComponentProps) {
  const dispatch = useAppDispatch();

  const carriers = useAppSelector((state: RootState) => state.carrier.value);
  const parcelListDetailsClickHandler = () => {
    dispatch(changeSelectedParcel(parcel.id.$oid));
    // dispatch(changeViewValue('parcel'));
  };
  const carrierCompany = carriers.find((carrier) => {
    return carrier.id.$oid === parcel.carrier.$oid;
  });

  //Return with link if it isn't delivered
  return !parcel.isDelivered ? (
    <Link onClick={() => parcelListDetailsClickHandler()} href="/parcel">
      <ReusableContainer
        //   onClick={
        //     !parcel.isDelivered ? () => parcelListDetailsClickHandler() : undefined
        //   }
        key={parcel.id.$oid}
      >
        <IconWithBackground src={cargoImg} alt="cargo" />
        <div className="ml-3 grow">
          <h3 className="text-sm mb-0">{parcel.id.$oid} Parcel List</h3>
          <div className="flex ">
            <span className="text-[#3A3541DE] text-[10px] block">
              {carrierCompany!.companyName}
            </span>
            <span
              className={` ml-auto mr-0 uppercase text-[10px] block ${
                parcel.isDelivered ? 'text-primary-accent' : '#3A354161'
              }`}
            >
              {parcel.isDelivered ? 'Delivered' : 'Delivery'}
            </span>
          </div>
          <span className="text-[#3A3541DE] text-[10px] block">
            {parcel.itemsCount} to be picked up
          </span>
        </div>
      </ReusableContainer>
    </Link>
  ) : (
    <ReusableContainer
      //   onClick={
      //     !parcel.isDelivered ? () => parcelListDetailsClickHandler() : undefined
      //   }
      key={parcel.id.$oid}
    >
      <IconWithBackground src={cargoImg} alt="cargo" />
      <div className="ml-3 grow">
        <h3 className="text-sm mb-0">{parcel.id.$oid} Parcel List</h3>
        <div className="flex ">
          <span className="text-[#3A3541DE] text-[10px] block">
            {carrierCompany!.companyName}
          </span>
          <span
            className={` ml-auto mr-0 uppercase text-[10px] block ${
              parcel.isDelivered ? 'text-primary-accent' : '#3A354161'
            }`}
          >
            {parcel.isDelivered ? 'Delivered' : 'Delivery'}
          </span>
        </div>
        <span className="text-[#3A3541DE] text-[10px] block">
          {parcel.itemsCount} to be picked up
        </span>
      </div>
    </ReusableContainer>
  );
}
