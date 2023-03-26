import axios from 'axios';
const baseUrl = 'http://localhost:3004/parcels';

const getAll = async () => {
  try {
    const { data } = await axios.get(baseUrl);

    return data;
  } catch (err) {
    console.error(err);
  }
};
// const getOne = async (id: string) => {
//   try {
//     const { data } = await axios.get(`baseUrl/`);

//     return data;
//   } catch (err) {
//     console.error(err);
//   }
// };

export default { getAll };
