import axios from "axios";
const baseUrl =
  "https://ec2-100-26-159-248.compute-1.amazonaws.com:6969/api/v1/";
  // "https://localhost:6969/api/v1/";

const login = async (credentials) => {
  console.log("Im logging in to " + baseUrl + " with " + credentials.email);
  try {
    const response = await axios.post(baseUrl + "login", credentials);
    console.log(response);
    return response;
  } catch (error) {
    console.log("Userservice error");
    return error;
  }
};

const register = async (credentials) => {
  console.log("Im registering to " + baseUrl + " with " + credentials.email);
  const response = await axios.post(baseUrl + "register", credentials);
  return response.data;
};

const checkAuthentication = async (credentials) => {
  const response = await axios.get(baseUrl + "test", credentials);
  return response;
};

export default { login, register, checkAuthentication };
