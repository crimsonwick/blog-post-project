import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CreateArticle from "./CreateArticle";
import Home from "./Home";
import MyArticles from "./MyArticles";
import NoPage from "./NoPage";
import Login from "./Login";
import SignUp from "./SignUp";
import ChangePassword from "./ChangePassword";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#ffffff",
    },
    secondary: {
      main: "#000000",
    },
  },
  typography: {
    fontFamily: "Poppins",
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/MyArticles" element={<MyArticles />} />
          <Route path="/CreateArticle" element={<CreateArticle />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/ChangePassword" element={<ChangePassword />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
