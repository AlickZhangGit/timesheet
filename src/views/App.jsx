import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import userService from "../services/userService";
import Login from "../modules/Login";
import Register from "../modules/Register";
import Calendar from "../modules/Calendar";
import "../styles/App.css";

function App() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState(0);

  const registerHandler = async (credentials) => {
    try {
      userService.register(credentials);
    } catch (error) {
      console.log(error);
    }
  };

  const loginHandler = async (credentials) => {
    const result = await userService.login(credentials);
    console.log(result);
  };

  return (
    <BrowserRouter>
      <div className="App"></div>
      <Routes>
        <Route path="/login" element={<Login loginHandler={loginHandler} />} />
        <Route
          path="/register"
          element={<Register registerHandler={registerHandler} />}
        />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
