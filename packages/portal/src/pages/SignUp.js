import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function SignUp() {
  return (
    <div>
      <h1 style={{ color: 'blue', fontFamily: 'Poppins' }}>
        Create An Account
      </h1>

      <h4>Already have an account? Login</h4>
      <label>What's your email?</label>
      <br />

      <TextField id="outlined-basic" />
      <br />

      <label>Create a password</label>
      <br />

      <TextField id="outlined-basic" />
      <br />
      <br />

      <Button
        variant="contained"
        color="primary"
        onClick={() => alert('hello there fella')}
      >
        {' '}
        Create An Account
      </Button>
    </div>
  );
}

export default SignUp;
