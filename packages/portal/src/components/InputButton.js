import React from 'react';
import { Button } from '@mui/material';

const InputButton = (props) => {
  return (
    <Button
      type="submit"
      variant="contained"
      sx={{
        marginTop: '30px',
        fontFamily: 'Montserrat',
        borderRadius: '20px',
        height: '40px',
      }}
      fullWidth
      color="primary"
    >
      {props.name}
    </Button>
  );
};

export default InputButton;
