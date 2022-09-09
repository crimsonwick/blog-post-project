import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import NavbarLoggedIn from "../components/NavbarLoggedIn";

function CreateArticle() {
  return (
    <div>
      <NavbarLoggedIn />
      <div style={{ paddingLeft: "40px" }}>
        <h1 style={{ fontFamily: "Poppins" , fontSize: "27px", paddingTop: "68px"}}>
          Create New Article
        </h1>
        <Divider light />

        <label>Give it a title</label>
        <br />
        <TextField id="outlined-basic" />
        <br />

        <label>Min. to read it</label>
        <br />

        <TextField id="outlined-basic" />
        <br />
        <br />

        <label>Write something about it</label>
        <br />

        <TextField id="outlined-basic" />
        <br />
        <br />

        <Button variant="contained" component="label">
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
        <Button variant="contained" color="primary">
          Save Changes
        </Button>
      </div>
    </div>
  );
}

export default CreateArticle;
