import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
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
  IconButton,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AuthContext from "../authentication/AuthContext";
import { getUserById, editUserById } from "../api/ApiCalls";

export default function AccountInfo() {
  const navigate = useNavigate();
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
    const token = localStorage.getItem("token");
    const id = localStorage.getItem("id");

    editUserById(id, userInfo, token).then((response) => {
      if (response) {
        console.log(userInfo);
      } else {
        setError("Unable to update account with these credentials");
      }
    });
  };

  const handleNavigateMain = () => {
    navigate('/main');
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
      <IconButton
        onClick={handleNavigateMain}
        sx={{ 
          position: 'fixed',
          top: 20,
          right: 20
        }}>
        <ArrowBackIcon fontSize="large"/>
      </IconButton>
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
            Update
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
