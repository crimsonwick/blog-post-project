// import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateArticle from './pages/CreateArticle';
import LandingPage from './pages/LandingPage';
import MyArticles from './pages/MyArticles';
import NoPage from './pages/NoPage';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import ChangePassword from './pages/ChangePassword';
import { theme } from './themes/theme';
import { ThemeProvider } from '@mui/private-theming';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/my-articles" element={<MyArticles />} />
          <Route path="/create-article" element={<CreateArticle />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
