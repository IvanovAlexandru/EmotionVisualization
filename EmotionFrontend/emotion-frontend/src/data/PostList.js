import React from 'react';
import { Box, Typography, Link, Paper } from '@mui/material';

const emotionColors = {
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

const PostList = ({ posts }) => {
  if (!posts || posts.length === 0) {
    return <Typography variant="subtitle1" sx={{ mt: 2 }}>No posts available.</Typography>;
  }

  return (
    <Box sx={{ mt: 2 }}>
      <Paper elevation={2} sx={{ p: 2 }}>
        {posts.map((post, index) => (
          <Box key={index} sx={{ marginBottom: 2 }}>
            <Typography variant="h6" color="text.primary">{post.title}</Typography>
            <Typography variant="subtitle2" style={{ color: emotionColors[post.emotion] || '#000' }}>
              Overall Emotion: {post.emotion}
            </Typography>
            <Typography variant="body2">
              <Link href={post.url} target="_blank" rel="noopener">View Post</Link>
            </Typography>
          </Box>
        ))}
      </Paper>
    </Box>
  );
};

export default PostList;
