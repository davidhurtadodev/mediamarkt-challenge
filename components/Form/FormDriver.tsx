import { useState } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { changeAsideState } from '@/store/UISlice';
import Input from '../Input';
import Button from '../Button';

export default function FormDriver() {
  const dispatch = useAppDispatch();
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

    const info = {
      driversName: driversName.toLowerCase(),
      license: license.toLowerCase(),
    };

    dispatch(changeParcelDeliveryState(info));
    setDriversName('');
    setLicense('');
    dispatch(
      changeAsideState({
        isVisible: false,
        type: null,
      })
    );
  };

  return (
    <>
      <h2 className="mb-10 text-[#3A3541DE] text-xl font-medium">
        Parcel and carrier information
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
  );
}
