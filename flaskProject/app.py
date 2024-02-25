from flask import Flask
from flask import request
import emotion_analysis
app = Flask(__name__)


@app.route('/')
def get_emotions():
    query = request.args.get('topic')
    return emotion_analysis.get_sentiment_analysis(query)


if __name__ == '__main__':
    app.run()
