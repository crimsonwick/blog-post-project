import { Box } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';


interface HeaderInterface {
  desc?:string;
  link?: string;
  heading?: string;
}
export const Header = (props: HeaderInterface) => {
  if(!props){
    return <h1>Not Working!</h1>
  }
  else{
    return (
      <Box
        sx={{
          width: '100%',
          fontFamily: 'Poppins',
          marginTop: '20px',
          marginBottom: '5px',
        }}
      >
        <h1 style={{ textAlign: 'center', margin: 0 }}>{props.heading}</h1>
        <p style={{ textAlign: 'center', margin: 0, color: 'black' }}>
          {props.desc}
          {props.link && (
            <Link
              to={props.link}
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              Log in
            </Link>
          )}
        </p>
      </Box>
    );
  }
};
