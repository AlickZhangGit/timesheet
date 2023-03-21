import { useState } from "react";
import { useNavigate } from "react-router";

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
      props.loginHandler({ email, password });
      //Todo... dont navigate if you havent logged in successfully
      navigate("/calendar");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="login">
      Login:
      <form onSubmit={handleSubmit}>
        Username:
        <input
          type="text"
          value={email}
          onChange={handleEmailChange}
          name="Username"
        />
        Password:
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          name="Password"
        />
        <button>Login</button>
      </form>
    </div>
  );
}
