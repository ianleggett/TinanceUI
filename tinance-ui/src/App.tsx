import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { UseRequestProvider } from 'ahooks';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import {
  AccessControlRoute,
  AppConfigProvider,
  HomeRoute,
  UserManagerConsumer,
  UserManagerProvider,
} from './components';
import { theme } from './constants';
import ForbiddenPage from './pages/403';
import NotFoundPage from './pages/404';
import ChangePasswordPage from './pages/ChangePassword';
import FaqPage from './pages/Faq';
import ForgotPasswordPage from './pages/ForgotPassword';
import HomePage from './pages/Home';
import MarketListPage from './pages/MarketList';
import OfferDetailPage from './pages/OfferDetail';
import OfferFormPage from './pages/OfferForm';
import OfferListPage from './pages/OfferList';
import PrivacyPage from './pages/PrivacyPage';
import ResetPasswordPage from './pages/ResetPassword';
import SignInPage from './pages/SignIn';
import SignUpPage from './pages/SignUp';
import TermsPage from './pages/TermsPage';
import TradeDetailPage from './pages/TradeDetail';
import TradeListPage from './pages/TradeList';
import UserProfilePage from './pages/UserProfile';
import { SnackbarUtilsConfigurator } from './utils';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider>
        <SnackbarUtilsConfigurator />
        <UseRequestProvider value={{ manual: true }}>
          <BrowserRouter basename={process.env.PUBLIC_URL}>
            <UserManagerProvider>
              <AppConfigProvider>
                <UserManagerConsumer>
                  <Switch>
                    <HomeRoute
                      path="/"
                      component={HomePage}
                      authedComponent={TradeListPage}
                      exact
                    />
                    <Route path="/signin" component={SignInPage} exact />
                    <Route path="/signup" component={SignUpPage} exact />
                    <Route path="/forgot-password" component={ForgotPasswordPage} exact />
                    <Route path="/reset-password" component={ResetPasswordPage} exact />
                    <Route path="/faq" component={FaqPage} exact />
                    <Route path="/privacy" component={PrivacyPage} exact />
                    <Route path="/terms" component={TermsPage} exact />
                    <Route path="/markets" component={MarketListPage} exact />

                    <AccessControlRoute path="/offers" component={OfferListPage} exact />
                    <AccessControlRoute path="/offers/create" component={OfferFormPage} exact />
                    <AccessControlRoute path="/offers/:id" component={OfferDetailPage} exact />
                    <AccessControlRoute path="/trades" component={TradeListPage} exact />
                    <AccessControlRoute path="/trades/:id" component={TradeDetailPage} exact />
                    <AccessControlRoute path="/account/profile" component={UserProfilePage} exact />
                    <AccessControlRoute
                      path="/account/password"
                      component={ChangePasswordPage}
                      exact
                    />

                    <Route path="/403" component={ForbiddenPage} exact />
                    <Route path="*" component={NotFoundPage} />
                  </Switch>
                </UserManagerConsumer>
              </AppConfigProvider>
            </UserManagerProvider>
          </BrowserRouter>
        </UseRequestProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
