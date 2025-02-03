import json

USER_FILE = "users.json"

def load_users():
    with open(USER_FILE, "r") as file:
        return json.load(file)
