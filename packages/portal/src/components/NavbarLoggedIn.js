import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { Search, SearchIconWrapper, StyledInputBase } from '../styles/NavBar';

function NavbarLoggedIn() {
  return (
    <AppBar position="static" style={{ background: '#FFFFFF' }}>
      <Toolbar>
        <Link to="/">Home</Link>
        <Link to="/my-articles">My Articles</Link>
        <Search style={{ color: '#111111' }}>
          <SearchIconWrapper>
            <SearchIcon style={{ color: '#111111' }} />
          </SearchIconWrapper>
          <StyledInputBase
            style={{ color: '#111111' }}
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
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
      </Toolbar>
    </AppBar>
  );
}

export default NavbarLoggedIn;
