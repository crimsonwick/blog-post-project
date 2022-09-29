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
import { useState,useEffect } from 'react';
import { getReply } from '../services/LoginApi';
import AddComment from './AddComment';

const Comment = (props) => {
  const [replies, setReplies] = useState(false);
  const [reply,setReply] = useState([]);

  useEffect(() => {
    const getReplies = async(commentId) => {
      const response = await getReply(commentId);
      setReply(response.data)
    }
    getReplies(props.object.id)
  },[setReply,props])
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
       {(reply.length > 0) && <Button
        variant="text"
        onClick={() => {
          setReplies(!replies)
        }
        }
        sx={{ color: '#00A1E7', fontFamily: 'Poppins' }}
      >
        Show Replies ({reply.length})
      </Button>}
      {(replies && (reply.length > 0))? (reply.map((o) => {
        return (
          <Comment key={o.id} object={o}/>
        )
      })): null
      }
      <AddComment />
    </Card>
  );
};

export default Comment;