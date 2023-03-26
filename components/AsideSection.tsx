import { useState } from 'react';
import Select from 'react-select';
import Input from './Input';
import Button from './Button';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { changeAsideState } from '@/store/UISlice';
import { addParcelToList } from '@/store/parcelSlice';
import { RootState } from '@/store';
import selectStyles from '@/lib/misc/selectStyles';

export default function AsideSection() {
  const dispatch = useAppDispatch();
  const asideState = useAppSelector(
    (state: RootState) => state.UI.asideSection
  );
  const carriers = useAppSelector((state: RootState) => state.carrier.value);
  //   console.log(carriers);
  const carriersOptions = carriers.map((carrier) => ({
    value: carrier.id.$oid,
    label: carrier.id.$oid.toUpperCase(),
  }));
  const [parcelId, setParcelId] = useState('');
  const [carrierId, setCarrierId] = useState('');
  const handleParcelIdChange = (e: React.FormEvent<HTMLInputElement>) => {
    setParcelId(e.currentTarget.value.toUpperCase());
  };
  const handleCarrierChange = (selectedOption: any) => {
    setCarrierId(selectedOption.value);
  };
  const handleParcelSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    // const parcel = new Parcel(name, note, image, category);
    // const createdItem = await dispatch(createItemAsync(item));
    const info = {
      parcelId: parcelId.toLocaleLowerCase(),
      carrierId: carrierId.toLowerCase(),
    };
    dispatch(addParcelToList(info));
    dispatch(
      changeAsideState({
        isVisible: false,
        type: null,
      })
    );
  };

  const handleClickOutsideAside = () => {
    dispatch(
      changeAsideState({
        isVisible: false,
        type: null,
      })
    );
  };

  return asideState.isVisible ? (
    <div
      onClick={() => handleClickOutsideAside()}
      className="fixed inset-0 z-50 bg-custom-overlay-opacity w-full h-full"
    >
      <aside
        onClick={(e) => e.stopPropagation()}
        className="bg-white px-5 pt-7 pb-9 rounded-t-[30px] fixed w-full left-0 bottom-0 flex flex-col items-center"
      >
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
      </aside>
    </div>
  ) : null;
}
