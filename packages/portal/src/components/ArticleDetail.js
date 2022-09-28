import React, { useContext } from 'react';
import '../styles/Article/Article.css';
import { Card, List } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import flexContainer from '../styles/Article/List';
import { Avatar } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import Chip from '@mui/material/Chip';
import { useLocation } from 'react-router-dom';
import { AppContext } from '../App';

const ArticleDetail = () => {
  const { dp, userData } = useContext(AppContext);
  const location = useLocation();
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
        {location.state.object.title}
      </Typography>
      <List style={flexContainer}>
        <ListItem className="user">
          <ListItemIcon>
            <Avatar
              // src={
              //   dp
              //     ? require(`../images/${dp}`)
              //     : require(`../images/${userData.avatar}`)
              // }
              alt="user_dp"
            />
          </ListItemIcon>
          <ListItemText primary="Spongebob Squarepants" />
        </ListItem>
        <ListItem className="date">
          <ListItemIcon>
            <CalendarTodayIcon />
          </ListItemIcon>
          <ListItemText
            primary={`${location.state.object.timetoRead} Min. To Read`}
          />
        </ListItem>
      </List>
      <img
        // src={require(`../uploads/${location.state.object.image}`)}
        alt="post_img"
        className="articleBigImg"
      />
      <Typography variant="h6" sx={{ width: '856px', marginTop: '10px' }}>
        {location.state.object.body}
      </Typography>
    </Card>
  );
};

export default ArticleDetail;
