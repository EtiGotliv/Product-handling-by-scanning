import React, { useState, useRef } from "react";
import "./Home.css";
import logo from "../../assets/logo.png";

// ייבוא של ספריית Tesseract.js לזיהוי טקסט בתמונות
// צריך להתקין: npm install tesseract.js

const Home = () => {
  const [productName, setProductName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showCamera, setShowCamera] = useState(false);
  const [showNameInput, setShowNameInput] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [nameInput, setNameInput] = useState("");
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const canvasRef = useRef(null);

  // פתיחת המצלמה
  const openCamera = async () => {
    setShowCamera(true);
    setShowNameInput(false);
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: "environment" } 
      });
      
      streamRef.current = stream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      alert("לא ניתן לגשת למצלמה. אנא ודא שהרשאות המצלמה מאופשרות.");
    }
  };

  // סגירת המצלמה
  const closeCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setShowCamera(false);
    setCapturedImage(null);
  };

  // צילום תמונה
  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      
      // התאמת ממדי הקנבס לממדי וידאו
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // ציור התמונה על הקנבס
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // המרת התמונה ל-DataURL
      const imageDataUrl = canvas.toDataURL('image/jpeg');
      setCapturedImage(imageDataUrl);
      
      // סגירת המצלמה
      closeCamera();
      
      // זיהוי טקסט בתמונה
      recognizeText(imageDataUrl);
    }
  };

  // זיהוי טקסט בתמונה באמצעות Tesseract
  const recognizeText = async (imageDataUrl) => {
    setIsLoading(true);
    
    try {
      // ייבוא דינמי של ספריית Tesseract.js
      const { createWorker } = await import('tesseract.js');
      
      const worker = await createWorker('heb');
      
      const result = await worker.recognize(imageDataUrl);
      
      // חיפוש טקסט בתמונה
      const recognizedText = result.data.text.trim();
      
      // עדכון שם המוצר
      if (recognizedText) {
        setProductName(recognizedText);
      } else {
        setProductName("לא זוהה טקסט בתמונה");
      }
      
      await worker.terminate();
    } catch (error) {
      console.error("Error recognizing text:", error);
      setProductName("שגיאה בזיהוי טקסט");
    } finally {
      setIsLoading(false);
    }
  };

  // פתיחת חלון להקלדת שם
  const openNameInput = () => {
    setShowNameInput(true);
    setShowCamera(false);
    closeCamera();
  };

  // שמירת השם שהוקלד
  const saveNameInput = () => {
    if (nameInput.trim()) {
      setProductName(nameInput);
      setNameInput("");
      setShowNameInput(false);
    }
  };

  return (
    <div className="home-container">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      
      <h1 className="welcome-title">ברוכים הבאים!</h1>
      
      <div className="buttons-container">
        <button className="action-button camera-button" onClick={openCamera}>
          <div className="button-content">
            <i className="button-icon camera-icon"></i>
            <span className="button-text">צלם תמונה</span>
          </div>
        </button>
        
        <button className="action-button name-button" onClick={openNameInput}>
          <div className="button-content">
            <i className="button-icon name-icon"></i>
            <span className="button-text">הקלד שם</span>
          </div>
        </button>
      </div>
      
      {/* תצוגת המצלמה */}
      {showCamera && (
        <div className="camera-container">
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            className="camera-preview"
          />
          <canvas ref={canvasRef} style={{ display: 'none' }} />
          <div className="camera-controls">
            <button className="capture-button" onClick={captureImage}>
              צלם
            </button>
            <button className="close-button" onClick={closeCamera}>
              סגור
            </button>
          </div>
        </div>
      )}
      
      {/* חלון הקלדת שם */}
      {showNameInput && (
        <div className="name-input-container">
          <input
            type="text"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
            className="name-input-field"
            placeholder="הקלד שם מוצר"
            autoFocus
          />
          <div className="name-input-buttons">
            <button className="save-button" onClick={saveNameInput}>
              שמור
            </button>
            <button className="cancel-button" onClick={() => setShowNameInput(false)}>
              ביטול
            </button>
          </div>
        </div>
      )}
      
      {/* תצוגת תמונה שצולמה */}
      {capturedImage && (
        <div className="captured-image-container">
          <img src={capturedImage} alt="תמונה שצולמה" className="captured-image" />
        </div>
      )}
      
      {/* תצוגת שם המוצר */}
      {productName && (
        <div className="product-name-container">
          <h2 className="product-name-title">שם המוצר:</h2>
          <p className="product-name">{productName}</p>
        </div>
      )}
      
      {/* תצוגת טעינה */}
      {isLoading && (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p className="loading-text">מזהה טקסט...</p>
        </div>
      )}
    </div>
  );
};

export default Home;