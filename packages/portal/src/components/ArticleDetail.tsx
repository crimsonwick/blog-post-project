import { AdvancedImage, placeholder, responsive } from '@cloudinary/react';
import { CloudinaryImage } from '@cloudinary/url-gen';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import { Avatar, Card, List } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import {
  AppContextInterface,
  ArticleDetailComponentInterface,
  PostInterface,
} from '../interface/App';
import { parseName, postDetail } from '../services/LoginApi';
import '../styles/Article/Article.css';
import { CardStyle, flexContainer } from '../styles/Article/List';
import { Cloudinary } from '@cloudinary/url-gen';

const cld = new Cloudinary({
  cloud: {
    cloudName: 'ddutykcuf',
  },
});

export const ArticleDetail = (props: ArticleDetailComponentInterface) => {
  const [loading, setLoading] = useState(false);
  const [post, setPost] = useState<PostInterface>();
  const id = props.articleId;
  const context: AppContextInterface | null = useContext(AppContext);

  /**
   * Get Post
   * @param id
   */

  const getPost = async (id: string) => {
    try {
      setLoading(true);
      if (id) {
        const config = {
          headers: {
            Authorization: `Bearer ${context?.accessToken}`,
          },
        };
        const response = await postDetail(id, config);
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
                <Avatar
                  src={
                    context?.dp
                      ? require(`../images/${context.dp}`)
                      : post?.postedBy.avatar
                      ? require(`../images/${post?.postedBy.avatar}`)
                      : ''
                  }
                  alt='user_dp'
                />
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
              height: '432px',
              width: '856px',
              borderRadius: '5px',
              objectFit: 'contain',
              margin: '10px 1px',
            }}
            cldImg={cld.image(`main/uploads/${post?.image}`)}
            plugins={[responsive(), placeholder()]}
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
