import axios from "axios";

export const saveActivity = async (data) => {
  const response = await axios.post(
    "https://learning-behaviour-backend.onrender.com/api/track",
    data
  );
  return response.data;
};

const registerUser = async (data) => {
  const res = await axios.post("https://learning-behaviour-backend.onrender.com/api/register", data);
  return res.data;
};
