import axios from "axios";

const fetcher = async (...args) => {
  const res = await axios.get(...args);
  return res.data;
};

export default fetcher;
