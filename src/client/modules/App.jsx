import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import userService from "../services/userService";
import Login from "./Login";
import Register from "./Register";
import Calendar from "./Calendar";
import Footer from "./Footer";
import "../styles/App.css";
import RedirectToAppropriate from "./Redirect";

function App() {
  const loginHandler = async (credentials) => {
    const result = await userService.login(credentials);
    console.log(result);
  };

  return (
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
