import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { changeAsideState, openModal } from '@/store/UISlice';
import { changeParcelDeliveryState } from '@/store/parcelSlice';
import Input from '../Input';
import Button from '../Button';
import { RootState } from '@/store';
import { ParcelWithCarrier } from '@/lib/types/Parcel';

export default function FormDriver() {
  const dispatch = useAppDispatch();

  const UIAsideState = useAppSelector(
    (state: RootState) => state.UI.asideSection
  );
  const carriers = useAppSelector((state: RootState) => state.carrier.value);
  const selectedParcelId = useAppSelector(
    (state: RootState) => state.parcel.selectedParcel.id
  );
  const parcelList = useAppSelector(
    (state: RootState) => state.parcel.parcelLists
  );
  const [driversName, setDriversName] = useState('');
  const [license, setLicense] = useState('');

  const handleDriverChange = (e: React.FormEvent<HTMLInputElement>) => {
    setDriversName(e.currentTarget.value);
  };
  const handleLicenseChange = (e: React.FormEvent<HTMLInputElement>) => {
    setLicense(e.currentTarget.value.toUpperCase());
  };

  const handleDeliverySubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    //find parcelId in parcelList
    const parcelListWithoutDate = parcelList.map(([date, parcels]) => parcels);

    const selectedParcelList: ParcelWithCarrier[] | undefined =
      parcelListWithoutDate.find((parcels) => {
        return parcels.find((parcel) => {
          return parcel.id.$oid === selectedParcelId;
        });
      });
    const selectedParcel = selectedParcelList?.find(
      (parcel) => parcel.id.$oid === selectedParcelId
    );

    //retrieve carrier id
    const selectedCarrierId = selectedParcel?.carrier.$oid;
    // find carrier in carriers
    const carrierToVerify = carriers.find(
      (carrier) => carrier.id.$oid === selectedCarrierId
    );
    //check drivers name and license
    const nameToVerify = carrierToVerify?.driver;
    const licenseToVerify = carrierToVerify?.licensePlate;

    if (
      nameToVerify === driversName &&
      licenseToVerify === license.toLowerCase()
    ) {
      dispatch(changeParcelDeliveryState(selectedParcelId));
      dispatch(openModal('success'));
    } else {
      console.error('error en submit');
      dispatch(openModal('error'));
    }

    setDriversName('');
    setLicense('');
    dispatch(
      changeAsideState({
        isVisible: false,
        type: null,
      })
    );
  };
  return UIAsideState.type === 'check-driver' ? (
    <>
      <h2 className="mb-10 text-[#3A3541DE] text-xl font-medium">
        Delivery Information
      </h2>
      <form onSubmit={(e) => handleDeliverySubmit(e)} className="w-full">
        <Input
          onChange={handleDriverChange}
          value={driversName}
          labelText="Driver's name"
        />
        <Input
          onChange={handleLicenseChange}
          value={license}
          labelText="License plate"
        />

        <Button buttonType="submit">Add</Button>
      </form>
    </>
  ) : null;
}
