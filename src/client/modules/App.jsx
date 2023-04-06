import React from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import userService from "../services/userService";
import Login from "./Login";
import Register from "./Register";
import Calendar from "./Calendar";
import "../styles/App.css";
import RedirectToAppropriate from "./Redirect";
import Footer from "./Footer";

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
    //backgroundImage: `url(${rose})`,
    height: "100vh",
    backgroundSize: "cover",
    backgroundPosition: "center center",
    background: "rgb(32, 33, 36)",
    //background: "linear-gradient(25deg, #212025 0%, #212025 100%)",
    //"linear-gradient(25deg, #343446 0%, #343446 100%)"
    //"radial-gradient(circle, rgba(238,174,202,1) 0%, rgba(148,187,233,1) 100%)"
  };

  return (
    //<div className="App" style={backgroundStyle}>
    <div className="App">
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
      <Footer />
    </div>
  );
}

export default App;
