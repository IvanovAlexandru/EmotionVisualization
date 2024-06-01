import pandas as pd
from sklearn.cluster import KMeans
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score
import matplotlib.pyplot as plt
import numpy as np

def main():
    file_path = 'reddit_dataset.csv'
    df = pd.read_csv(file_path)

    sentiment_scores = df['avg_score'].values.reshape(-1, 1)
    kmeans = KMeans(n_clusters=6, random_state=10)
    kmeans.fit(sentiment_scores)
    cluster_centers = sorted(kmeans.cluster_centers_.flatten())
    print("Cluster centers:", cluster_centers)

    df['cluster'] = kmeans.labels_

    plt.figure(figsize=(10, 6))
    plt.scatter(df['avg_score'], np.zeros_like(df['avg_score']), c=df['cluster'], cmap='viridis', marker='o')
    plt.scatter(cluster_centers, np.zeros_like(cluster_centers), c='red', marker='x', s=200)
    plt.title("Cluster Visualization")
    plt.xlabel("Average Score")
    plt.yticks([])
    plt.show()

    X = df[['title_score', 'body_score', 'comment_scores_avg']]
    y = df['avg_score']

    regressor = LinearRegression()
    regressor.fit(X, y)
    weights = regressor.coef_
    title_weight, body_weight, comment_weight = weights
    print("Optimal weights - Title:", title_weight, "Body:", body_weight, "Comment:", comment_weight)

    y_pred = regressor.predict(X)

    mse = mean_squared_error(y, y_pred)
    r2 = r2_score(y, y_pred)
    print("Mean Squared Error:", mse)
    print("R-squared:", r2)

if __name__ == "__main__":
    main()
