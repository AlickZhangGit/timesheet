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
//{"year":"2023", "month":"03", "day":"11", "hours":"10-6"}
const getDataForMonth = async (date) => {
  console.log("Requesting data for ", date);
  //gettimes?year=asdf&month=asdf
  const query = `gettimesbymonth?year=${date.getFullYear()}&month=${date.getMonth()}`;
  const response = await axios.get(baseUrl + query);
  console.log(response.data.data);
  const userData = response.data.data.map((el) => {
    const date = new Date(el.year, el.month, el.day);
    return { date: date, hours: el.hours };
  });
  console.log("formatted into", userData);
  return userData;
  //extract month and year? and then send req
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

function convertAPIMonthToUserData(apidata) {}

export default {
  login,
  register,
  checkAuthentication,
  postUserData,
  getDataForMonth,
};
