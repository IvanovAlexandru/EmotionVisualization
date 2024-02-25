from nltk.sentiment.vader import SentimentIntensityAnalyzer
import statistics
import reddit_api


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


def analyze_emotions(posts):
    analyzer = SentimentIntensityAnalyzer()
    scores = []

    for title, data in posts.items():
        title_score = analyzer.polarity_scores(title)['compound']
        comment_scores = [analyzer.polarity_scores(comment)['compound'] for comment in data['comments']]

        avg_score = 0.3 * title_score + 0.7 * statistics.mean(comment_scores)
        scores.append({"title": title, "url": data['url'], "emotion": get_emotion(avg_score),
                       "title_score": title_score, "comment_scores_avg": statistics.mean(comment_scores)})

    return scores


def get_sentiment_analysis(query):
    posts = reddit_api.fetch_submissions(query)

    return analyze_emotions(posts)
