import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { Search, SearchIconWrapper, StyledInputBase } from "../styles/NavBar";

import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Logout from "@mui/icons-material/Logout";

const NavbarLoggedIn = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" style={{ background: "#FFFFFF" }}>
      <Toolbar>
        <Link to="/">Home</Link>{"     "}

        {/* <hr/> */}
        <Link to="/my-articles">My Articles</Link>        <hr></hr>

        <Search style={{ color: "#111111" }}>
          <SearchIconWrapper>
            <SearchIcon style={{ color: "#111111" }} />
          </SearchIconWrapper>
          <StyledInputBase
            style={{ color: "#111111" }}
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>

        <Button
          component={Link}
          to="/create-article"
          variant="contained"
          color="secondary"
        >
          Create Article
        </Button>

        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <Link
            to="/create-article"
            style={{ textDecoration: "none", color: "black" }}
          >
            <MenuItem>
              <Avatar /> My account
            </MenuItem>
          </Link>

          <Divider />

          <Link
            to="/"
            style={{ textDecoration: "none", color: "black" }}
          >
            <MenuItem>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Link>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default NavbarLoggedIn;