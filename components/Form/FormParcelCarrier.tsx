import { useState } from 'react';
import Select from 'react-select';
import Input from '../Input';
import Button from '../Button';
import { RootState } from '@/store';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { addParcelToList } from '@/store/parcelSlice';
import { changeAsideState } from '@/store/UISlice';
import selectStyles from '@/lib/misc/selectStyles';

export default function FormParcelCarrier() {
  const dispatch = useAppDispatch();

  const carriers = useAppSelector((state: RootState) => state.carrier.value);
  const UIAsideState = useAppSelector(
    (state: RootState) => state.UI.asideSection
  );

  //options for select
  const carriersOptions = carriers.map((carrier) => ({
    value: carrier.id.$oid,
    label: carrier.id.$oid.toUpperCase(),
  }));

  //inputs and select value
  const [parcelId, setParcelId] = useState('');
  const [carrierId, setCarrierId] = useState('');

  // handle inputs change
  const handleParcelIdChange = (e: React.FormEvent<HTMLInputElement>) => {
    setParcelId(e.currentTarget.value.toUpperCase());
  };
  const handleCarrierChange = (selectedOption: any) => {
    setCarrierId(selectedOption.value);
    console.log(carrierId);
  };

  const handleParcelSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const info = {
      parcelId: parcelId.toLowerCase(),
      carrierId: carrierId.toLowerCase(),
    };

    dispatch(addParcelToList(info));
    setParcelId('');
    setCarrierId('');
    dispatch(
      changeAsideState({
        isVisible: false,
        type: null,
      })
    );
  };

  return UIAsideState.type === 'add-parcel' ? (
    <>
      <h2 className="mb-10 text-[#3A3541DE] text-xl font-medium">
        Parcel and carrier information
      </h2>
      <form onSubmit={(e) => handleParcelSubmit(e)} className="w-full">
        <Input
          onChange={handleParcelIdChange}
          value={parcelId}
          labelText="ID"
        />
        <div className="relative mb-14">
          <label className="text-[#3A3541AD] z-20 bg-white px-1 text-xs absolute -top-2 background-white left-4">
            Carrier Id
          </label>
          <Select
            onChange={handleCarrierChange}
            styles={selectStyles}
            options={carriersOptions}
          />
        </div>
        <Button buttonType="submit">Add</Button>
      </form>
    </>
  ) : null;
}
