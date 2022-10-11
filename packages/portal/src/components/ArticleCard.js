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
import { parseDate, parseName } from '../services/LoginApi';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AppContext } from '../App';

const ArticleCard = (props) => {
  const { dp, userData } = useContext(AppContext);

  return (
    <Card
      elevation={0}
      sx={{
        display: 'flex',
        allignItems: 'centre',
        marginTop: '20px',
        border: 'none',
        width: 'auto',
      }}
    >
      <img
        src={require(`../images/${props.object.image}`)}
        alt="user_image"
        className="articleImg"
        style={{
          borderRadius: '5px',
          width: '300px',
          height: '250px',
          objectFit: 'fill',
          marginRight: '50px',
        }}
      />
      <Box mt={1}>
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
        <Link
          to="/article-detail"
          state={props}
          style={{ textDecoration: 'none', color: 'rgba(0,0,0,0.87)' }}
        >
          <Typography
            variant="h1"
            sx={{
              fontFamily: 'Poppins',
              fontWeight: '600',
              fontSize: '26px',
              lineHeight: '140%',
              marginTop: '10px',
              width: '768px',
              height: '38px',
            }}
          >
            {props.object.title}
          </Typography>
        </Link>
        <List style={flexContainer}>
          <ListItem
            className="user"
            disablePadding={true}
            sx={{
              borderRight: '2px solid',
              borderColor: 'gray',
              marginRight: '10px',
              paddingRight: '10px',
              width: 'auto',
            }}
          >
            <ListItemIcon sx={{ minWidth: 'auto', marginRight: '12px' }}>
              <Avatar
                alt="user display picture"
                src={
                  props.object.Posted_By.avatar
                    ? require(`../images/${props.object.Posted_By.avatar}`)
                    : ''
                }
                sx={{ width: 32, height: 32 }}
              />
            </ListItemIcon>
            <ListItemText primary={parseName(props.object.Posted_By.email)} />
          </ListItem>
          <ListItem
            className="date"
            disablePadding={true}
            sx={{
              borderRight: '2px solid',
              borderColor: 'gray',
              marginRight: '10px',
              paddingRight: '10px',
              width: 'auto',
            }}
          >
            <ListItemIcon sx={{ minWidth: 'auto', marginRight: '12px' }}>
              <CalendarTodayIcon />
            </ListItemIcon>
            <ListItemText primary={parseDate(props.object.createdAt)} />
          </ListItem>
          <ListItem
            className="timeToRead"
            disablePadding={true}
            sx={{
              marginRight: '10px',
              paddingRight: '10px',
              width: 'auto',
            }}
          >
            <ListItemIcon sx={{ minWidth: 'auto', marginRight: '12px' }}>
              <QueryBuilderIcon />
            </ListItemIcon>
            <ListItemText primary={`${props.object.timetoRead} Min. To Read`} />
          </ListItem>
        </List>
        <Typography
          variant="h6"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: '3',
            WebkitBoxOrient: 'vertical',
          }}
        >
          {props.object.body}
        </Typography>
      </Box>
    </Card>
  );
};

export default ArticleCard;
