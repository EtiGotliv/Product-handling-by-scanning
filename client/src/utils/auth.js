// utils/auth.js

export const handleLogin = async (e, username, password, setMessage) => {
    e.preventDefault();
  
    const response = await fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
  
    const data = await response.json();
    setMessage(data.message);
  };
  