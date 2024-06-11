import { Container, Box } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Settings from "./Settings";
import History from "./History";
import { useState } from "react";
import GetEmotionsFromText from "./GetEmotionsFromText";

export default function PlainText() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [refreshHistory, setRefreshHistory] = useState(false);

  const handleHistoryItemClick = (item) => {
    setSelectedItem(item);
  };

  const toggleRefreshHistory = () => {
    setRefreshHistory((prev) => !prev);
  };

  return (
    <Container component="main" maxWidth="">
      <CssBaseline />
      <Box display="flex" justifyContent="space-between">
        <Box display="flex" justifyContent="flex-start" mb={1} mt={1}>
          <History
            onItemClick={handleHistoryItemClick}
            refreshTrigger={refreshHistory}
          />
        </Box>
        <Box display="flex" justifyContent="center" mb={1} mt={1}>
            <GetEmotionsFromText/>
        </Box>
        <Box display="flex" justifyContent="flex-end" mb={1} mt={1}>
          <Settings />
        </Box>
      </Box>
    </Container>
  );
}
