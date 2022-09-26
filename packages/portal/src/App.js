import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ArticleDetailPage from './pages/ArticleDetailPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ChangePassword from './pages/ChangePassword';
import { theme } from './themes/theme';
import { ThemeProvider } from '@mui/material/styles';
import { useEffect, useState, createContext } from 'react';
import WebFont from 'webfontloader';
import Protected from './components/Protected';
import CreateArticle from './pages/CreateArticle';
import LandingPage from './pages/LandingPage';
import MyArticles from './pages/MyArticles';
import NoPage from './pages/NoPage';
import AccountDetails from './pages/AccountDetails';

export const AppContext = createContext(null);

function App() {
  const [dp, setDp] = useState();
  const [userData, setUserData] = useState({});
  const [refreshToken, setRefreshToken] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Montserrat', 'Poppins'],
      },
    });
  }, []);

  const setUser = (object) => {
    setUserData(object);
  };

  return (
    <AppContext.Provider
      value={{
        dp,
        setDp,
        setUser,
        userData,
        setAccessToken,
        setRefreshToken,
        accessToken,
        refreshToken,
      }}
    >
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/change-password"
              element={
                accessToken ? (
                  <Protected Component={ChangePassword} />
                ) : (
                  <Navigate replace to={'/login'} />
                )
              }
            />
            <Route
              path="/create-article"
              element={
                accessToken ? (
                  <Protected Component={CreateArticle} />
                ) : (
                  <Navigate replace to={'/login'} />
                )
              }
            />
            <Route
              path="/my-articles"
              element={
                accessToken ? (
                  <Protected Component={MyArticles}></Protected>
                ) : (
                  <Navigate replace to={'/login'} />
                )
              }
            />
            <Route
              path="/article-detail"
              element={
                accessToken ? (
                  <Protected Component={ArticleDetailPage}></Protected>
                ) : (
                  <Navigate replace to={'/login'} />
                )
              }
            />
            <Route
              path="/account-details"
              element={
                accessToken ? (
                  <Protected Component={AccountDetails}></Protected>
                ) : (
                  <Navigate replace to={'/login'} />
                )
              }
            />

            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
