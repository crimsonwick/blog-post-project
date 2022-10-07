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
import { useState, useEffect } from 'react';
import { getReply, parseTime, parseName } from '../services/LoginApi';
import AddComment from './AddComment';

const Comment = (props) => {
  const [replies, setReplies] = useState(false);
  const [reply, setReply] = useState([]);
  const getReplies = async (commentId) => {
    const response = await getReply(commentId);
    setReply(response.data);
  };
  useEffect(() => {
    getReplies(props.object.id);
  }, [props]);
  return (
    <Card elevation={1} sx={{ marginLeft: '20px', marginTop: '10px' }}>
      <Box sx={{ display: 'flex', allignItems: 'left' }}>
        <List>
          <ListItem>
            <ListItemIcon>
              <Avatar
                src={require(`../images/${props.object.Commented_By.avatar}`)}
                alt="user_dp"
              />
            </ListItemIcon>
            <ListItemText sx={{ marginRight: '10px' }}>
              {parseName(props.object.Commented_By.email)}
            </ListItemText>
            <ListItemText>{parseTime(props.object.createdAt)}</ListItemText>
          </ListItem>
        </List>
      </Box>
      <Box ml={2}>
        <Typography sx={{ fontFamily: 'Poppins' }}>
          {props.object.body}
        </Typography>
      </Box>
      {!replies
        ? reply.length > 0 && (
            <Button
              variant="text"
              onClick={() => {
                setReplies(!replies);
              }}
              sx={{ color: '#00A1E7', fontFamily: 'Poppins' }}
            >
              Show Replies ({reply.length})
            </Button>
          )
        : reply.length > 0 && (
            <Button
              variant="text"
              onClick={() => {
                setReplies(!replies);
              }}
              sx={{ color: '#00A1E7', fontFamily: 'Poppins' }}
            >
              Hide Replies ({reply.length})
            </Button>
          )}
      {replies && reply.length > 0
        ? reply.map((o) => {
            return <Comment key={o.id} object={o} />;
          })
        : null}
      <AddComment
        object={props.object}
        refreshReplies={getReplies}
        Comment={false}
      />
    </Card>
  );
};

export default Comment;
