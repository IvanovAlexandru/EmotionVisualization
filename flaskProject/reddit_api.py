import concurrent
import praw
from concurrent.futures import ThreadPoolExecutor


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
    return submission.title, submission.url, comments_list


def fetch_submissions(query,nr_posts,subreddit):
    post_comments_dict = {}

    if subreddit is None:
        subreddit = 'all'
    if nr_posts is None:
        nr_posts = 10

    search_results = reddit.subreddit(subreddit).search(query, limit=nr_posts)

    with ThreadPoolExecutor(max_workers=10) as executor:
        future_to_submission = {executor.submit(fetch_comments, submission): submission for submission in
                                search_results}
        for future in concurrent.futures.as_completed(future_to_submission):
            submission = future_to_submission[future]
            try:
                title, url, comments_list = future.result()
                post_comments_dict[title] = {'url': url, 'comments': comments_list}
            except Exception as e:
                print(f"Error fetching comments for {submission.title}: {e}")
    return post_comments_dict
