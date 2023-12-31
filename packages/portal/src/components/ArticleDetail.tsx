import { AdvancedImage, responsive } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Avatar, Card, List } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import {
  ArticleDetailComponentInterface,
  PostInterface,
} from '../interface/App';
import { parseName, postDetail } from '../services/LoginApi';
import '../styles/Article/Article.css';
import { CardStyle, flexContainer } from '../styles/Article/List';

const cld = new Cloudinary({
  cloud: {
    cloudName: 'ddutykcuf',
  },
});

export const ArticleDetail = (props: ArticleDetailComponentInterface) => {
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState<PostInterface>();
  const id = props.articleId;

  /**
   * Get Post
   * @param id
   */

  const getPost = async (id: string) => {
    try {
      setLoading(true);
      if (id) {
        const response = await postDetail(id);
        setPost(response.data);
      }
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPost(id);
  }, [id]);

  return (
    <>
      {post && (
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
            {post?.title}
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
                {post?.postedBy.avatar ? (
                  <AdvancedImage
                    cldImg={cld.image(`main/uploads/${post?.postedBy.avatar}`)}
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
              <ListItemText
                primary={parseName(post?.postedBy.email as unknown as string)}
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
              <ListItemText primary={`${post?.timeToRead} Min. To Read`} />
            </ListItem>
          </List>
          <AdvancedImage
            style={{
              borderRadius: '5px',
              objectFit: 'contain',
              margin: '10px 1px',
            }}
            cldImg={cld.image(`main/${post?.image}`)}
            plugins={[responsive({ steps: 100 })]}
          />
          <Typography
            variant='h6'
            sx={{ height: 'auto', width: '856px', marginTop: '20px' }}
          >
            {post?.body}
          </Typography>
        </Card>
      )}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={loading}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </>
  );
};
