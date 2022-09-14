import React from 'react';
import { Button } from '@mui/material';

const InputButton = (props) => {
  const customWidth = props.width;
  return (
    <Button
      type="submit"
      variant="contained"
      sx={{
        fontFamily: 'Poppins',
        borderRadius: '20px',
        height: '40px',
        width: customWidth || '100%',
      }}
<<<<<<< HEAD
      fullWidth
=======
>>>>>>> nauman-3
      color="secondary"
    >
      {props.name}
    </Button>
  );
};

export default InputButton;
