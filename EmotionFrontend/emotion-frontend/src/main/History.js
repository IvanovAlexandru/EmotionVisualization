import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from '@mui/icons-material/Delete';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Tooltip from '@mui/material/Tooltip';
import PersonIcon from '@mui/icons-material/Person';
import { grey } from "@mui/material/colors";
import { getAllUsersHistory, getUserById, deleteHistory } from "../api/ApiCalls";

const emotionColors = {
  "Very Angry": '#dc143c',   // Crimson
    Angry: '#ff4500',          // OrangeRed
    Neutral: '#808080',        // Grey
    Content: '#c0ff33',        // Light Green
    Happy: '#ffdf00',          // Yellow
    "Very Happy": '#ffa500',   // Dark Orange
    Overjoyed: '#ffb347'       // Orange
};

export default function History({ onItemClick, refreshTrigger }) {
  const [historyData, setHistoryData] = useState([]);
  const [userData, setUserData] = useState({ username: '', email: '' });

  useEffect(() => {
    fetchData();
    fetchUserData();
  }, [refreshTrigger]);

  const fetchData = async () => {
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    try {
      const data = await getAllUsersHistory(id, token);
      setHistoryData(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching history:", error);
    }
  };

  const fetchUserData = async () => {
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    try {
      const data = await getUserById(id, token);
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleDelete = async (item) => {
    const id = localStorage.getItem("id");
    const token = localStorage.getItem("token");
    try {
      await deleteHistory(id, item.id, token);
      setHistoryData(historyData.filter(x => x.id !== item.id));
    } catch (error) {
      console.error("Error deleting history item:", error);
    }
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper", m: 2, borderRadius: 2 }}>
      <Card sx={{ minWidth: 275, m: 1, boxShadow: 3 }}>
        <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ bgcolor: grey[500], width: 56, height: 56 }}>
            <PersonIcon />
          </Avatar>
          <Typography variant="h6" component="div">
            {userData.username || 'Username'}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {userData.email || 'user@example.com'}
          </Typography>
          <Typography variant="body2" gutterBottom>
            History
          </Typography>
        </CardContent>
      </Card>
      <List component="nav" aria-label="user history">
        {historyData.map((item, index) => (
          <ListItem key={index} secondaryAction={
            <Tooltip title="Delete">
              <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(item)}
                sx={{
                  color: grey[500],
                  '&:hover': {
                    color: 'red',
                  }
                }}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          }>
            <ListItemButton onClick={() => onItemClick(item)}>
              <ListItemText primary={item.topic}
                secondary={`Overall Emotion: ${item.emotion}`}
                primaryTypographyProps={{ style: { color: emotionColors[item.emotion] || grey[500] } }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}
