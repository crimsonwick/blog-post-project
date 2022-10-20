import { Divider, Typography } from '@mui/material';

interface PostHeaderProps {
  textSize?: string;
  count?: number;
  name?: string;
}
export const PostsHeader = (props: PostHeaderProps) => {
  const customSize = props.textSize;
  return (
    <>
      <Typography
        variant='h1'
        sx={{
          fontFamily: 'Poppins',
          fontWeight: 'bold',
          fontSize: customSize || '2em',
          marginBottom: '24px',
          marginTop: '32px',
        }}
      >
        {props.count && props.count} {props.name}
      </Typography>
      <Divider />
    </>
  );
};
