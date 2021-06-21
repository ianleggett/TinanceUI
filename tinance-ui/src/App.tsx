import { ThemeProvider } from '@material-ui/core/styles';
import { UseRequestProvider } from 'ahooks';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { AppContextProvider, HomeRoute, PrivateRoute } from './components';
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
import SignInPage from './pages/SignIn';
import SignUpPage from './pages/SignUp';
import TradeDetailPage from './pages/TradeDetail';
import TradeListPage from './pages/TradeList';
import UserProfilePage from './pages/UserProfile';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <UseRequestProvider value={{ manual: true }}>
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <AppContextProvider>
            <Switch>
              <HomeRoute path="/" component={HomePage} authedComponent={TradeListPage} exact />
              <Route path="/signin" component={SignInPage} exact />
              <Route path="/signup" component={SignUpPage} exact />
              <Route path="/forgot-password" component={ForgotPasswordPage} exact />
              <Route path="/faq" component={FaqPage} exact />
              <PrivateRoute path="/markets" component={MarketListPage} exact />
              <PrivateRoute path="/offers" component={OfferListPage} exact />
              <PrivateRoute path="/offers/create" component={OfferFormPage} exact />
              <PrivateRoute path="/offers/:id" component={OfferDetailPage} exact />
              <PrivateRoute path="/trades" component={TradeListPage} exact />
              <PrivateRoute path="/trades/:id" component={TradeDetailPage} exact />
              <PrivateRoute path="/account/profile" component={UserProfilePage} exact />
              <PrivateRoute path="/account/password" component={ChangePasswordPage} exact />
              <Route path="/403" component={ForbiddenPage} exact />
              <Route path="*" component={NotFoundPage} />
            </Switch>
          </AppContextProvider>
        </BrowserRouter>
      </UseRequestProvider>
    </ThemeProvider>
  );
};

export default App;
