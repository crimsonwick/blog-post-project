import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Avatar, Card, CardMedia, List } from '@mui/material';
import Chip from '@mui/material/Chip';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import {
  AppContextInterface,
  UserInterface,
  ArticleDetailInterface,
} from '../interface/App';
import { parseName } from '../services/LoginApi';
import '../styles/Article/Article.css';
import {
  CardMediaStyle,
  CardStyle,
  flexContainer,
} from '../styles/Article/List';

export const ArticleDetail = (props: ArticleDetailInterface) => {
  const context: AppContextInterface<UserInterface> | null =
    useContext(AppContext);
  return (
    <Card sx={CardStyle}>
      <Chip
        label='Travel'
        sx={{
          borderRadius: '3px',
          backgroundColor: '#F2F8F7',
          color: '#666666',
          fontWeight: '400',
          fontFamily: 'Poppins',
        }}
      />
      <Typography
        variant='h1'
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
        {props?.object?.title}
      </Typography>
      <List style={flexContainer}>
        <ListItem
          className='user'
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
                context?.dp
                  ? require(`../images/${context.dp}`)
                  : props?.object?.Posted_By.avatar
                  ? require(`../images/${props.object.Posted_By.avatar}`)
                  : ''
              }
              alt='user_dp'
            />
          </ListItemIcon>
          <ListItemText
            primary={parseName(
              props?.object?.Posted_By.email as unknown as string
            )}
          />
        </ListItem>
        <ListItem
          className='timeToRead'
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
          <ListItemText primary={`${props?.object?.timeToRead} Min. To Read`} />
        </ListItem>
      </List>
      <CardMedia
        component='img'
        height='432'
        image={require(`../images/${props?.object?.image}`)}
        alt='post_detail_image'
        sx={CardMediaStyle}
      />
      <Typography
        variant='h6'
        sx={{ height: 'auto', width: '856px', marginTop: '20px' }}
      >
        {props?.object?.body}
      </Typography>
    </Card>
  );
};
