import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from '../styles/NavBar.js';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Divider from '@mui/material/Divider';
import Logout from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Avatar from '@mui/material/Avatar';
import { logout } from '../services/LoginApi.js';
import { useContext, useState } from 'react';
import { AppContext } from '../App.js';
import { searchAPI } from '../services/LoginApi.js';
import { Typography } from '@mui/material';
import flexContainer from '../styles/Article/List';
import { Box } from '@mui/material';
const Navbar = ({ login }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { setLoggedIn, setSearchData, refreshToken, userData, dp } =
    useContext(AppContext);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = async () => {
    try {
      const body = { data: { token: `${refreshToken}` } };
      await logout(body);
      console.log(`revoking token: ${refreshToken}`);
      setLoggedIn(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <AppBar position="static" style={{ background: '#FFFFFF' }}>
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography
            component={Link}
            to="/"
            variant="h6"
            sx={{
              // flex: 1,
              marginLeft: '5px',
              fontWeight: '600',
              textTransform: 'capitalize',
              // flexGrow: 0,
              // flexShrink: 0,
              // flexBasis: '70px',
              color: '#111111',
              textDecoration: 'none',
            }}
          >
            Home
          </Typography>
          {login && (
            <Typography
              component={Link}
              to="/my-articles"
              variant="h6"
              sx={{
                marginLeft: '15px',
                fontWeight: '600',
                textTransform: 'capitalize',
                textDecoration: 'none',
                paddingLeft: '20px',
                color: '#111111',
              }}
            >
              My Articles
            </Typography>
          )}
        </Box>
        <Search sx={{ color: '#111111' }}>
          <SearchIconWrapper>
            <SearchIcon sx={{ color: '#111111' }} />
          </SearchIconWrapper>
          <StyledInputBase
            sx={{ color: '#111111' }}
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </Search>
        {login && (
          <Button
            component={Link}
            to="/create-article"
            variant="contained"
            color="secondary"
            sx={{
              fontWeight: '600',
              textTransform: 'capitalize',
              marginLeft: '15px',
            }}
          >
            Create Article
          </Button>
        )}
        {!login && (
          <div>
            <Button
              component={Link}
              to="/login"
              variant="contained"
              color="primary"
              sx={{ marginRight: '10px' }}
            >
              Login
            </Button>
            <Button
              component={Link}
              to="/signup"
              variant="contained"
              color="secondary"
            >
              Sign Up
            </Button>
          </div>
        )}
        {login && (
          <div>
            <Tooltip title="Account settings">
              <IconButton
                onClick={handleClick}
                size="small"
                sx={{ ml: 2 }}
                aria-controls={open ? 'account-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                <Avatar
                  alt="user display picture"
                  src={
                    dp
                      ? require(`../images/${dp}`)
                      : userData.avatar
                      ? require(`../images/${userData.avatar}`)
                      : ''
                  }
                  sx={{ width: 32, height: 32 }}
                />
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
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <Link
                to="/account-details"
                style={{ textDecoration: 'none', color: 'black' }}
              >
                <MenuItem>
                  <Avatar
                    alt="user display picture"
                    src={
                      dp
                        ? require(`../images/${dp}`)
                        : userData.avatar
                        ? require(`../images/${userData.avatar}`)
                        : ''
                    }
                  />
                  My account
                </MenuItem>
              </Link>
              <Divider />
              <Link
                to="/"
                style={{ textDecoration: 'none', color: 'black' }}
                onClick={handleLogout}
              >
                <MenuItem>
                  <ListItemIcon>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  Logout
                </MenuItem>
              </Link>
            </Menu>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;