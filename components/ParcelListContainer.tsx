import { ParcelWithCarrier } from '@/lib/types/Parcel';
import helper from '@/lib/helper';
import ReusableContainer from './ReusableContainer';
import { changeViewValue } from '@/store/UISlice';
import { changeSelectedParcelList } from '@/store/parcelSlice';
import { useAppDispatch } from '@/store/hooks';

interface ParcelContainerProps {
  parcelList: ParcelWithCarrier[];
  pickUpDate: string;
}

export default function ParcelListContainer({
  pickUpDate,
  parcelList,
}: ParcelContainerProps) {
  const dispatch = useAppDispatch();
  const totalItems = parcelList.reduce(
    (acc, current) => acc + current.itemsCount,
    0
  );

  const carriersArray = parcelList.map((parcel) => parcel.carrier.$oid);
  console.log(parcelList);
  const notRepeatedCarriers = [...new Set(carriersArray)];

  const containerClickHandle = () => {
    dispatch(changeSelectedParcelList(pickUpDate));
    dispatch(changeViewValue('parcelList'));
  };

  return (
    <ReusableContainer onClick={containerClickHandle}>
      <h2 className=" px-[14px]  text-base text-gray font-medium mb-0">
        Parcel list {helper.formatDate(pickUpDate)}
      </h2>
      <div className="flex px-[14px] items-start">
        <div className="flex flex-col">
          <span className="text-[10px] text-gray opacity-[.87] font-normal">
            {notRepeatedCarriers.length} carriers
            {helper.verifyPassedDate(pickUpDate)}
          </span>
          <span className="text-[10px] text-gray opacity-[.87] font-normal">
            {totalItems} items
          </span>
        </div>
        <div className="mr-0 ml-auto flex">
          <span className="font-medium  text-primary-accent text-[10px] ">
            {helper.formatDate(pickUpDate)}
          </span>
        </div>
      </div>
    </ReusableContainer>
  );
}
