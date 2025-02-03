// auth.js
export const handleLogin = async (username, password) => {
  try {
    const response = await fetch("http://127.0.0.1:5000/Login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    const data = await response.json();
    
    if (data.success) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error during login:", error);
    return false;
  }
};
