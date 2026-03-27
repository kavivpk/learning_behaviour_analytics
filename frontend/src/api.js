import axios from "axios";

export const saveActivity = async (data) => {
  const response = await axios.post(
    "http://127.0.0.1:5000/save_activity",
    data
  );
  return response.data;
};

const registerUser = async (data) => {
  const res = await axios.post("http://127.0.0.1:5000/register", data);
  return res.data;
};
