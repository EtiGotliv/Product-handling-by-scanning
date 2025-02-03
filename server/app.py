from flask import Flask
from flask_cors import CORS
from auth import login

app = Flask(__name__)
CORS(app)

@app.route("/Login", methods=["POST"])
def login_route():
    return login()

if __name__ == "__main__":
    app.run(debug=True)
