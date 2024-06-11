import React from 'react';
import { Container, Card, CardContent, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const UpvotesEmotionBarChart = ({ posts }) => {
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
    Irritated: 3,
    Neutral: 4,
    Content: 5,
    Happy: 6,
    "Very Happy": 7,
    Overjoyed: 8
  };

  const processData = () => {
    const counts = posts.reduce((acc, post) => {
      if (!acc[post.emotion]) {
        acc[post.emotion] = { emotion: post.emotion, upvotes: 0 };
      }
      acc[post.emotion].upvotes += post.upvotes;
      return acc;
    }, {});

    const data = Object.values(counts);

    return data.sort((a, b) => emotionOrder[a.emotion] - emotionOrder[b.emotion]);
  };

  const data = processData();

  return (
    <Container>
      <Card elevation={3} sx={{ p: 2, margin: 'auto', maxWidth: 600, flexGrow: 1 }}>
        <CardContent>
          <Typography variant="h6" component="div" gutterBottom align="center">
            Number of upvotes in the Posts related to the Overall Emotions
          </Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="emotion" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="upvotes" fill="#8884d8">
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colorMap[entry.emotion] || '#000000'} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Container>
  );
};

export default UpvotesEmotionBarChart;
