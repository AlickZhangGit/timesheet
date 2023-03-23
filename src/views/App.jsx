import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import userService from "../services/userService";
import Login from "../modules/Login";
import Register from "../modules/Register";
import Calendar from "../modules/Calendar";
import "../styles/App.css";

function RedirectToAppropriate() {
  const navigate = useNavigate();

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const response = await userService.checkAuthentication();
        if (response.status === 200) {
          navigate("/calendar");
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching status:", error);
        navigate("/login");
      }
    };

    checkStatus();
  }, [navigate]);

  return null;
}

function App() {
  const [user, setUser] = useState(0);
  const [userData, setUserData] = useState([]);
  //Userdata is an array of days... {}
  const registerHandler = async (credentials) => {
    userService.register(credentials);
  };

  const loginHandler = async (credentials) => {
    const result = await userService.login(credentials);
    console.log(result);
  };

  console.log("userdata", userData);

  const submitUserData = (data) => {};

  return (
    <BrowserRouter>
      <div className="App"></div>
      <Routes>
        <Route path="/" element={<RedirectToAppropriate />} />
        <Route path="/login" element={<Login loginHandler={loginHandler} />} />
        <Route
          path="/register"
          element={<Register registerHandler={registerHandler} />}
        />
        <Route
          path="/calendar"
          element={<Calendar setUserData={setUserData} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
