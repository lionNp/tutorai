import flask
from flask import jsonify

from backend.api import machine_learning_qna_engine

app = flask.Flask(__name__)
app.config["DEBUG"] = True


@app.route("/", methods=["GET"])
def home():
    return "<h1>TutorAI QnA Engine</h1>"


@app.route("/tutorai/machine_learning/<question>/<context>", methods=["GET"])
def machine_learning_question_answering_api(question, context):
    return jsonify(answer=machine_learning_qna_engine.get_answer(str(question), str(context)))


app.run()
