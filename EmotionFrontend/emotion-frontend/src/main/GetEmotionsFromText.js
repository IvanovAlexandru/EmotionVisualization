import * as React from "react";
import {
  TextField,
  IconButton,
  Container,
  Paper,
  Typography,
  Tooltip,
  CircularProgress,
  Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InfoIcon from "@mui/icons-material/Info";
import { useState } from "react";
import { getEmotionsFromPlainText } from "../api/ApiCalls";

const emotionColors = {
  Enraged: "#8b0000", // DarkRed
  "Very Angry": "#dc143c", // Crimson
  Angry: "#ff4500", // OrangeRed
  Irritated: "#ff6347", // Tomato
  Neutral: "#808080", // Grey
  Content: "#c0ff33", // Light Green
  Happy: "#ffdf00", // Yellow
  "Very Happy": "#ffa500", // Dark Orange
  Overjoyed: "#ffb347", // Orange
};

export default function GetEmotionsFromText() {
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [emotionData, setEmotionData] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const id = localStorage.getItem("id");
      const token = localStorage.getItem("token");
      const data = await getEmotionsFromPlainText(id, text, token);
      console.log(data);
      setEmotionData(data);
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  return (
    <Container>
      <Paper elevation={3} sx={{ p: 3, marginTop: 2 }}>
        <Typography variant="h6" sx={{ marginBottom: 2, textAlign: "center" }}>
          Test on given text
        </Typography>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs>
            <TextField
              fullWidth
              id="text"
              label="Text"
              variant="outlined"
              multiline
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </Grid>
          <Grid item>
            <Tooltip title="The text can be in any language" placement="right">
              <IconButton>
                <InfoIcon color="action" />
              </IconButton>
            </Tooltip>
          </Grid>
          <Grid item>
            <IconButton color="primary" onClick={handleSearch}>
              {loading ? <CircularProgress size={24} /> : <SearchIcon />}
            </IconButton>
          </Grid>
        </Grid>
        {emotionData && (
          <Paper elevation={3} sx={{ p: 2, marginTop: 2 }}>
            <Typography
              variant="body1"
              style={{ color: emotionColors[emotionData.emotion] || "#000" }}>
              <strong>Emotion:</strong> {emotionData.emotion}
            </Typography>
            <Typography
              variant="body1"
              style={{ color: emotionColors[emotionData.emotion] || "#000" }}>
              <strong>Sentiment Score:</strong> {emotionData.sentiment_score}
            </Typography>
          </Paper>
        )}
      </Paper>
    </Container>
  );
}
