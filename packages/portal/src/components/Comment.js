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
// import { v4 as uuid } from 'uuid';
import { useState } from 'react';
import AddComment from './AddComment';

const Comment = (props) => {
  const [replies, setReplies] = useState(false);
  // const comments = props.count;
  // const commentItems = comments.map((comment) => (
  //   <Comment key={comment.toString()} value={comment} />
  // ));

  // console.log(props.object)

  return (
    <Card elevation={2} sx={{ marginLeft: '20px', marginTop: '20px' }}>
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
          {props.object.body}
        </Typography>
      </Box>
      <Button
        variant="text"
        onClick={() => setReplies(!replies)}
        sx={{ color: '#00A1E7', fontFamily: 'Poppins' }}
      >
        Show Replies ({props.count})
      </Button>
      {replies && <Comment count={69} />}
      {/* <AddComment /> */}
    </Card>
  );
};

export default Comment;
