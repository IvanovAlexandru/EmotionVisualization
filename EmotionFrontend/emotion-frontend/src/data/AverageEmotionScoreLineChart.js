import React from 'react';
import { Container, Card, CardContent, Typography } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Dot } from 'recharts';

const AverageEmotionScoreLineChart = ({ posts }) => {
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

  const processData = () => {
    const emotionScores = posts.reduce((acc, post) => {
      if (!acc[post.emotion]) {
        acc[post.emotion] = { emotion: post.emotion, totalScore: 0, count: 0 };
      }
      acc[post.emotion].totalScore += post.avg_score;
      acc[post.emotion].count += 1;
      return acc;
    }, {});

    const data = Object.values(emotionScores).map(emotion => ({
      emotion: emotion.emotion,
      avgScore: emotion.totalScore / emotion.count
    }));

    return data.sort((a, b) => a.avgScore - b.avgScore);
  };

  const data = processData();

  const renderCustomizedDot = (props) => {
    const { cx, cy, payload } = props;
    return (
      <Dot cx={cx} cy={cy} r={6} fill={colorMap[payload.emotion] || '#000000'} stroke="#fff" strokeWidth={2} />
    );
  };

  return (
    <Container>
      <Card elevation={3} sx={{ p: 2, margin: 'auto', maxWidth: 600, flexGrow: 1 }}>
        <CardContent>
          <Typography variant="h6" component="div" gutterBottom align="center">
            Average Scores of Emotions in Posts
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="emotion" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="avgScore" stroke="#8884d8" activeDot={{ r: 8 }} dot={renderCustomizedDot} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Container>
  );
};

export default AverageEmotionScoreLineChart;
