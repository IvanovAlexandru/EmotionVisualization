import pandas as pd
import emotion_analysis


def main():
    topics = ["Russia", "Ukraine", "Palestine", "Multiversus", "Fortnite", "Iran", "Donald Trump", "Dogs", "Cats",
              "Teenage", "Boys", "Kids", "War", "Politics", "Angry", "Happy", "Artificial Intelligence", "Internet",
              "Programming", "Capybara", "Sad", "Music", "Lifestyle", "Sun", "Zodiac", "Planets"]

    df = pd.DataFrame()

    for topic in topics:
        print(f"Fetching data for topic: {topic}")
        reddit_data = emotion_analysis.create_dataset_emotions(topic, limit=40, subreddit='all')
        df = pd.concat([df, pd.DataFrame(reddit_data)], ignore_index=True)

    output_file_path = 'reddit_dataset.csv'
    df.to_csv(output_file_path, index=False)

    print(f"Dataset saved to {output_file_path}")


if __name__ == "__main__":
    main()
