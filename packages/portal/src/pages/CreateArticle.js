import React from 'react';
import styles from '../styles/CreateArticle.module.css';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import NavbarLoggedIn from '../components/NavbarLoggedIn';
import { OutlinedInput } from '@mui/material';

import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function CreateArticle() {
  const [min, setMin] = React.useState('');

  const handleChange = (event) => {
    setMin(event.target.value);
  };

  return (
    <div>
      <NavbarLoggedIn />
      <div className={styles.padding}>
        <h1 className={styles.headingOne}>Create New Article</h1>
        <Divider light />
        <br />
        <br />
        <br />
        <label className={styles.poppins}>Give it a title</label>

        <br />

        <OutlinedInput
          sx={{
            borderRadius: 5,
            marginBottom: 3,
            width: 700,
            marginTop: 1,
          }}
          variant="outlined"
        />

        <br />

        <label className={styles.poppins}>Min. to read it</label>
        <br />

        <FormControl sx={{ minWidth: 120 }}>
          <Select
            value={min}
            onChange={handleChange}
            displayEmpty
            sx={{
              borderRadius: 5,
              marginBottom: 3,
              width: 700,
              marginTop: 1,
            }}
          >
            <MenuItem value="">
              <em>Select</em>
            </MenuItem>
            <MenuItem value={10}>one</MenuItem>
            <MenuItem value={20}>two</MenuItem>
            <MenuItem value={30}>more than 3</MenuItem>
          </Select>
        </FormControl>

        <br />
        <br />

        <label className={styles.poppins}>Write something about it</label>
        <br />

        <OutlinedInput
          multiline
          maxRows={Infinity}
          sx={{
            borderRadius: 5,
            marginBottom: 3,
            width: 700,
            marginTop: 1,
          }}
        />
        <br />
        <br />

        <Button variant="contained" component="label" color="primary">
          Upload
          <input hidden accept="image/*" multiple type="file" />
        </Button>
        <IconButton
          color="primary"
          aria-label="upload picture"
          component="label"
        >
          <input hidden accept="image/*" type="file" />
          <PhotoCamera />
        </IconButton>

        <br />
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          sx={{ borderRadius: '25px', fontSize: '22px', width: '350px' }}
        >
          Publish Article
        </Button>
      </div>
    </div>
  );
}

export default CreateArticle;
