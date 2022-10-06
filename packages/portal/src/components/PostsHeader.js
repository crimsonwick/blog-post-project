import { Divider, Typography } from '@mui/material';

export const PostsHeader = (props) => {
  const customSize = props.textSize;
  return (
    <>
      <Typography
        variant="h1"
        sx={{
          fontFamily: 'Poppins',
          fontWeight: 'bold',
          fontSize: customSize || '2em',
          marginBottom: '24px',
        }}
      >
        {props.count && props.count} {props.name}
      </Typography>
      <Divider />
    </>
  );
};
