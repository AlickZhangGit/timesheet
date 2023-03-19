import axios from "axios";
const baseUrl =
  "https://localhost:6969/api/v1/";

const login = async (credentials) => {
  const response = await axios.post(baseUrl + "login", credentials);
  return response.data;
};

const register = async (credentials) => {
  console.log(credentials);
  const response = await axios.post(baseUrl + "register", credentials);
  return response.data;
};

export default { login, register };
