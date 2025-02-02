// components/Login.js
import React, { useState } from "react";
// import { handleLogin } from "../utils/auth.js"; // הייבוא של הפונקציה
import { handleLogin } from "../../utils/auth.js"; 
import "./Login.css"; // ייבוא קובץ ה-CSS

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={(e) => handleLogin(e, username, password)}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
