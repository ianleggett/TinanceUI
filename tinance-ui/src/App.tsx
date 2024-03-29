import DayjsUtils from '@date-io/dayjs';
import { ExternalProvider, JsonRpcFetchFunc, Web3Provider } from '@ethersproject/providers';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
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
import BankDetailsPage from './pages/BankDetails';
import ChangePasswordPage from './pages/ChangePassword';
import ContactUs from './pages/ContactUs';
import FaqPage from './pages/Faq';
import ForgotPasswordPage from './pages/ForgotPassword';
import ForgotPasswordSuccessPage from './pages/ForgotPasswordSuccess';
import HomePage from './pages/Home';
import MarketListPage from './pages/MarketList';
import OfferFormPage from './pages/OfferForm';
import OfferListPage from './pages/OfferList';
import PrivacyPage from './pages/PrivacyPage';
import ResetPasswordPage from './pages/ResetPassword';
import SignInPage from './pages/SignIn';
import SignUpPage from './pages/SignUp';
import SignUpSuccessPage from './pages/SignUpSuccess';
import TermsPage from './pages/TermsPage';
import TradeListPage from './pages/TradeList';
import UserProfilePage from './pages/UserProfile';
import UserWalletPage from './pages/UserWallet';
import { SnackbarUtilsConfigurator } from './utils';

function getLibrary(provider: ExternalProvider | JsonRpcFetchFunc): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12_000;
  return library;
}

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider
        maxSnack={1}
        autoHideDuration={3000}
        style={{ pointerEvents: 'all' }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <SnackbarUtilsConfigurator />
        <UseRequestProvider value={{ manual: true }}>
          <MuiPickersUtilsProvider utils={DayjsUtils} locale="en">
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
                      <Route path="/signup/success" component={SignUpSuccessPage} exact />
                      <Route path="/forgot-password" component={ForgotPasswordPage} exact />
                      <Route
                        path="/forgot-password/success"
                        component={ForgotPasswordSuccessPage}
                        exact
                      />
                      <Route path="/reset-password" component={ResetPasswordPage} exact />
                      <Route path="/faq" component={FaqPage} exact />
                      <Route path="/contact" component={ContactUs} exact />
                      <Route path="/privacy" component={PrivacyPage} exact />
                      <Route path="/terms" component={TermsPage} exact />
                      <Route path="/markets" component={MarketListPage} exact />
                      <Route path="/markets/:wildcardId" component={MarketListPage} exact />

                      <AccessControlRoute path="/offers" component={OfferListPage} exact />
                      <AccessControlRoute path="/offers/create" component={OfferFormPage} exact />
                      <AccessControlRoute
                        path="/offers/update/:oid"
                        component={OfferFormPage}
                        exact
                      />
                      <AccessControlRoute path="/trades" component={TradeListPage} exact />
                      <AccessControlRoute path="/connect" component={UserWalletPage} exact />
                      <AccessControlRoute
                        path="/account/profile"
                        component={UserProfilePage}
                        exact
                      />
                      <AccessControlRoute path="/account/wallet" component={UserWalletPage} exact />
                      <AccessControlRoute
                        path="/account/bank-details"
                        component={BankDetailsPage}
                        exact
                      />
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
          </MuiPickersUtilsProvider>
        </UseRequestProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
