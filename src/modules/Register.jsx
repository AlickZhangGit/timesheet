import { useState } from "react";

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
    <div className="register">
      Register:
      <form onSubmit={handleSubmit}>
        Email:
        <input value={email} type="text" onChange={handleEmailChange} />
        Password:
        <input
          value={password}
          type="password"
          onChange={handlePasswordChange}
        />
        Confirm Password:
        <input
          value={confirmPassword}
          type="password"
          onChange={handleConfirmPasswordChange}
        />
        <button>Submit</button>
      </form>
    </div>
  );
}
