from nltk.sentiment.vader import SentimentIntensityAnalyzer
import statistics
import reddit_api
from deep_translator import GoogleTranslator
from langdetect import detect
import re

translator = GoogleTranslator(source='auto', target='en')


def get_emotion(compound_score):
    if compound_score >= 0.7:
        return "Ecstatic"
    elif compound_score >= 0.5:
        return "Very Happy"
    elif compound_score >= 0.3:
        return "Happy"
    elif compound_score >= 0.1:
        return "Content"
    elif compound_score <= -0.7:
        return "Enraged"
    elif compound_score <= -0.5:
        return "Very Angry"
    elif compound_score <= -0.3:
        return "Angry"
    elif compound_score <= -0.1:
        return "Irritated"
    else:
        return "Neutral"


def remove_non_ascii(text):
    return re.sub(r'[^\x00-\x7F]+', '', text)


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


def analyze_emotions(posts):
    analyzer = SentimentIntensityAnalyzer()
    scores = []

    for title, data in posts.items():
        #if detect_language(title):
        #    title = translate_text(title)
        #translated_comments = []
        #for comment in data['comments']:
        #    if detect_language(comment):
        #        comment = translate_text(comment)
        #    translated_comments.append(comment)

        title_score = analyzer.polarity_scores(title)['compound']
        comment_scores = [analyzer.polarity_scores(comment)['compound'] for comment in data['comments']]

        if comment_scores:
            avg_score = 0.3 * title_score + 0.7 * statistics.mean(comment_scores)
            scores.append({"title": title, "url": data['url'], "emotion": get_emotion(avg_score),
                           "title_score": title_score, "comment_scores_avg": statistics.mean(comment_scores)})
        else:
            avg_score = title_score
            scores.append({"title": title, "url": data['url'], "emotion": get_emotion(avg_score),
                           "title_score": title_score})

    return scores


def get_sentiment_analysis(topic, limit, subreddit):
    posts = reddit_api.fetch_submissions(topic, limit, subreddit)

    return analyze_emotions(posts)
