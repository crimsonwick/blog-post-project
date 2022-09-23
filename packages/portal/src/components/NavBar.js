import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from '../styles/NavBar.js';

const NavBar = () => {
  return (
    <AppBar position="static" style={{ background: '#FFFFFF' }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flex: 1 }} style={{ color: '#111111' }}>
          <Link
            to="/"
            style={{ textDecoration: "none", color: "black" }}
          >
            Home
          </Link>
        </Typography>

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
        <Button
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
          color="primary"
        >
          Sign Up
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
