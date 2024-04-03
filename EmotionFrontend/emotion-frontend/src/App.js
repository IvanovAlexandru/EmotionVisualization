import logo from "./logo.svg";
import "./App.css";
import { login } from "./api/AuthenticationCalls";
import { useState, useEffect } from "react";
import { Container, ThemeProvider, createTheme } from "@mui/material";
import { themeOptions } from "./themes/styles";
import Login from "./authentication/Login";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Authentication from "./authentication/Authentication";
import MainPage from "./main/MainPage";

const defaultTheme = createTheme(themeOptions);

function App() {


  return (
    <ThemeProvider theme={defaultTheme}>
      <Router>
        <Routes>
           <Route path="/" element={<Login/>}/> 
           <Route path="/auth" element={<Authentication/>}/>
           <Route path="/main" element={<MainPage/>}/>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
