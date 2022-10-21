import React from 'react';
import { BallTriangle } from 'react-loader-spinner';
import '../styles/Loader.css';

export const Loader = () => {
  return (
    <>
      <br />
      <br />
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
