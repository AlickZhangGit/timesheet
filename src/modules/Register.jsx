import { useState } from "react";
import "../styles/Login.css";

export default function Register({ registerHandler }) {
  const [email, setEmail] = useState("example@example.com");
  const [password, setPassword] = useState("example1");
  const [confirmPassword, setConfirmPassword] = useState("example1");

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
      <div class="title">Register</div>
      <form onSubmit={handleSubmit}>
        <div class="smalldiv">
          <label>Email: </label>
          <input
            type="text"
            value={email}
            onChange={handleEmailChange}
            id="Email"
          />
        </div>
        <div class="smalldiv">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            id="Password"
          />
        </div>
        <div class="smalldiv">
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
