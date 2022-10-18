import { ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import { createContext, useEffect, useState } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import WebFont from 'webfontloader';
import { CloseButton, SnackbarUtilsConfiguration } from './components/Alerts';
import {Protected} from './components/Protected';
import { AppContextInterface, SearchDataInterface, UserInterface } from './interface/App';
import AccountDetails from './pages/AccountDetails';
import ArticleDetailPage from './pages/ArticleDetailPage';
import ChangePassword from './pages/ChangePassword';
import CreateArticle from './pages/CreateArticle';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import MyArticles from './pages/MyArticles';
import Page404 from './pages/Page404';
import ResetPassword from './pages/ResetPassword';
import Signup from './pages/Signup';
import { theme } from './themes/theme';
export const AppContext = createContext<AppContextInterface | null >(null);

function App() {
  const [dp, setDp] = useState<string>('');
  const [userData, setUserData] =useState<UserInterface>({});
  const [refreshToken, setRefreshToken] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [searchData, setSearchData] = useState<SearchDataInterface[]>([]);
  const [searchMyData, setSearchMyData] = useState<SearchDataInterface[]>([]);
  const [cursorPaginationLink, setCursorPaginationLink] = useState<string>('');

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Montserrat', 'Poppins'],
      },
    });
  }, []);


  return (
    <AppContext.Provider
      value={{
        dp,
        setDp,
        setUserData,
        userData,
        setAccessToken,
        setRefreshToken,
        accessToken,
        refreshToken,
        loggedIn,
        setLoggedIn,
        searchData,
        setSearchData,
        searchMyData,
        setSearchMyData,
        cursorPaginationLink,
        setCursorPaginationLink,
      }}
    >
      <ThemeProvider theme={theme}>
        <SnackbarProvider
          maxSnack={3}
          autoHideDuration={2000}
          action={(key) => <CloseButton id={key} />}
          preventDuplicate={true}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          classes={{ containerRoot: 'snackbarProvider' }}
        >
          <SnackbarUtilsConfiguration />

          <BrowserRouter>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/change-password" element={<ChangePassword />} />
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

              <Route path="*" element={<Page404 />} />
            </Routes>
          </BrowserRouter>
        </SnackbarProvider>
      </ThemeProvider>
    </AppContext.Provider>
  );
}

export default App;
