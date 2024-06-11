import * as React from "react";
import { IconButton, Tooltip, Menu, MenuItem } from "@mui/material";
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from '@mui/icons-material/Home';
import { useNavigate } from "react-router-dom";
import AuthContext from "../authentication/AuthContext";
import { useContext } from "react";

export default function Settings() {
  const { setAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
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
    navigate('/');
  };

  const handleAccount = () => {
    navigate('/account');
  };

  const handleHome = () => {
    navigate('/main');
  };

  const handleText = () => {
    navigate('/text')
  }

  return (
    <div>
      <Tooltip title="Home">
        <IconButton
          onClick={handleHome}
          sx={{ marginRight: 2, fontSize: "64px" }}
        >
          <HomeIcon fontSize="large" color="primary"/>
        </IconButton>
      </Tooltip>
      <Tooltip title="Settings">
        <IconButton
          id="basic-button"
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          sx={{ fontSize: "64px" }}
        >
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
        }}
      >
        <MenuItem onClick={handleAccount}>My account</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
        <MenuItem onClick={handleText}>Test on your Text</MenuItem>
      </Menu>
    </div>
  );
}
