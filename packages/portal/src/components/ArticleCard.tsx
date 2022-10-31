import { AdvancedImage, responsive } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import QueryBuilderIcon from '@mui/icons-material/QueryBuilder';
import { Avatar, Card, List } from '@mui/material';
import Chip from '@mui/material/Chip';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { Box } from '@mui/system';
import React from 'react';
import { Link } from 'react-router-dom';
import { PropsArticleCard } from '../interface/App';
import { parseDate, parseName } from '../services/LoginApi';
import '../styles/Article/Article.css';
import { flexContainer } from '../styles/Article/List';

const cld = new Cloudinary({
  cloud: {
    cloudName: 'ddutykcuf',
  },
});

export const ArticleCard = React.forwardRef(
  (
    props: PropsArticleCard,
    ref:
      | ((instance: HTMLDivElement | null) => void)
      | React.RefObject<HTMLDivElement>
      | null
      | undefined
  ) => {
    return (
      <Card
        ref={ref}
        elevation={0}
        sx={{
          display: 'flex',
          allignItems: 'centre',
          marginTop: '20px',
          border: 'none',
          width: 'auto',
        }}
      >
        <AdvancedImage
          cldImg={cld.image(`main/${props?.object?.image}`)}
          plugins={[responsive({ steps: 100 })]}
          style={{
            borderRadius: '5px',
            width: '300px',
            height: '250px',
            objectFit: 'contain',
            marginRight: '50px',
          }}
          alt='article_card_img'
        />
        <Box mt={1}>
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

          <Link
            to={`/articles/${props?.object?.id}`}
            state={props}
            style={{ textDecoration: 'none', color: 'rgba(0,0,0,0.87)' }}
          >
            <Typography
              variant='h1'
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
              {props?.object?.title}
            </Typography>
          </Link>
          <List style={flexContainer}>
            <ListItem
              className='user'
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
                  alt='user display picture'
                  src={
                    props?.object?.postedBy.avatar
                      ? require(`../images/${props.object.postedBy.avatar}`)
                      : ''
                  }
                  sx={{ width: 32, height: 32 }}
                />
              </ListItemIcon>
              <ListItemText
                primary={parseName(
                  props?.object?.postedBy.email as unknown as string
                )}
              />
            </ListItem>
            <ListItem
              className='date'
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
              <ListItemText
                primary={parseDate(
                  props?.object?.createdAt as unknown as string
                )}
              />
            </ListItem>
            <ListItem
              className='timeToRead'
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
              <ListItemText
                primary={`${props?.object?.timeToRead} Min. To Read`}
              />
            </ListItem>
          </List>
          <Typography
            variant='h6'
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: '3',
              WebkitBoxOrient: 'vertical',
            }}
          >
            {props?.object?.body}
          </Typography>
        </Box>
      </Card>
    );
  }
);
