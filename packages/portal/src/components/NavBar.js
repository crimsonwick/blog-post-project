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

const Navbar = ({ login }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [field, setfield] = useState(' ');
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
    console.log(`revoking token: ${refreshToken}`);
    const body = { data: { token: `${refreshToken}` } };
    await logout(body);
  };

  const handleKeyDown = async (event) => {
    const response = await searchAPI(event.target.value);
    setSearchData(response.data);
    if (event.key === 'Enter') {
      setfield(' ');
    }
  };
  const handleChange = (event) => {
    setfield(event.target.value);
    //[event.target.name] = [event.target.value]
  };
  return (
    <AppBar position="fixed" style={{ background: '#FFFFFF' }}>
      <Toolbar>
        {/* <Typography 
        //   component={Link}
        //   to="/"
        //   variant="h6"
        //   sx={{
        //     flex: 1,
        //     textDecoration: 'none',
        //     marginLeft: '5px',
        //     fontWeight: '600',
        //     textTransform: 'capitalize',
        //   }}
        //   style={{ color: '#111111' }}
        // >
        //   Home
        // </Typography>

        // {login && (
        //   <Button
        //     component={Link}
        //     to="/my-articles"
        //     variant="contained"
        //     color="secondary"
        //     sx={{
        //       marginLeft: '15px',
        //       fontWeight: '600',
        //       textTransform: 'capitalize',
        //     }}
        //   >
        //     My Articles
        //   </Button>
        // )}

        // <Search sx={{ color: '#111111' }}>
        //   <SearchIconWrapper>
        //     <SearchIcon sx={{ color: '#111111' }} />
        //   </SearchIconWrapper>

        //   <StyledInputBase
        //     sx={{ color: '#111111' }}
        //     placeholder="Search…"
        //     inputProps={{ 'aria-label': 'search' }}
        //   />
        // </Search>

        // {login && (
        //   <Button
        //     component={Link}
        //     to="/create-article"
        //     variant="contained"
        //     color="secondary"
        //     sx={{
        //       fontWeight: '600',
        //       textTransform: 'capitalize',
        //       marginLeft: '15px',
        //     }}
        //   >
        //     Create Article
        //   </Button>
        // )}

        // {!login && (
        //   <div>
        //     <Button
        //       component={Link}
        //       to="/login"
        //       variant="contained"
        //       color="primary"
        //     >
        //       Login
        //     </Button>
        //     <Button
        //       component={Link}
        //       to="/signup"
        //       variant="contained"
        //       color="primary"
        //     >
        //       Sign Up
        //     </Button>
        //   </div>
        // )}

        // {login && (
        //   <div>
        //     <Tooltip title="Account settings">
        //       <IconButton
        //         onClick={handleClick}
        //         size="small"
        //         sx={{ ml: 2 }}
        //         aria-controls={open ? 'account-menu' : undefined}
        //         aria-haspopup="true"
        //         aria-expanded={open ? 'true' : undefined}
        //       >
        //         <Avatar
        //           alt="user display picture"
        //           // src={
        //           //   dp
        //           //     ? require(`../images/${dp}`)
        //           //     : require(`../images/${userData.avatar}`)
        //           // }
        //           sx={{ width: 32, height: 32 }}
        //         />
        //       </IconButton>
        //     </Tooltip>
        //     <Menu
        //       anchorEl={anchorEl}
        //       id="account-menu"
        //       open={open}
        //       onClose={handleClose}
        //       onClick={handleClose}
        //       PaperProps={{
        //         elevation: 0,
        //         sx: {
        //           overflow: 'visible',
        //           filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
        //           mt: 1.5,
        //           '& .MuiAvatar-root': {
        //             width: 32,
        //             height: 32,
        //             ml: -0.5,
        //             mr: 1,
        //           },
        //           '&:before': {
        //             content: '""',
        //             display: 'block',
        //             position: 'absolute',
        //             top: 0,
        //             right: 14,
        //             width: 10,
        //             height: 10,
        //             bgcolor: 'background.paper',
        //             transform: 'translateY(-50%) rotate(45deg)',
        //             zIndex: 0,
        //           },
        //         },
        //       }}
        //       transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        //       anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        //     >
        //       <Link
        //         to="/account-details"
        //         style={{ textDecoration: 'none', color: 'black' }}
        //       >
        //         <MenuItem>
        //           <Avatar
        //             alt="user display picture"
        //             // src={
        //             //   dp
        //             //     ? require(`../images/${dp}`)
        //             //     : require(`../images/${userData.avatar}`)
        //             // }
        //           />
        //           My account
        //         </MenuItem>
        //       </Link>
        //       <Divider />
        //       <Link
        //         to="/"
        //         style={{ textDecoration: 'none', color: 'black' }}
        //         onClick={handleLogout}
        //       >
        //         <MenuItem>
        //           <ListItemIcon>
        //             <Logout fontSize="small" />
        //           </ListItemIcon>
        //           Logout
        //         </MenuItem>
        //       </Link>
        //     </Menu>
        //   </div>
  // )}*/}
        <Link
          to="/"
          style={{ padding: 10, textDecoration: 'none', color: 'black' }}
        >
          Home
        </Link>
        {login && (
          <Link
            to="/my-articles"
            style={{ padding: 10, textDecoration: 'none', color: 'black' }}
          >
            My Articles
          </Link>
        )}

        <div style={{ display: 'flex' }}>
          <Search>
            <SearchIconWrapper
              style={{
                borderBottomLeftRadius: '5px',
                borderBottomRightRadius: '5px',
                borderTopLeftRadius: '5px',
                borderTopRightRadius: '5px',
              }}
            >
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              name="search"
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              value={field}
            />
          </Search>

          {login && (
            <Button
              style={{ marginRight: '10px' }}
              component={Link}
              to="/create-article"
              variant="contained"
              color="secondary"
            >
              Create Article
            </Button>
          )}
          {!login && (
            <div>
              <Button
                style={{ marginRight: '10px' }}
                component={Link}
                to="/login"
                variant="contained"
                color="primary"
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
                  to="/change-password"
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  <MenuItem>
                    <Avatar /> My account
                  </MenuItem>
                </Link>
                <Divider />
                <Link
                  to="/"
                  style={{ textDecoration: 'none', color: 'black' }}
                  onClick={() => setLoggedIn(false)}
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
        </div>
      </Toolbar>
    </AppBar>
  );
};
export default Navbar;
