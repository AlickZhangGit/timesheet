import axios from "axios";
const baseUrl =
  "https://ec2-100-26-159-248.compute-1.amazonaws.com:6969/api/v1/";
  // "https://localhost:6969/api/v1/";

//Login with email and password
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

//Register with email and password
const register = async (credentials) => {
  console.log("Im registering to " + baseUrl + " with " + credentials.email);
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
  console.log("I AM POSTING USERDATA TO API", convertedArr);
  const response = await axios.post(baseUrl + "inserttimes", convertedArr);
  return response;
};

//Get userdata for any given month and return it in the array style of userData
//{"year":"2023", "month":"03", "day":"11", "hours":"10-6"}
const getDataForMonth = async (date) => {
  const time = { year: 2020, month: 10 };
  const response = await axios.get(baseUrl + "gettimesbymonth", time);
  return response;
  //extract month and year? and then send req
};
console.log("Testing Api");
const date = new Date();
const hours = "8";
let obj = { date, hours };
//console.log(checkAuthentication());
console.log("Im posing 3/24 8 hours", obj);
console.log(postUserData([obj]));
//console.log(getDataForMonth());

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

export default { login, register, checkAuthentication, postUserData };

function convertAPIMonthToUserData(apidata) {}
