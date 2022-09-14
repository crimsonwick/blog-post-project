import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateArticle from './pages/CreateArticle';
import LandingPage from './pages/LandingPage';
import MyArticles from './pages/MyArticles';
import NoPage from './pages/NoPage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ChangePassword from './pages/ChangePassword';
import { theme } from './themes/theme';
import { ThemeProvider } from '@mui/material/styles';
import { useEffect } from 'react';
import WebFont from 'webfontloader';

function App() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Montserrat'],
      },
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/my-articles" element={<MyArticles />} />
          <Route path="/create-article" element={<CreateArticle />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
