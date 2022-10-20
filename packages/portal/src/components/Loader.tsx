import React from 'react';
import { BallTriangle } from 'react-loader-spinner';
import '../styles/Loader.css';
import { useEffect, useState } from 'react';

export const Loader = () => {
  const [isDisplayed, setIsDisplayed] = useState<boolean>(false);

  useEffect(() => {
    setInterval(() => {
      setIsDisplayed(true);
    }, 1200);
  }, []);
  return isDisplayed ? (
    <div>
      <br />
      <br />
      <BallTriangle
        height='50'
        width='50'
        color='purple'
        ariaLabel='Loading...'
        wrapperClass='loader'
      />
    </div>
  ) : (
    <></>
  );
};
