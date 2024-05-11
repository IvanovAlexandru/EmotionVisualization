import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { CssBaseline, IconButton, Paper } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import Tooltip from '@mui/material/Tooltip';
import { useNavigate } from "react-router-dom";
import AuthContext from "../authentication/AuthContext";
import { useContext } from "react";

export default function Settings() {

  const { setAuthenticated } = useContext(AuthContext);
  const navigator = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    setAuthenticated(false);
    localStorage.clear();
    navigator('/')
  }

  const handleAccount = () => {
    navigator('/account');
  }
  return (
    <div>
      <Tooltip title="Settings">
      <IconButton
        sx={{ fontSize: "64px" }}
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}>
        <SettingsIcon fontSize="large" color="primary"/>
      </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}>
        <MenuItem onClick={handleAccount}>My account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
