import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ArticleDetail from "./pages/ArticleDetail";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ChangePassword from "./pages/ChangePassword";
import { theme } from './themes/theme';
import { ThemeProvider } from '@mui/material/styles';
import { useEffect, useState, createContext } from "react";
import WebFont from "webfontloader";
import Protected from "./components/Protected";
import CreateArticle from './pages/CreateArticle';
import LandingPage from './pages/LandingPage';
import MyArticles from './pages/MyArticles';
import NoPage from './pages/NoPage';
import ResetPassword from './pages/ResetPassword';

export const AppContext = createContext(null);

function App() {

  const [userData, setUserData] = useState({});
  const [getAccessToken, setAccessToken] = useState(null);
  const [getRefreshToken, setRefreshToken] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Montserrat', 'Poppins'],
      },
    });
  }, []);

  const parentTransfer = (object) => {
    setUserData(object);
  }
  const userToken = (token) => {
    setAccessToken(token);
  }

  return (
    <AppContext.Provider value={{ parentTransfer, userData, userToken, getAccessToken, getRefreshToken, setRefreshToken, loggedIn, setLoggedIn, searchData, setSearchData }}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/article-detail" element={<ArticleDetail />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/login" element={<Login />} />
            <Route path="/change-password" element={<Protected Component={ChangePassword}></Protected>} />
            <Route path="/create-article" element={getAccessToken ? (<Protected Component={CreateArticle}></Protected>) : (<Navigate replace to={"/login"} />)} />
            <Route path="/my-articles" element={getAccessToken ? (<Protected Component={MyArticles}></Protected>) : (<Navigate replace to={"/login"} />)} />
            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;