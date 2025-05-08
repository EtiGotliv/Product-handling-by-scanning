import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
// Assuming you'll import icons for camera and keyboard
import logo from "../../assets/logo.png";

const Home = () => {
  const navigate = useNavigate();

  const handleCamera = () => {
    // Navigate to camera page or handle camera functionality
    console.log("Camera button clicked");
    // navigate("/camera");
  };

  const handleName = () => {
    // Navigate to name entry page
    console.log("Enter name button clicked");
    // navigate("/enter-name");
  };

  return (
    <div className="home-container">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      
      <h1 className="welcome-title">ברוכים הבאים!</h1>
      
      <div className="buttons-container">
        <button className="action-button camera-button" onClick={handleCamera}>
          <div className="button-content">
            <i className="button-icon camera-icon"></i>
            <span className="button-text">צלם תמונה</span>
          </div>
        </button>
        
        <button className="action-button name-button" onClick={handleName}>
          <div className="button-content">
            <i className="button-icon name-icon"></i>
            <span className="button-text">הקלד שם</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Home;