import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Avatar, Card, CardMedia, List } from '@mui/material';
import Chip from '@mui/material/Chip';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import React from 'react';
import { AppContext } from '../App';
import { parseName } from '../services/LoginApi';
import '../styles/Article/Article.css';
import flexContainer from '../styles/Article/List';
import { useContext } from 'react';

const ArticleDetail = (props) => {
  const { dp } = useContext(AppContext);
  return (
    <Card
      mt={1}
      sx={{
        marginTop: '20px',
        marginBottom: '10px',
        border: 'none',
        boxShadow: 'none',
      }}
    >
      <Chip
        label="Travel"
        sx={{
          borderRadius: '3px',
          backgroundColor: '#F2F8F7',
          color: '#666666',
          fontWeight: '400',
          fontFamily: 'Poppins',
        }}
      />
      <Typography
        variant="h1"
        sx={{
          fontFamily: 'Poppins',
          fontWeight: '600',
          fontSize: '27px',
          lineHeight: '140%',
          marginTop: '10px',
          width: '768px',
          height: '38px',
        }}
      >
        {props.object.title}
      </Typography>
      <List style={flexContainer}>
        <ListItem
          className="user"
          disablePadding={true}
          sx={{
            borderColor: 'gray',
            marginRight: '10px',
            paddingRight: '10px',
            width: 'auto',
          }}
        >
          <ListItemIcon sx={{ minWidth: 'auto', marginRight: '12px' }}>
            <Avatar
              src={
                dp
                  ? require(`../images/${dp}`)
                  : props.object.Posted_By.avatar
                  ? require(`../images/${props.object.Posted_By.avatar}`)
                  : ''
              }
              alt="user_dp"
            />
          </ListItemIcon>
          <ListItemText primary={parseName(props.object.Posted_By.email)} />
        </ListItem>
        <ListItem
          className="timeToRead"
          sx={{
            borderLeft: '2px solid',
            borderColor: 'gray',
            marginRight: '10px',
            paddingRight: '10px',
            width: 'auto',
          }}
        >
          <ListItemIcon sx={{ minWidth: 'auto' }}>
            <CalendarTodayIcon sx={{ marginRight: '10px' }} />
          </ListItemIcon>
          <ListItemText primary={`${props.object.timetoRead} Min. To Read`} />
        </ListItem>
      </List>
      <CardMedia
        component="img"
        height="432"
        image={require(`../images/${props.object.image}`)}
        alt="post_detail_image"
        sx={{
          objectFit: 'fill',
          width: '856px',
          borderRadius: '5px',
          marginY: '10px',
        }}
        mr={1}
        my={10}
      />
      <Typography
        variant="h6"
        sx={{ height: 'auto', width: '856px', marginTop: '20px' }}
      >
        {props.object.body}
      </Typography>
    </Card>
  );
};

export default ArticleDetail;
