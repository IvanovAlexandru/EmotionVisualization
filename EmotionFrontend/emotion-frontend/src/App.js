import "./App.css";
import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material";
import { themeOptions } from "./themes/styles";
import Login from "./authentication/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import Authentication from "./authentication/Authentication";
import MainPage from "./main/MainPage";
import AuthContext from "./authentication/AuthContext";
import AccountInfo from "./main/AccountInfo";
import PlainText from "./main/PlainText";

const defaultTheme = createTheme(themeOptions);

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const id = localStorage.getItem("id");
    setAuthenticated(!!id);
  }, []);

  return (
    <ThemeProvider theme={defaultTheme}>
      <AuthContext.Provider value={{ authenticated, setAuthenticated }}>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/auth" element={<Authentication />} />
            {authenticated ? (
              <Route path="/main" element={<MainPage />} />
            ) : (
              <Route path="/main" element={<Navigate to="/" />} />
            )}
            {authenticated ? (
              <Route path="/account" element={<AccountInfo />} />
            ) : (
              <Route path="/account" element={<Navigate to="/" />} />
            )}
            {authenticated ? (
              <Route path="/text" element={<PlainText />} />
            ) : (
              <Route path="/text" element={<Navigate to="/" />} />
            )}
          </Routes>
        </Router>
      </AuthContext.Provider>
    </ThemeProvider>
  );
}

export default App;
