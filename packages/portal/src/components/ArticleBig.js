import React from 'react';
import { Box } from '@mui/system';
import '../styles/Article/Article.css';
import { Card, List } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import flexContainer from '../styles/Article/List';
import { Avatar } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import Chip from '@mui/material/Chip';

const ArticleBig = () => {
  return (
    <Card
      mt={1}
      sx={{
        height: '100vh',
        marginTop: '20px',
      }}
    >
      <Chip label="Travel" sx={{ marginTop: '5px' }} />
      <Typography
        variant="h4"
        component="h3"
        sx={{ width: '856px', marginTop: '10px' }}
      >
        I Created A Developer Rap Video - Here's What I Learned From It. Check
        It Out.
      </Typography>
      <List style={flexContainer}>
        <ListItem className="user">
          <ListItemIcon>
            <Avatar
              src="	https://cdns-images.dzcdn.net/images/artist/77220ccb5a36d0e5df2c9e47f2c89de4/500x500.jpg"
              alt="spongebob"
            />
          </ListItemIcon>
          <ListItemText primary="Spongebob Squarepants" />
        </ListItem>
        <ListItem className="date">
          <ListItemIcon>
            <CalendarTodayIcon />
          </ListItemIcon>
          <ListItemText primary="12 September 2022" />
        </ListItem>
      </List>
      <img
        src="https://c1.wallpaperflare.com/preview/395/809/250/glass-jar-flower-vase.jpg"
        alt="vase in a room minimalist"
        className="articleBigImg"
      />
      <Typography variant="h6" sx={{ width: '856px', marginTop: '10px' }}>
        Did you come here for something in particular or just general
        Riker-bashing? And blowing into maximum warp
      </Typography>
    </Card>
  );
};

export default ArticleBig;
