import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { Modal } from "antd";
import ConnectorsUIScreen from "../../libs/connectors-ui";
import { sessionCheck, logOut } from "../../redux/actions/auth/loginActions";

type HeaderProps = {
  authUser: {
    authData: {
      username: string;
    };
  };
  imageData: string;
  sessionCheck: () => void;
  logOut: () => void;
};
type HeaderState = {
  isConnectorsUI: boolean;
};

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: any;
  }
}

class Header extends Component<HeaderProps, HeaderState> {
  state: HeaderState = {
    isConnectorsUI: false,
  };

  googleTranslateElementInit() {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "auto",
        layout: window.google.translate.TranslateElement.FloatPosition.TOP_LEFT,
      },
      "google_translate_element"
    );
  }

  componentDidMount() {
    this.props.sessionCheck();
    var addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = this.googleTranslateElementInit;
  }
  logOut() {
    this.props.logOut();
  }

  modalToggle = (event) => {
    event.stopPropagation();
    this.setState({
      isConnectorsUI: !this.state.isConnectorsUI,
    });
  };

  render() {
    return (
      <div>
        <header className="navbar navbar-sticky navbar-expand-lg navbar-dark">
          <div className="container position-relative">
            <a className="navbar-brand" href="/">
              <img
                className="navbar-brand-regular"
                src="/img/Logo/favicon.png"
                style={{ height: "40px", verticalAlign: "top" }}
                alt="brand-logo"
              />
              <span style={{ fontSize: "30px", marginLeft: "10px" }}>
                Trade Finance
              </span>
            </a>
            <button
              className="navbar-toggler d-lg-none"
              type="button"
              data-toggle="navbarToggler"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="navbar-inner">
              {/*  Mobile Menu Toggler */}
              <button
                className="navbar-toggler d-lg-none"
                type="button"
                data-toggle="navbarToggler"
                aria-label="Toggle navigation"
              >
                <span className="navbar-toggler-icon" />
              </button>
              <nav>
                <ul className="navbar-nav" id="navbar-nav">
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      id="navbarDropdownMenuLink"
                      href="/#"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      EN
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdownMenuLink"
                    >
                      <li>
                        <Link className="dropdown-item" to="/vn">
                          VN-Tiếng Việt
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/cn">
                          CN-中文
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/browse">
                      Browse
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/faqs">
                      FAQ
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/explore">
                      Explore
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="#"
                      onClick={(event) => this.modalToggle(event)}
                    >
                      Connect
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/offers">
                      Offers
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/trades">
                      Trades
                    </Link>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      id="navbarDropdownMenuLink"
                      href="/#"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      More
                    </a>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="navbarDropdownMenuLink"
                    >
                      <li>
                        <Link className="dropdown-item" to="/support">
                          Support
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/request_feature">
                          Request a feature
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/term">
                          Terms & Conditions
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/privacy">
                          Privacy Policy
                        </Link>
                      </li>
                    </ul>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/resources">
                      Kovan
                    </Link>
                  </li>

                  {this.props.authUser.authData ? (
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        href="/#"
                        id="navbarDropdownMenuLink"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        {this.props.authUser.authData.username}
                      </a>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="navbarDropdownMenuLink"
                      >
                        <li>
                          <Link to="dashboard" className="dropdown-item">
                            <i className="fas fa-gift mr-2"></i>Go to dashboard
                          </Link>
                        </li>
                        <li>
                          <Link to="/profile" className="dropdown-item">
                            <i className="fas fa-user mr-2"></i>My Profile
                          </Link>
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={() => this.logOut()}
                          >
                            <i className="fas fa-power-off mr-2"></i>Logout
                          </button>
                        </li>
                      </ul>
                    </li>
                  ) : (
                    <li className="nav-item">
                      <Link className="nav-link" to="/signin" title="Signin">
                        Signin
                      </Link>
                    </li>
                  )}
                  <li className="nav-item" style={{ alignSelf: "center" }}>
                    <span className="translate">
                      <div id="google_translate_element"></div>
                    </span>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        <Modal
          title="Please choose the kind of wallet"
          visible={this.state.isConnectorsUI}
          width={800}
          footer={""}
          onCancel={this.modalToggle}
        >
          <ConnectorsUIScreen />
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authUser: state.auth.login,
  };
};

export default connect(mapStateToProps, { sessionCheck, logOut })(Header);
