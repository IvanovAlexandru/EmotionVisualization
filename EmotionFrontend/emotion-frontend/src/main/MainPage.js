import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Settings from "./Settings";
import Search from "./Search";
import History from "./History";

export default function MainPage() {
  return (
    <Container component="main" maxWidth="">
      <CssBaseline />
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" justifyContent="flex-start">
          <History/>
        </Box>
        <Box display="flex" justifyContent="center">  
          <Search />
        </Box>
        <Box display="flex" justifyContent="flex-end" mb={2}>
          <Settings />
        </Box>
      </Box>
    </Container>
  );
}
