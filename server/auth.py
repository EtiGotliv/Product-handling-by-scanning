from flask import request, jsonify
from utils import load_users

def login():
    data = request.json
    user_name = data.get("username")
    password = data.get("password")
    
    users = load_users()["users"]
    
    for user in users:
        if user["username"] == user_name and user["password"] == password:
            return jsonify({"success": True, "message": "Login successful!"})

    return jsonify({"success": False, "message": "Invalid username or password"}), 401
