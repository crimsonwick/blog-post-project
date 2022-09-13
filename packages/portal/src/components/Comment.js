import {
  Avatar,
  Button,
  Card,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import Article from './Article';
import { useState } from 'react';

const Comment = (props) => {
  const [replies, setReplies] = useState(false);
  return (
    <Card elevation={10}>
      <Box sx={{ display: 'flex', allignItems: 'left' }}>
        <List>
          <ListItem>
            <ListItemIcon>
              <Avatar
                url=" https://cdns-images.dzcdn.net/images/artist/77220ccb5a36d0e5df2c9e47f2c89de4/500x500.jpg"
                alt="user-avatar"
              ></Avatar>
            </ListItemIcon>
            <ListItemText sx={{ marginRight: '10px' }}>spongebob</ListItemText>
            <ListItemText>3 Min Ago</ListItemText>
          </ListItem>
        </List>
      </Box>
      <Box ml={2}>
        <Typography sx={{ fontFamily: 'Poppins' }}>
          Did you come here for something in particular or just general
          Riker-bashing? And blowing into maximum
        </Typography>
        <Button
          variant="text"
          onCLick={() => setReplies(!replies)}
          sx={{ color: '#00A1E7', fontFamily: 'Poppins' }}
        >
          Show Replies ({props.count})
        </Button>
        {replies ? <Reply a={replies} /> : <SecondReply h={replies} />}
      </Box>
    </Card>
  );
};

const Reply = (props) => {
  return <div>Replies {props.a}</div>;
};

const SecondReply = (props) => {
  return <div>Second Reply {props.h}</div>;
};

export default Comment;
