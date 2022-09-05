import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import React from "react";
import Divider from "@mui/material/Divider";
import Checkbox from "@mui/material/Checkbox";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div>
      <h1 style={{ color: "blue", fontFamily: "Poppins" }}>Login</h1>

      <label>Email address or username</label>
      <br />

      <TextField id="outlined-basic" />
      <br />

      <label>Password</label>
      <br />

      <TextField id="outlined-basic" />
      <br />
      <br />

      <Checkbox />
      <label>Remember Me</label>
      <br />

      <Link to="/CreateArticle">
        <h5>Forgot your password?</h5>
      </Link>

      <Button
        variant="contained"
        color="primary"
        onClick={() => alert("hello there fella")}
      >
        {" "}
        Login
      </Button>

      <br />
      <br />
      <Divider />
      <br />
      <Divider light />
      <h1 style={{ fontFamily: "Poppins" }}>Don't have an account?</h1>

      <Link to="/SignUp">
        <Button variant="contained" color="secondary">
          {" "}
          Sign up
        </Button>
      </Link>
    </div>
  );
}

export default Login;
