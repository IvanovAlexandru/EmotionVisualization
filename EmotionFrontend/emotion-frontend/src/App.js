import logo from "./logo.svg";
import "./App.css";
import { getUserById } from "./api/ApiCalls";
import { login } from "./api/AuthenticationCalls";
import { useState, useEffect } from "react";
import { Container, ThemeProvider, createTheme } from "@mui/material";
import { themeOptions } from "./themes/styles";
import Login from "./authentication/Login";

const defaultTheme = createTheme(themeOptions);

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Login />
    </ThemeProvider>
  );
}

export default App;
