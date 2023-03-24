import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import userService from "../services/userService";

export default function Register() {
  const [email, setEmail] = useState("example@example.com");
  const [password, setPassword] = useState("example1");
  const [confirmPassword, setConfirmPassword] = useState("example1");

  const navigate = useNavigate();
  const registerHandler = async (credentials) => {
    const response = await userService.register(credentials);
    if (response.status === 201) {
      navigate("/calendar");
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    registerHandler({ email, password });
  };

  return (
    <div className="box">
      <div className="title">Register</div>
      <form onSubmit={handleSubmit}>
        <div className="smalldiv">
          <label>Email: </label>
          <input
            type="text"
            value={email}
            onChange={handleEmailChange}
            id="Email"
          />
        </div>
        <div className="smalldiv">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            id="Password"
          />
        </div>
        <div className="smalldiv">
          <label>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            id="ConfirmPassword"
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
}
