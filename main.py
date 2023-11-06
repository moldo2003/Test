from flask import Flask, request, Response
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app) 

# Replace this with the address of your C++ server
CPLUSPLUS_SERVER = "http://194.233.160.158:7777"

@app.route("/")
def check_access_control():
    response = requests.get(f"{CPLUSPLUS_SERVER}/")
    return response.text, response.status_code

@app.route("/generateId")
def generate_id():
    response = requests.get(f"{CPLUSPLUS_SERVER}/generateId")
    return response.text, response.status_code

@app.route("/startGame")
def start_game():
    user_id = request.args.get("userId")
    if user_id:
        response = requests.get(f"{CPLUSPLUS_SERVER}/startGame?userId={user_id}")
        return response.text, response.status_code
    return "No User ID provided", 400

@app.route("/getGame")
def get_game():
    user_id = request.args.get("userId")
    game_id = request.args.get("gameId")
    if user_id and game_id:
        response = requests.get(f"{CPLUSPLUS_SERVER}/getGame?userId={user_id}&gameId={game_id}")
                # Create a Flask response with the same content and status code

        flask_response = Response(response.text)
        flask_response.status_code = response.status_code

        # Add the "Content-Type" header to the Flask response
        flask_response.headers["Content-Type"] = "application/json"
        return flask_response
    return "Invalid parameters", 400

@app.route("/verifyQuestion")
def verify_question():
    user_id = request.args.get("userId")
    game_id = request.args.get("gameId")
    index = request.args.get("index")
    answer = request.args.get("answer")
    if user_id and game_id and index and answer:
        response = requests.get(f"{CPLUSPLUS_SERVER}/verifyQuestion?userId={user_id}&gameId={game_id}&index={index}&answer={answer}")
        return response.text, response.status_code
    return "Invalid parameters", 400

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)

