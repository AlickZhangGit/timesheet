import { useState } from "react";
import { useNavigate } from "react-router";
import "../styles/Login.css";

export default function Login(props) {
  const [email, setEmail] = useState("example@example.com");
  const [password, setPassword] = useState("example1");
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const data = await response.json();
        navigate("/calendar");
      } else {
        throw new Error("Failed to login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="box">
      <div className="title">Login</div>
      <form onSubmit={handleSubmit}>
        <div className="smalldiv">
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={handleEmailChange}
            name="Email"
          />
        </div>
        <div className="smalldiv">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            name="Password"
          />
        </div>
        <button>Login</button>
      </form>
    </div>
  );
}
