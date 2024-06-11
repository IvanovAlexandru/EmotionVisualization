from flask import Flask
from flask import request
import emotion_analysis
app = Flask(__name__)


@app.route('/')
def get_emotions():
    topic = request.args.get('topic')
    limit = int(request.args.get('limit', 10))
    subreddit = request.args.get('subreddit', None)

    return emotion_analysis.get_sentiment_analysis(topic, limit, subreddit)

@app.route('/emotion')
def get_emotion_from_text():
    text = request.args.get('text')

    return emotion_analysis.get_emotions_from_plain_text(text)


if __name__ == '__main__':
    app.run()
