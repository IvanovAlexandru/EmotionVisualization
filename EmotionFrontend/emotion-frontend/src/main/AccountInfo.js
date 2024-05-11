import React, { useEffect, useState, useContext } from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Typography,
  Container,
  Paper,
  Alert,
  Box,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AuthContext from "../authentication/AuthContext";
import { getUserById } from "../api/ApiCalls";
import { editUserById } from "../api/ApiCalls";

export default function AccountInfo() {
  const { authenticated, setAuthenticated } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({ username: "", email: "" });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (authenticated) {
        const token = localStorage.getItem("token");
        const id = localStorage.getItem("id");
        const userData = await getUserById(id, token);
        if (userData) {
          setUserInfo(userData);
        } else {
          setError("Failed to fetch user data.");
        }
      }
    };

    fetchUserInfo();
  }, [authenticated]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");

    editUserById();
    console.log("Updated user info:", userInfo);
    // You may want to add an API function to update the user info
  };

  if (!authenticated) {
    return (
      <Typography variant="h6" align="center">
        Please log in to view this page.
      </Typography>
    );
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Account Information
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            value={userInfo.username}
            onChange={handleInputChange}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            value={userInfo.email}
            onChange={handleInputChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}>
            Update Info
          </Button>
        </Box>
      </Box>
      {error && (
        <Paper
          elevation={3}
          sx={{
            padding: 2,
            marginTop: 2,
          }}>
          <Alert severity="error">{error}</Alert>
        </Paper>
      )}
    </Container>
  );
}
