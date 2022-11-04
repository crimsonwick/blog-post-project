import { Typography } from '@mui/material';
import { BallTriangle } from 'react-loader-spinner';
import '../styles/Loader.css';

export const Loader = () => {
  return (
    <>
      <Typography display='block'> </Typography>
      <Typography display='block'> </Typography>
      <BallTriangle
        height='50'
        width='50'
        color='purple'
        ariaLabel='Loading...'
        wrapperClass='loader'
      />
    </>
  );
};
