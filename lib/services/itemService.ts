import axios from 'axios';
const baseUrl = 'http://localhost:3004/items';

const getAll = async () => {
  try {
    const { data } = await axios.get(baseUrl);

    return data;
  } catch (err) {
    console.error(err);
  }
};

export default { getAll };
