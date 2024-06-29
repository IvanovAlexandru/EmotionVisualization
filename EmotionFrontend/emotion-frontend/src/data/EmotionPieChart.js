import React from 'react';
import { Container, Card, CardContent, Typography } from '@mui/material';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const EmotionPieChart = ({ posts }) => {
  const colorMap = {
    "Very Angry": '#dc143c',   // Crimson
    Angry: '#ff4500',          // OrangeRed
    Neutral: '#808080',        // Grey
    Content: '#c0ff33',        // Light Green
    Happy: '#ffdf00',          // Yellow
    "Very Happy": '#ffa500',   // Dark Orange
    Overjoyed: '#ffb347'       // Orange
  };

  const emotionOrder = {
    "Very Angry": 1,
    Angry: 2,
    Neutral: 3,
    Content: 4,
    Happy: 5,
    "Very Happy": 6,
    Overjoyed: 7
  };

  const processData = () => {
    const counts = posts.reduce((acc, post) => {
      acc[post.emotion] = (acc[post.emotion] || 0) + 1;
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
            General distribution of emotions inside posts
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

export default EmotionPieChart;
