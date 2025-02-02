from flask import Flask, request, jsonify
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
#@app.route("/members")

USER_FILE = "users.json"

def load_users():
    with open(USER_FILE,"r") as file:
        return json.load(file)

@app.route("/login",methods=["POST"])

def login():
    data = request.json
    user_name = data.get("username")
    password = data.get("password")
    
    users = load_users()["users"]
    
    for user in users:
        if user["username"] == user_name and user["password"] == password:
            return jsonify({"success": True, "message": "Login successful!"})

    return jsonify({"success": False, "message": "Invalid username or password"}), 401

# def members():
#     return {"members": ["Member1", "Member2", "Member3"]}

#Launching the app
if __name__ == "__main__":
    app.run(debug=True)
