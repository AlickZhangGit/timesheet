import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { Link } from "react-router-dom";
import userService from "../services/userService";

export default function Register() {
  const [email, setEmail] = useState("example@example.com");
  const [password, setPassword] = useState("example1");
  const [confirmPassword, setConfirmPassword] = useState("example1");
  const [errmessage, setErrMessage] = useState("");

  const navigate = useNavigate();
  const registerHandler = async (credentials) => {};

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password != confirmPassword) {
      setErrMessage("Confirm password not equal to password");
    } else {
      const response = await userService.register({ email, password });
      if (response.status != 201) {
        console.log(response);
        setErrMessage(response.data.Error);
      } else if (response.status === 201) {
        navigate("/calendar");
      }
    }
  };

  return (
    <div className="wrapper centerChildren bgcolor3 shadowed textcolor1">
      <h1 className="pageName">Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="credentials">
          <label>Email: </label>
          <input
            type="text"
            value={email}
            onChange={handleEmailChange}
            id="Email"
            className="bgcolor2 credInput"
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            id="Password"
            className="bgcolor2 credInput"
          />
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            id="ConfirmPassword"
            className="bgcolor2 credInput"
          />
        </div>
        {errmessage === "" ? "" : <div className="errorMsg">{errmessage}</div>}
        <button className="bgcolor2">Register</button>
      </form>
      <br />
      <Link to="/login" className="rlink">
        Go Back To Login
      </Link>
    </div>
  );
}
