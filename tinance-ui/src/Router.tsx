/* Import Headers */
import React, { lazy } from "react";
// import { Router, Switch, Route, Redirect, RouteComponentProps } from "react-router-dom";
import { BrowserRouter as Router, Switch, Route, Redirect, RouteComponentProps } from "react-router-dom";
// import { history } from "./history";

import $ from "jquery";
import { isSession, sessionCheck } from "./redux/actions/auth/loginActions";

import Header from "./components/HeaderSection/Header";
import DashboardHeader from "./components/HeaderSection/DashboardHeader";
// import Branding from "./components/BrandingSection/Branding"
import Footer from "./components/FooterSection/Footer";
// import Spinner from "./components/Plugins/Spinner"

/* Import Components */
const Welcome = lazy(() => import("./pages/Index"));
const SubscribePage = lazy(
  () => import("./components/SubscribeSection/Subscribe")
);
const Login = lazy(() => import("./components/Accounts/Login"));
const Signup = lazy(() => import("./components/Accounts/Signup"));
const SetPassword = lazy(() => import("./components/Accounts/SetPassword"));
const Faq = lazy(() => import("./components/FaqSection/Faq"));
const ContactPage = lazy(() => import("./components/ContactSection/Contact"));
const ReactNotification = lazy(() => import("react-notifications-component"));

const Browse = lazy(() => import("./components/BrowseSection/Browse"));

const Dashboard = lazy(
  () => import("./components/Dashboard/Dashboard/Dashboard")
);
const Calendar = lazy(() => import("./components/Dashboard/Calendar/Calendar"));
const Requests = lazy(() => import("./components/Dashboard/Requests"));
const Presence = lazy(() => import("./components/Dashboard/Presence"));
const Documents = lazy(() => import("./components/Dashboard/Documents"));
const Team = lazy(() => import("./components/Dashboard/Team/Team"));
const Reports = lazy(() => import("./components/Dashboard/Reports"));
const Setting = lazy(() => import("./components/Dashboard/Setting/Setting"));
// const ErrorPage = lazy(() => import("./components/ErrorPage/404"))

declare global { interface Window { hostURL: string; } }

window.hostURL = "https://diyservicesgroup.com/diyservicesgroup";

const AppRoute = ({
  component: Component,
  fullpage,
  dashboard,
  path,
  ...rest
}: {
  [x: string]: any;
  component: any;
  fullpage?: any;
  dashboard?: any;
  path: any;
}) => (
  <Route
    {...rest}
    render={(props) => {
      if (fullpage) {
        return (
          <>
            <Component {...props} />
          </>
        );
      } else if (dashboard) {
        return (
          <>
            <DashboardHeader />
            <Component {...props} />
          </>
        );
      } else {
        return (
          <>
            <Header imageData={"/img/Logo/logo-white.png"} />
            <Component {...props} />
            {/* <Branding /> */}
            <Footer />
          </>
        );
      }
    }}
  />
);

const RequireAuth = (data) => {
  if (!isSession()) {
    return <Redirect to={"/signin"} />;
  }
  sessionCheck();
  for (var i in data.children) {
    if (data.children[i].props.path === window.location.pathname) {
      return data.children.slice(0, data.children.length - 1);
    }
  }
  return data.children.slice(data.children.length - 1, data.children.length);
};

/* Define Router Module */
class AppRouter extends React.Component {
  componentDidMount() {
    let url = window.location.origin + "/assets/js/scripts.js";
    $.getScript(url);
  }
  
  render() {
    return (
      // <Router history={history}>
      <Router>
        <ReactNotification />
        <Switch>
          <AppRoute exact path="/" component={Welcome} />
          <AppRoute path="/signin" component={Login} fullpage />
          <AppRoute path="/signup" component={Signup} fullpage />
          <AppRoute
            path="/set-password:param"
            component={SetPassword}
            fullpage
          />
          <AppRoute path="/subscribe" component={SubscribePage} />
          <AppRoute path="/faq" component={Faq} />
          <AppRoute path="/contact" component={ContactPage} />
          <AppRoute path="/browse" component={Browse} />
          <RequireAuth>
            <AppRoute path="/dashboard" component={Dashboard} dashboard />
            <AppRoute
              path="/dashboard-calendar"
              component={Calendar}
              dashboard
            />
            <AppRoute
              path="/dashboard-requests"
              component={Requests}
              dashboard
            />
            <AppRoute
              path="/dashboard-presence"
              component={Presence}
              dashboard
            />
            <AppRoute
              path="/dashboard-documents"
              component={Documents}
              dashboard
            />
            <AppRoute path="/dashboard-team" component={Team} dashboard />
            <AppRoute path="/dashboard-reports" component={Reports} dashboard />
            <AppRoute path="/dashboard-setting" component={Setting} dashboard />
          </RequireAuth>
        </Switch>
      </Router>
    );
  }
}
export default AppRouter;
