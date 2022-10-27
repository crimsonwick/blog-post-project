import { ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider } from 'notistack';
import { useContext, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import WebFont from 'webfontloader';
import { CloseButton, SnackbarUtilsConfiguration } from './components/Alerts';
import { Protected, Public } from './components/Protected';
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
  const context: AppContextInterface | null = useContext(AppContext);

  const gets = async () => {
    context?.setAccessToken(localStorage.getItem('accessToken'));
    context?.setRefreshToken(localStorage.getItem('refreshToken'));
    context?.setLoggedIn(true);
    const body = {
      token: localStorage.getItem('refreshToken') as unknown as string,
    };
    const response = await context?.getLoginToken(body);
    context?.setLoginToken(
      response?.data.accessToken,
      localStorage.getItem('refreshToken') as unknown as string
    );
    context?.setUserData(
      JSON.parse(localStorage.getItem('userDetails') || '{}')
    );
    localStorage.setItem('login', response?.data.accessToken);
  };

  useEffect(() => {
    if (
      !context?.loggedIn &&
      localStorage.getItem('accessToken') &&
      localStorage.getItem('refreshToken')
    ) {
      gets();
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
            <Route path="/" element={<Home />} />
            <Route element={<Public />}>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/change-password" element={<ChangePassword />} />
            </Route>
            <Route element={<Protected />}>
              <Route path="/create-article" element={<CreateArticle />} />
              <Route path="/articles" element={<MyArticles />} />
              <Route path="/account-details" element={<AccountDetails />} />
            </Route>
            <Route
              path="/articles/:articleId"
              element={<ArticleDetailPage />}
            />
            <Route path="/*" element={<Page404 />} />
          </Routes>
        </BrowserRouter>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
