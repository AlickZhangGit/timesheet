import { useState } from "react";

export default function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    props.loginHandler({ email, password });
    event.preventDefault();
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
