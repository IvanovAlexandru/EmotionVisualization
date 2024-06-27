import React from 'react';
import { Container, Card, CardContent, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TitleCommentsBarChart = ({ posts }) => {

  const data = posts.map(post => ({
    title: post.title,
    title_score: post.title_score,
    comment_scores_avg: post.comment_scores_avg
  }));

  return (
    <Container>
      <Card elevation={3} sx={{ p: 2, margin: 'auto', maxWidth: 600, flexGrow: 1 }}>
        <CardContent>
          <Typography variant="h6" component="div" gutterBottom align="center">
            Post Score vs. Comment Scores Average
          </Typography>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="title" hide />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="title_score" fill="#8884d8" name="Post Score" />
              <Bar dataKey="comment_scores_avg" fill="#82ca9d" name="Comment Scores Average" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Container>
  );
};

export default TitleCommentsBarChart;
