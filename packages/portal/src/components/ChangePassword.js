import React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Divider from '@mui/material/Divider';
import NavbarLoggedIn from './NavbarLoggedIn';

function ChangePassword() {
  return (
    <div>
      <NavbarLoggedIn></NavbarLoggedIn>
      <h1 style={{ color: 'blue', fontFamily: 'Poppins' }}>Account Settings</h1>
      <Divider />

      <h1>Change Password</h1>

      <label>Type new password</label>
      <br />
      <TextField id="outlined-basic" />
      <br />

      <label>Type new password again</label>
      <br />

      <TextField id="outlined-basic" />
      <br />
      <br />

      <Button variant="contained" color="primary">
        Save Changes
      </Button>
    </div>
  );
}

export default ChangePassword;
