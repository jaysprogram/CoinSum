from flask import Flask
from counter import coinCounter

app = Flask(__name__)

@app.route('/api/count')
def count():
    filename = '../coins.png'

    return coinCounter(filename)