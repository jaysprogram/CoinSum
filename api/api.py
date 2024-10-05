from flask import Flask
from flask_cors import CORS
from counter import coinCounter

app = Flask(__name__)
CORS(app)

@app.route('/api/count', methods=['GET'])
def count():
    filename = '../coins.jpg'

    return coinCounter(filename)