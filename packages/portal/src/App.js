import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ArticleDetail from "./pages/ArticleDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ChangePassword from "./pages/ChangePassword";
import { theme } from './themes/theme';
import { ThemeProvider } from '@mui/material/styles';
import { useEffect,useState,createContext } from "react";
import WebFont from "webfontloader";
import Protected from "./components/Protected";
import CreateArticle from './pages/CreateArticle';
import LandingPage from './pages/LandingPage';
import MyArticles from './pages/MyArticles';
import Page404 from './pages/Page404';
import ResetPassword from './pages/ResetPassword';

export const AppContext = createContext(null);

function App() {

  const [userData,setUserData] = useState({});
  const [getAccessToken,setAccessToken] = useState(null);
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
    <AppContext.Provider value={{parentTransfer,userData,userToken,getAccessToken}}>
      <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/article-detail" element={<ArticleDetail />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<Page404 />} />
          <Route path="/change-password" element={getAccessToken? (<Protected Component = {ChangePassword}></Protected>): (<Navigate replace to={"/login"}/> )} />
          <Route path="/create-article" element={getAccessToken? (<Protected Component = {CreateArticle}></Protected>): (<Navigate replace to={"/login"}/> )} />
          <Route path="/my-articles" element={getAccessToken? (<Protected Component = {MyArticles}></Protected>): (<Navigate replace to={"/login"}/> )} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
