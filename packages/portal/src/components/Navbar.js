import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import Button from "@mui/material/Button";

export default function MenuAppBar() {
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(1),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: "12ch",
        "&:focus": {
          width: "20ch",
        },
      },
    },
  }));

  return (
    <AppBar position="static" style={{ background: "#FFFFFF" }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1 }}
          //sx={{ display: 'flex' }}
          style={{ color: "#111111" }}
        >
          Home
        </Typography>

        <Search style={{ color: "#111111" }}>
          <SearchIconWrapper>
            <SearchIcon style={{ color: "#111111" }} />
          </SearchIconWrapper>
          <StyledInputBase
            style={{ color: "#111111" }}
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>

        {/* <Button
          color="default"
          onClick={() => alert("hello there fella")}
          // style ={{marginRight= "100px"}}
          variant="outlined"
          style={{
            color: "#111111",
            backgroundColor: "#111111",
            // padding: "18px 36px",
            //fontSize: "18px",
          }}
        >
          Login
        </Button> */}


        <Button variant="outlined"> Login </Button>

        <Button variant="contained">Sign Up</Button>
      </Toolbar>
    </AppBar>
  );
}
