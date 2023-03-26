import axios from 'axios';
const baseUrl = 'http://localhost:3004/carriers';

const getAll = async () => {
  try {
    const { data } = await axios.get(baseUrl);

    return data;
  } catch (err) {
    console.error(err);
  }
};

export default { getAll };
