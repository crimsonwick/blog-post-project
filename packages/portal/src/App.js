import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ArticleDetail from './pages/ArticleDetail';
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

export const AppContext = createContext(null);

function App() {
  const [userData, setUserData] = useState({});
  const [getRefreshToken, setRefreshToken] = useState(null);
  const [getAccessToken, setAccessToken] = useState(null);
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Montserrat', 'Poppins'],
      },
    });
  }, []);

  const parentTransfer = (object) => {
    setUserData(object);
  };
  const userAccessToken = (token) => {
    setAccessToken(token);
  };
  const userRefreshToken = (token) => {
    setRefreshToken(token);
  };

  return (
    <AppContext.Provider
      value={{
        parentTransfer,
        userData,
        userAccessToken,
        userRefreshToken,
        getAccessToken,
        getRefreshToken,
      }}
    >
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/article-detail" element={<ArticleDetail />} />
            <Route path="/my-articles" element={<MyArticles />} />
            <Route path="/create-article" element={<CreateArticle />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route
              path="/change-password"
              element={<Protected Component={ChangePassword}></Protected>}
            />
            <Route
              path="/create-article"
              element={<Protected Component={CreateArticle}></Protected>}
            />
            <Route
              path="/my-articles"
              element={<Protected Component={MyArticles}></Protected>}
            />

            <Route path="*" element={<NoPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
