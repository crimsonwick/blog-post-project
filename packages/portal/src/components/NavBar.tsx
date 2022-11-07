import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import Logout from '@mui/icons-material/Logout';
import SearchIcon from '@mui/icons-material/Search';
import { Box, Typography } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import * as React from 'react';
import { useContext, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { AppContextInterface, NavBarProps } from '../interface/App';
import { searchAPI, searchMyPostsAPI } from '../services/LoginApi';
import { Search, SearchIconWrapper, StyledInputBase } from '../styles/NavBar';
import { Alerts } from './Alerts';

export const Navbar = (props: NavBarProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const context: AppContextInterface | null = useContext(AppContext);
  const open = Boolean(anchorEl);

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'ddutykcuf',
    },
  });

  /**
   * Handle Click Function
   * @param event
   */
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  /**
   * Handle Close Function
   */
  const handleClose = () => {
    setAnchorEl(null);
  };

  /**
   * Handle Key Down Function
   * @param event
   */
  const handleKeyDown = async (
    event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const target = event.target as HTMLInputElement;
    if (props.mainPage) {
      const response = await searchAPI(target.value);
      context?.setSearchData(response.data);
    } else {
      const response = await searchMyPostsAPI(
        target.value,
        context?.userData.id as unknown as string
      );
      context?.setSearchMyData(response.data);
    }
  };

  /**
   * handle change
   * @param event
   */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    [event.target.name] = [event.target.value];
  };

  /**
   * handle logout
   */
  const handleLogout = () => {
    try {
      context?.logoutToken();
      console.log(`revoking token: ${context?.refreshToken}`);
      context?.setLoggedIn(false);
      context?.setDp('');
      Alerts.success('Logged out Successfully');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <AppBar position='sticky' style={{ background: '#FFFFFF' }}>
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Typography
              component={NavLink}
              style={
                props.isHomeLinkActive ? { color: 'black' } : { color: 'grey' }
              }
              to='/'
              variant='h6'
              sx={{
                marginLeft: '5px',
                textTransform: 'capitalize',
                textDecoration: 'none',
              }}
            >
              Home
            </Typography>
            {props.login && (
              <Typography
                component={NavLink}
                style={
                  props.isArticlesLinkActive
                    ? { color: 'black' }
                    : { color: 'grey' }
                }
                to='/articles'
                variant='h6'
                sx={{
                  marginLeft: '15px',
                  textTransform: 'capitalize',
                  textDecoration: 'none',
                  paddingLeft: '20px',
                }}
              >
                My Articles
              </Typography>
            )}
          </Box>
          {!props.isArticleDetail && !props.isCreateArticle && (
            <Search sx={{ color: '#111111' }}>
              <SearchIconWrapper>
                <SearchIcon sx={{ color: '#111111' }} />
              </SearchIconWrapper>

              <StyledInputBase
                sx={{ color: '#111111' }}
                placeholder='Search…'
                inputProps={{ 'aria-label': 'search' }}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
            </Search>
          )}
          {props.login && (
            <Button
              component={Link}
              to='/create-article'
              variant='contained'
              color='secondary'
              sx={{
                fontWeight: '600',
                textTransform: 'capitalize',
                marginLeft: '15px',
              }}
            >
              Create Article
            </Button>
          )}
          {!props.login && (
            <Box>
              <Button
                component={Link}
                to='/login'
                variant='contained'
                color='primary'
                sx={{ marginRight: '10px' }}
              >
                Login
              </Button>
              <Button
                component={Link}
                to='/signup'
                variant='contained'
                color='secondary'
              >
                Sign Up
              </Button>
            </Box>
          )}
          {props.login && (
            <Box>
              <Tooltip title='Account settings'>
                <IconButton
                  onClick={handleClick}
                  size='small'
                  sx={{ ml: 2 }}
                  aria-controls={open ? 'account-menu' : undefined}
                  aria-haspopup='true'
                  aria-expanded={open ? 'true' : undefined}
                >
                  {context?.dp ? (
                    <AdvancedImage
                      cldImg={cld.image(`main/uploads/${context?.dp}`)}
                      style={{ width: 32, height: 32, borderRadius: '50%' }}
                      alt='dp'
                    />
                  ) : (
                    <Avatar
                      src={''}
                      alt='dp'
                      sx={{ width: 32, height: 32, borderRadius: '50%' }}
                    />
                  )}
                </IconButton>
              </Tooltip>
              <Menu
                anchorEl={anchorEl}
                id='account-menu'
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
                  to='/account-details'
                  style={{ textDecoration: 'none', color: 'black' }}
                >
                  <MenuItem>
                    {context?.dp ? (
                      <AdvancedImage
                        cldImg={cld.image(`main/uploads/${context?.dp}`)}
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: '50%',
                          marginRight: '7px',
                        }}
                        alt='dp'
                      />
                    ) : (
                      <Avatar src={''} alt='dp' />
                    )}
                    My account
                  </MenuItem>
                </Link>
                <Divider />
                <Link
                  to='/'
                  style={{ textDecoration: 'none', color: 'black' }}
                  onClick={handleLogout}
                >
                  <MenuItem>
                    <ListItemIcon>
                      <Logout fontSize='small' />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </Link>
              </Menu>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};
