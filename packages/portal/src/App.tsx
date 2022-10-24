import { ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import { useContext, useEffect } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import WebFont from 'webfontloader';
import { CloseButton, SnackbarUtilsConfiguration } from './components/Alerts';
import { Protected } from './components/Protected';
import { AppContext } from './context/AppContext';
import { AppContextInterface, UserInterface } from './interface/App';
import { AccountDetails } from './pages/AccountDetails';
import { ArticleDetailPage } from './pages/ArticleDetailPage';
import ChangePassword from './pages/ChangePassword';
import CreateArticle from './pages/CreateArticle';
import { Home } from './pages/LandingPage';
import { Login } from './pages/Login';
import { MyArticles } from './pages/MyArticles';
import { Page404 } from './pages/Page404';
import { ResetPassword } from './pages/ResetPassword';
import { Signup } from './pages/Signup';
import { theme } from './themes/theme';

function App() {
  const context: AppContextInterface<UserInterface> | null =
    useContext(AppContext);

  const gets = async () => {
    context?.setLoggedIn(true);
    const body = {
      token: localStorage.getItem('refreshToken') as unknown as string,
    };
    const response = await context?.getLoginToken(body);
    context?.setLoginToken(
      response?.data.accessToken,
      localStorage.getItem('refreshToken') as unknown as string
    );
    context?.setAccessToken(localStorage.getItem('accessToken'));
    context?.setRefreshToken(localStorage.getItem('refreshToken'));
    context?.setLoggedIn(true);
    context?.setUserData(
      JSON.parse(localStorage.getItem('userDetails') || '{}')
    );
    localStorage.setItem('login', response?.data.accessToken);
  };

  useEffect(() => {
    if (!context?.loggedIn) {
      if (
        localStorage.getItem('accessToken') &&
        localStorage.getItem('refreshToken')
      ) {
        gets();
      }
    }
    WebFont.load({
      google: {
        families: ['Montserrat', 'Poppins'],
      },
    });
  }, []);

  return (
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
            <Route path='/' element={<Home />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/login' element={<Login />} />
            <Route path='/reset-password' element={<ResetPassword />} />
            <Route path='/change-password' element={<ChangePassword />} />
            <Route
              path='/create-article'
              element={
                context?.accessToken ? (
                  <Protected Component={<CreateArticle />} />
                ) : (
                  <Navigate replace to={'/login'} />
                )
              }
            />
            <Route
              path='/my-articles'
              element={
                context?.accessToken ? (
                  <Protected Component={<MyArticles />}></Protected>
                ) : (
                  <Navigate replace to={'/login'} />
                )
              }
            />
            <Route
              path='/article-detail'
              element={
                context?.accessToken ? (
                  <Protected Component={<ArticleDetailPage />}></Protected>
                ) : (
                  <Navigate replace to={'/login'} />
                )
              }
            />
            <Route
              path='/account-details'
              element={
                context?.accessToken ? (
                  <Protected Component={<AccountDetails />}></Protected>
                ) : (
                  <Navigate replace to={'/login'} />
                )
              }
            />

            <Route path='*' element={<Page404 />} />
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
