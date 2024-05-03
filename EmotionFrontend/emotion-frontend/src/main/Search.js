import * as React from "react";
import { Box, TextField, Button, Container} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Paper from "@mui/material/Paper";
import { useState } from "react";

export default function Search() {
  const [nrPosts, setNrPosts] = useState(null);

  const handlePostsChange = (event) => {
    setNrPosts(event.target.value);
  };

  return (
    <Container>
      <Paper elevation={3} sx={{ paddingLeft: 2, paddingRight: 2 }}>
        <Box display="flex" alignItems="center" marginTop={2}>
          <TextField id="topic" label="Topic" color="primary" focused />
          <TextField id="subreddit" label="Subreddit" color="primary" focused />
          <FormControl sx={{ m: 1, minWidth: 80, maxWidth: 100 }}>
            <InputLabel id="nr-posts">Posts</InputLabel>
            <Select
              labelId="nr-posts"
              id="select-nr-posts"
              value={nrPosts}
              label="Nr. of Posts"
              onChange={handlePostsChange}
              color="primary"
              focused>
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
          <IconButton color="primary" style={{ marginLeft: "8px" }}>
            <SearchIcon />
          </IconButton>
        </Box>
      </Paper>
    </Container>
  );
}
