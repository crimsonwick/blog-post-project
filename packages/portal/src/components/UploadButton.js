import React from 'react';
import { Button } from '@mui/material';

const UploadButton = (props) => {
  const customWidth = props.width;
  return (
    <Button
      type="submit"
      variant="contained"
      component="label"
      sx={{
        borderRadius: '20px',
        width: customWidth || '100%',
        fontFamily: ['Poppins', 'serif'].join(','),
        fontSize: 18,
        marginTop: '25px',
        height: '56px',
        textTransform: 'capitalize',
        fontWeight: 'bold',
      }}
      color="secondary"
    >
      {props.name}
      <input type="file" hidden />
    </Button>
  );
};

export default UploadButton;
