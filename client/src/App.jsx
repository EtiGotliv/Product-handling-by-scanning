import React from "react";
import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom"; // Added Navigate here
import Home from "./pages/Home/Home.jsx";
import Login from "./pages/Login/Login.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate replace to="/Login" />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
