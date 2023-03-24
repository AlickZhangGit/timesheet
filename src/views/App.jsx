import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import userService from "../services/userService";
import Login from "../modules/Login";
import Register from "../modules/Register";
import Calendar from "../modules/Calendar";
import "../styles/App.css";
import RedirectToAppropriate from "../modules/Redirect";
import rose from "../assets/rose-petals.svg";

function App() {
  const registerHandler = async (credentials) => {
    userService.register(credentials);
  };

  const loginHandler = async (credentials) => {
    const result = await userService.login(credentials);
    console.log(result);
  };

  const backgroundStyle = {
    backgroundImage: `url(${rose})`,
    height: "100vh",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
  };

  return (
    <div className="App" style={backgroundStyle}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RedirectToAppropriate />} />
          <Route
            path="/login"
            element={<Login loginHandler={loginHandler} />}
          />
          <Route
            path="/register"
            element={<Register registerHandler={registerHandler} />}
          />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
