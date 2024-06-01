import { Container, Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Settings from "./Settings";
import Search from "./Search";
import History from "./History";
import { useState } from "react";

export default function MainPage() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [refreshHistory, setRefreshHistory] = useState(false);

  const handleHistoryItemClick = (item) => {
    setSelectedItem(item);
  };

  const toggleRefreshHistory = () => {
    setRefreshHistory(prev => !prev);
  };

  return (
    <Container component="main" maxWidth="">
      <CssBaseline />
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" justifyContent="flex-start" mb={2} mt={2}>
          <History onItemClick={handleHistoryItemClick} refreshTrigger={refreshHistory}/>
        </Box>
        <Box display="flex" justifyContent="center" mb={2} mt={2} >  
          <Search selectedItem={selectedItem} setSelectedItem={setSelectedItem} onSearchComplete={toggleRefreshHistory}/>
        </Box>
        <Box display="flex" justifyContent="flex-end" mb={2} mt={2}>
          <Settings />
        </Box>
      </Box>
    </Container>
  );
}
