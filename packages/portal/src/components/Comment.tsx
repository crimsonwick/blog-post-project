import {
  Button,
  Card,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { CommentInterface } from '../interface/App';
import { getReply, parseName, parseTime } from '../services/LoginApi';
import { AddComment } from './AddComment';
import { AdvancedImage } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import Avatar from '@mui/material/Avatar';

interface CommentComponentInterface<C> {
  object: C;
}

const cld = new Cloudinary({
  cloud: {
    cloudName: 'ddutykcuf',
  },
});

export const Comment = (props: CommentComponentInterface<CommentInterface>) => {
  const [replies, setReplies] = useState<boolean>(false);
  const [reply, setReply] = useState<CommentInterface[]>([]);

  /**
   * Get Replies of a certain comment using it's ID
   * @param commentId
   */
  const getReplies = async (commentId: string) => {
    const response = await getReply(commentId);
    setReply(response.data);
  };
  useEffect(() => {
    getReplies(props.object.id);
  }, [props]);
  if (props.object.commentedBy === undefined) {
    return <h1>Not Working!!!</h1>;
  } else {
    return (
      <Card
        elevation={0}
        sx={{
          borderRadius: '0px',
          marginLeft: '20px',
          marginTop: '10px',
          borderLeft: '1px solid',
          borderColor: 'black',
          paddingLeft: '5px',
        }}
      >
        <Box sx={{ display: 'flex', allignItems: 'left' }}>
          <List>
            <ListItem>
              <ListItemIcon>
                {props?.object?.commentedBy.avatar ? (
                  <AdvancedImage
                    cldImg={cld.image(
                      `main/uploads/${props?.object?.commentedBy.avatar}`
                    )}
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
              </ListItemIcon>
              <ListItemText sx={{ marginRight: '10px' }}>
                {parseName(props.object.commentedBy.email)}
              </ListItemText>
              <ListItemText>{parseTime(props.object.createdAt)}</ListItemText>
            </ListItem>
          </List>
        </Box>
        <Box ml={2}>
          <Typography sx={{ fontFamily: 'Poppins' }}>
            {props.object.body}
          </Typography>
          {!replies
            ? reply.length > 0 && (
                <Button
                  variant='text'
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
                  variant='text'
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
            width='550px'
            commentObject={props.object}
            refreshReplies={getReplies}
            Comment={false}
            labelAbove='Add Reply'
            placeholder={`Reply to ${parseName(
              props.object.commentedBy.email
            )}...`}
          />
        </Box>
      </Card>
    );
  }
};
