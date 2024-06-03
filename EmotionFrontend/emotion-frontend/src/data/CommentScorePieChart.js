import React from 'react';
import { Container, Card, CardContent, Typography } from '@mui/material';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const CommentScorePieChart = ({ posts }) => {
  const colorMap = {
    Enraged: '#8b0000',        // DarkRed
    "Very Angry": '#dc143c',   // Crimson
    Angry: '#ff4500',          // OrangeRed
    Irritated: '#ff6347',      // Tomato
    Neutral: '#808080',        // Grey
    Content: '#c0ff33',        // Light Green
    Happy: '#ffdf00',          // Yellow
    "Very Happy": '#ffa500',   // Dark Orange
    Overjoyed: '#ffb347'       // Orange
  };

  const emotionOrder = {
    Enraged: 1,
    "Very Angry": 2,
    Angry: 3,
    Irritated: 4,
    Neutral: 5,
    Content: 6,
    Happy: 7,
    "Very Happy": 8,
    Overjoyed: 9
  };

  const getEmotion = (compoundScore) => {
    if (compoundScore >= 0.7) {
      return "Overjoyed";
    } else if (compoundScore >= 0.48) {
      return "Very Happy";
    } else if (compoundScore >= 0.28) {
      return "Happy";
    } else if (compoundScore >= 0.08) {
      return "Content";
    } else if (compoundScore >= -0.06) {
      return "Neutral";
    } else if (compoundScore >= -0.27) {
      return "Irritated";
    } else if (compoundScore >= -0.46) {
      return "Angry";
    } else {
      return "Very Angry";
    }
  };

  const processData = () => {
    const counts = posts.reduce((acc, post) => {
      const emotion = getEmotion(post.comment_scores_avg);
      acc[emotion] = (acc[emotion] || 0) + 1;
      return acc;
    }, {});

    const data = Object.keys(counts).map(key => ({
      name: key,
      value: counts[key],
      color: colorMap[key] || '#000000'
    }));

    return data.sort((a, b) => emotionOrder[a.name] - emotionOrder[b.name]);
  };

  const data = processData();

  return (
    <Container>
      <Card elevation={3} sx={{ p: 2, margin: 'auto', maxWidth: 600, flexGrow: 1 }}>
        <CardContent>
          <Typography variant="h6" component="div" gutterBottom align="center">
            Average Emotions of Comments in Posts
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} fill="#8884d8" label>
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Container>
  );
};

export default CommentScorePieChart;
