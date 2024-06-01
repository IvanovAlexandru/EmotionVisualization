import * as React from "react";
import {
  Box,
  TextField,
  IconButton,
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  Typography,
  Tooltip,
  CircularProgress,
  Grid,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import InfoIcon from "@mui/icons-material/Info";
import { useState } from "react";
import EmotionBarChart from "../data/EmotionBarChart";
import { searchTopic } from "../api/ApiCalls";
import PostList from "../data/PostList";

export default function Search({
  selectedItem,
  setSelectedItem,
  onSearchComplete,
}) {
  const [nrPosts, setNrPosts] = useState(10);
  const [topic, setTopic] = useState("");
  const [subreddit, setSubreddit] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePostsChange = (event) => {
    setNrPosts(event.target.value);
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const id = localStorage.getItem("id");
      const token = localStorage.getItem("token");

      const data = await searchTopic(
        id,
        topic,
        nrPosts,
        subreddit || "all",
        token
      );
      setSelectedItem(data);
      onSearchComplete();
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  return (
    <Container>
      <Paper
        elevation={3}
        sx={{ p: 3, marginTop: 2, display: "flex", flexDirection: "column" }}>
        <Typography variant="h6" sx={{ marginBottom: 2, textAlign: "center" }}>
          Search
        </Typography>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          sx={{ marginBottom: 2 }}>
          <TextField
            fullWidth
            id="topic"
            label="Topic"
            variant="outlined"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            sx={{ flex: 1, marginRight: 2 }}
          />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flex: 1,
              marginRight: 2,
            }}>
            <TextField
              fullWidth
              id="subreddit"
              label="Subreddit (Optional)"
              variant="outlined"
              value={subreddit}
              onChange={(e) => setSubreddit(e.target.value)}
            />
            <Tooltip
              title="Leave blank to search all subreddits"
              placement="right">
              <IconButton>
                <InfoIcon color="action" />
              </IconButton>
            </Tooltip>
          </Box>
          <FormControl sx={{ width: 150, marginRight: 2 }}>
            <InputLabel id="nr-posts-label">Nr. of Posts</InputLabel>
            <Select
              labelId="nr-posts-label"
              id="select-nr-posts"
              value={nrPosts}
              onChange={handlePostsChange}
              label="Nr. of Posts">
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <IconButton color="primary" onClick={handleSearch}>
            {loading ? <CircularProgress size={24} /> : <SearchIcon />}
          </IconButton>
        </Box>
        {selectedItem && (
          <Box sx={{ mt: 2, p: 2 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <PostList posts={selectedItem.postModels} />
              </Grid>
              <Grid item xs={12} md={6}>
                <EmotionBarChart posts={selectedItem.postModels} />
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>
    </Container>
  );
}
