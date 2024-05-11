import React from 'react';
import { Container, Paper } from '@mui/material';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const EmotionPieChart = ({ posts }) => {
  const colorMap = {
    Ecstatic: '#ffb347',      // Orange
    "Very Happy": '#ffa500',  // Dark Orange
    Happy: '#ffdf00',         // Yellow
    Content: '#c0ff33',       // Light Green
    Neutral: '#808080',       // Grey
    Irritated: '#ff6347',     // Tomato
    Angry: '#ff4500',         // OrangeRed
    "Very Angry": '#dc143c',  // Crimson
    Enraged: '#8b0000'        // DarkRed
  };

  const processData = () => {
    const counts = posts.reduce((acc, post) => {
      acc[post.emotion] = (acc[post.emotion] || 0) + 1;
      return acc;
    }, {});

    return Object.keys(counts).map(key => ({
      name: key,
      value: counts[key],
      color: colorMap[key] || '#000000'
    }));
  };

  const data = processData();

  return (
    <Container>
      <Paper elevation={3} sx={{ p: 2, margin: 'auto', maxWidth: 600, flexGrow: 1 }}>
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
      </Paper>
    </Container>
  );
};

export default EmotionPieChart;
