import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import NavbarLoggedIn from "../components/NavbarLoggedIn";
import { OutlinedInput } from "@mui/material";

import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function CreateArticle() {
  const [min, setMin] = React.useState("");

  const handleChange = (event) => {
    setMin(event.target.value);
  };

  return (
    <div>
      <NavbarLoggedIn />
      <div style={{ paddingLeft: "40px" }}>
        <h1
          style={{
            fontFamily: "Poppins",
            fontSize: "27px",
            paddingTop: "68px",
          }}
        >
          Create New Article
        </h1>
        <Divider light />
        <br />
        <br />
        <br />
        <label style={{ fontFamily: "Poppins" }}>Give it a title</label>
        <br />

        {/* <TextField id="outlined-basic" sx = {{width: 700, borderRadius: 98,}}/> */}

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

        <label style={{ fontFamily: "Poppins" }}>Min. to read it</label>
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

        {/* <TextField id="outlined-basic" /> */}
        <br />
        <br />

        <label style={{ fontFamily: "Poppins" }}>
          Write something about it
        </label>
        <br />

        <TextField
          multiline
          // rows={10}
          maxRows={Infinity}
          sx={{
            borderRadius: 500,
            marginBottom: 3,
            width: 700,
            marginTop: 1,
          }}
          style={{borderRadius: 18}}
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
          sx={{ borderRadius: "25px", fontSize: "22px", width: "350px" }}
        >
          Publish Article
        </Button>
      </div>
    </div>
  );
}

export default CreateArticle;
