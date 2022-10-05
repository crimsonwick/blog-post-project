import { Divider, Typography } from '@mui/material';

export const PostsHeader = (props) => {
  return (
    <>
      <Typography
        variant="h1"
        sx={{
          fontFamily: 'Poppins',
          fontWeight: 'bold',
          fontSize: '2em',
          marginBottom: '24px',
        }}
      >
        {props.name}
      </Typography>
      <Divider />
    </>
  );
};
