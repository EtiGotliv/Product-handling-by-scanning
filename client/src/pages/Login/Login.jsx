import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleLogin } from "../../utils/api.jsx";
import "./Login.css";
// Assuming the logo is imported correctly
import logo from "../../assets/logo.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages
    
    const success = await handleLogin(username, password);
    
    if (success) {
      navigate("/Home");
    } else {
      setMessage("התחברות נכשלה! אנא בדוק את הפרטים שלך.");
    }
  };

  return (
    <div className="login-container">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <h2>התחברות</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            className="input-field"
            type="text"
            placeholder="שם משתמש"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <input
            className="input-field"
            type="password"
            placeholder="סיסמה"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button className="login-button" type="submit">
          התחבר
        </button>
      </form>
      {message && <div className="message">{message}</div>}
    </div>
  );
};

export default Login;