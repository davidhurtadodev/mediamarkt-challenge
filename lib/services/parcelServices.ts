import axios from 'axios';
import parcelSlice from '@/store/parcelSlice';
const baseUrl = 'http://localhost:3004/parcels';

const getAll = async () => {
  try {
    const { data } = await axios.get(baseUrl);

    return data;
  } catch (err) {
    console.error(err);
  }
};

export default { getAll };
