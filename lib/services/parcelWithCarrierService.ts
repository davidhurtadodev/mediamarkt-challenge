import axios from 'axios';
import { ParcelWithCarrier } from '../types/Parcel';
const baseUrl = 'http://localhost:3004/parcelsWithCarrier';

const getAll = async () => {
  try {
    const { data } = await axios.get(baseUrl);

    return data;
  } catch (err) {
    console.error(err);
  }
};
const create = async (parcel: ParcelWithCarrier) => {
  const { data } = await axios.post(baseUrl, parcel);

  return data;
};

export default { getAll, create };
