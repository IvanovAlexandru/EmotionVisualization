import praw
import concurrent.futures

reddit = praw.Reddit(
    client_id="PI3P8_nZ23I6aIloiJARVg",
    client_secret="TiamZeYZSoPKfiJDG1Eli9fqyAtLlA",
    user_agent="Licenta"
)


def fetch_comments(submission, limit=10):
    comments_list = []
    submission.comments.replace_more(limit=0)

    for i, comment in enumerate(submission.comments.list()):
        if i >= limit:
            break
        comments_list.append(comment.body)

    score = submission.score
    return submission.title, submission.url, comments_list, score


def fetch_post_body(submission):
    if submission.is_self:
        return submission.selftext
    else:
        return None


def fetch_submissions(query, nr_posts, subreddit=None):
    post_comments_dict = {}

    if subreddit is None:
        subreddit = 'all'
    if nr_posts is None:
        nr_posts = 10

    search_results = reddit.subreddit(subreddit).search(query, limit=nr_posts)

    with concurrent.futures.ThreadPoolExecutor(max_workers=10) as executor:
        for submission in search_results:
            post_body = fetch_post_body(submission)
            title, url, comments_list, score = fetch_comments(submission)
            post_comments_dict[title] = {'url': url, 'upvotes': score, 'post_body': post_body, 'comments': comments_list}
    return post_comments_dict
