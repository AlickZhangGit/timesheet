import axios from "axios";
const baseUrl =
  //"https://ec2-100-26-159-248.compute-1.amazonaws.com:6969/api/v1/";
  "https://localhost:6969/api/v1/";

//Login with email and password
const login = async (credentials) => {
  console.log("Logging in to " + baseUrl + " with " + credentials.email);
  try {
    const response = await axios.post(baseUrl + "login", credentials);
    console.log(response);
    return response;
  } catch (error) {
    console.log("Login error in userservice");
    return error;
  }
};

//Register with email and password
const register = async (credentials) => {
  console.log("Registering to " + baseUrl + " with " + credentials.email);
  const response = await axios.post(baseUrl + "register", credentials);
  return response.data;
};

//To check if logged in
const checkAuthentication = async (credentials) => {
  console.log("Verifying authentication at /test");
  const response = await axios.get(baseUrl + "test", credentials);
  return response;
};

//Post array of userData, conversion happens here
const postUserData = async (arr) => {
  const convertedArr = convertUserDataToPostableFormat(arr);
  console.log("Posting userdata to API", convertedArr);
  const response = await axios.post(baseUrl + "inserttimes", convertedArr);
  return response;
};

//Get userdata for any given month and return it in the array style of userData
const getDataForMonth = async (date) => {
  //date is a js Date
  console.log("Requesting data for ", date);
  const query = `gettimesbymonth?year=${date.getFullYear()}&month=${date.getMonth()}`;
  const response = await axios.get(baseUrl + query);
  const userData = response.data.data.map((el) => {
    const date = new Date(el.year, el.month, el.day);
    return { date: date, hours: el.hours };
  });
  return userData;
};

function convertUserDataToPostableFormat(array) {
  const convertedArray = [];

  array.forEach((obj) => {
    const date = obj.date;
    //console.log(date);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    const newObj = {
      year,
      month,
      day,
      hours: obj.hours,
    };

    convertedArray.push(newObj);
  });

  return convertedArray;
}

export default {
  login,
  register,
  checkAuthentication,
  postUserData,
  getDataForMonth,
};
