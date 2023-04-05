import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import userService from "../services/userService";
import Login from "./Login";
import Register from "./Register";
import Calendar from "./Calendar";
import "../styles/App.css";
import RedirectToAppropriate from "./Redirect";
import rose from "../assets/rose-petals.svg";

function App() {
  // const navigate = ();
  // const registerHandler = async (credentials) => {
  //   response = await userService.register(credentials);
  //   if (response.status === 201) {
  //     navigate("/calendar");
  //   }
  // };

  const loginHandler = async (credentials) => {
    const result = await userService.login(credentials);
    console.log(result);
  };

  const backgroundStyle = {
    backgroundImage: `url(${rose})`,
    height: "100vh",
    backgroundSize: "cover",
    backgroundPosition: "center center",
  };

  return (
    <div className="App" style={backgroundStyle}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <RedirectToAppropriate
                pageAuthorized="/calendar"
                pageError="/login"
              />
            }
          />
          <Route
            path="/login"
            element={<Login loginHandler={loginHandler} />}
          />
          <Route path="/register" element={<Register />} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
