import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { addUser } from "../api/AuthenticationCalls";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Alert } from "@mui/material";
import Paper from "@mui/material/Paper";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}>
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Ivanov Alexandru
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}


export default function Authentication() {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      username: data.get("username"),
      email: data.get("email"),
      password: data.get("password"),
    });
    addUser(data.get("username"), data.get("password"), data.get("email"))
      .then(() => {
        if(data){
          setError("Unable to create account with these credentials")
        }
        else{
          navigate("/")
        }
      })
  };

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
          Create Account
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
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}>
            Create Account
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/" variant="body2">
                {"Already have an account?"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      {error && (
        <Paper
          elevation={3}
          sx={{
            padding: 2,
            marginTop: 2
          }}>
          <Alert severity="error">{error}</Alert>
        </Paper>
      )}
      <Copyright sx={{ mt: 8, mb: 4 }} />
    </Container>
  );
}
