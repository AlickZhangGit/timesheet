import { useState } from "react";
import { useNavigate } from "react-router";
import "../styles/Login.css";
import { Link } from "react-router-dom";
import userService from "../services/userService";

export default function Login(props) {
  const [email, setEmail] = useState("example@example.com");
  const [password, setPassword] = useState("example1");
  const navigate = useNavigate();
  const [errmessage, setErrMessage] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await userService.login({ email, password });
    if (response.status != 200) {
      console.log(response);
      setErrMessage(response.data.Error);
    } else if (response.status === 200) {
      navigate("/calendar");
    }
  };

  return (
    <div className="wrapper centerChildren whiteGlass shadowed">
      <h1 className="title">Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="credentials">
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={handleEmailChange}
            name="Email"
            className="darkBlue credInput"
          />
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
            name="Password"
            className="darkBlue credInput"
          />
        </div>
        {errmessage === "" ? "" : <div className="errorMsg">{errmessage}</div>}
        <button className="darkerBlue">Login</button>
      </form>
      <br />
      <Link to="/register" className="rlink">
        Register
      </Link>
    </div>
  );
}
