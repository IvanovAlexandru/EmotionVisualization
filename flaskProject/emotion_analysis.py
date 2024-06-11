from nltk.sentiment.vader import SentimentIntensityAnalyzer
import statistics
import reddit_api
from deep_translator import GoogleTranslator
from langdetect import detect
import re

translator = GoogleTranslator(source='auto', target='en')


def get_emotion(compound_score):
    if compound_score >= 0.7:
        return "Overjoyed"
    elif compound_score >= 0.48:
        return "Very Happy"
    elif compound_score >= 0.28:
        return "Happy"
    elif compound_score >= 0.08:
        return "Content"
    elif compound_score >= -0.06:
        return "Neutral"
    elif compound_score >= -0.27:
        return "Angry"
    else:
        return "Very Angry"


def remove_non_ascii(text):
    return re.sub(r'[^\x00-\x7F]+', '', text)


def limit_punctuation(text):
    text = re.sub(r'([!?]{3})([!?]+)', r'\1', text)
    return text


def translate_text(text):
    text = remove_non_ascii(text)
    translated_text = translator.translate(text)
    return translated_text

def detect_language(text):
    if len(text) < 3:
        return False
    try:
        return detect(text) != 'en'
    except Exception as e:
        print("Error occurred during language detection:", e)
        return False


def get_emotions_from_plain_text(text):
    analyzer = SentimentIntensityAnalyzer()

    if detect_language(text):
        text = translate_text(text)

    sentiment_score = analyzer.polarity_scores(limit_punctuation(text))['compound']
    emotion = get_emotion(sentiment_score)

    return {
        "text": text,
        "emotion": emotion,
        "sentiment_score": sentiment_score
    }

def analyze_emotions(posts):
    analyzer = SentimentIntensityAnalyzer()
    scores = []

    title_weight = 0.484
    body_weight = 0.304
    comment_weight = 0.471

    for title, data in posts.items():
        if detect_language(title):
            title = translate_text(title)
        translated_comments = []
        for comment in data['comments']:
            if detect_language(comment):
                comment = translate_text(comment)
            translated_comments.append(comment)

        title_score = analyzer.polarity_scores(limit_punctuation(title))['compound']
        comment_scores = [analyzer.polarity_scores(limit_punctuation(comment))['compound'] for comment in translated_comments]

        if comment_scores and data['post_body']:
            body_score = analyzer.polarity_scores(limit_punctuation(data['post_body']))['compound']
            avg_score = title_weight * title_score + body_weight * body_score + comment_weight * statistics.mean(comment_scores)

            scores.append({"title": title, "url": data['url'], "emotion": get_emotion(avg_score),
                           "body_score": body_score, "title_score": title_score,
                           "comment_scores_avg": statistics.mean(comment_scores),
                           "upvotes": data['upvotes'], "avg_score": avg_score})
        elif comment_scores and not data['post_body']:
            avg_score = title_weight * title_score + comment_weight * statistics.mean(comment_scores)

            scores.append({"title": title, "url": data['url'], "emotion": get_emotion(avg_score),
                           "body_score": 0, "title_score": title_score,
                           "comment_scores_avg": statistics.mean(comment_scores),
                           "upvotes": data['upvotes'], "avg_score": avg_score})
        else:
            avg_score = title_score

            scores.append({"title": title, "url": data['url'], "emotion": get_emotion(avg_score),
                           "body_score": 0, "title_score": title_score,
                           "comment_scores_avg": 0,
                           "upvotes": data['upvotes'], "avg_score": avg_score})

    return scores


def get_sentiment_analysis(topic, limit, subreddit):
    posts = reddit_api.fetch_submissions(topic, limit, subreddit)
    return analyze_emotions(posts)
