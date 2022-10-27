import { Divider, Typography, Box } from '@mui/material';
import { PostHeaderProps } from '../interface/App';
import { Link } from 'react-router-dom';

export const PostsHeader = (props: PostHeaderProps) => {
  const customSize = props.textSize;
  const link = props.link;
  return (
    <Box display='flex' alignItems='center'>
      <Typography
        variant='h1'
        sx={{
          fontFamily: 'Poppins',
          fontWeight: 'bold',
          fontSize: customSize || '2em',
          marginBottom: '24px',
          marginTop: '32px',
          marginRight: '8px',
        }}
      >
        {props.count && props.count} {props.name}
      </Typography>

      {link && (
        <Typography
          component={Link}
          to='/login'
          sx={{
            fontFamily: 'Poppins',
            fontWeight: 'bold',
            fontSize: customSize || '2em',
            marginBottom: '24px',
            marginTop: '32px',
            color: '#00A1E7',
            textDecoration: 'none',
          }}
        >
          Sign in to comment
        </Typography>
      )}
      <Divider />
    </Box>
  );
};
