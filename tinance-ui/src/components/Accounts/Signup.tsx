import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { signupWithJWT } from "../../redux/actions/auth/registerActions";
// import { store } from 'react-notifications-component';

type User = {
  username: string;
  email: string;
  password: string;
  confirmpassword: string;
  telephone: string;
};

type SignupProps = {
  signupWithJWT: (any) => void;
};

class Signup extends Component<SignupProps> {
  state = {
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
    telephone: "",
  };
  handleSubmit = (e) => {
    e.preventDefault();
    let user: User = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      confirmpassword: this.state.confirmpassword,
      telephone: this.state.telephone,
    };
    this.props.signupWithJWT(user);
  };
  render() {
    return (
      <div className="accounts inner-pages">
        <div className="main">
          <section
            id="signIn"
            className="section welcome-area h-100 bg-overlay d-flex align-items-center overflow-auto"
          >
            <div className="container">
              <div className="row align-items-center justify-content-center">
                <div className="col-12 col-md-8 col-lg-5">
                  {/* Contact Box */}
                  <div className="contact-box bg-white text-center rounded p-4 p-sm-5 shadow-lg">
                    {/* Contact Form */}
                    <form
                      id="contact-form"
                      autoComplete="off"
                      onSubmit={(e) => this.handleSubmit(e)}
                    >
                      <div className="contact-top">
                        <img
                          src="/img/logo2.png"
                          style={{ width: "150px", height: "50px" }}
                          alt=""
                        />
                      </div>
                      <div className="row">
                        <div className="col-12">
                          <div className="form-group">
                            <div className="input-group">
                              <div className="input-group-prepend">
                                <span className="input-group-text">
                                  <i className="fas fa-user-circle" />
                                </span>
                              </div>
                              <input
                                type="text"
                                className="form-control"
                                name="username"
                                placeholder="Username"
                                onChange={(e) =>
                                  this.setState({ username: e.target.value })
                                }
                                required={true}
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <div className="input-group">
                              <div className="input-group-prepend">
                                <span className="input-group-text">
                                  <i className="fas fa-envelope-open" />
                                </span>
                              </div>
                              <input
                                type="email"
                                className="form-control"
                                name="email"
                                placeholder="Email"
                                onChange={(e) =>
                                  this.setState({ email: e.target.value })
                                }
                                required={true}
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <div className="input-group">
                              <div className="input-group-prepend">
                                <span className="input-group-text">
                                  <i className="fas fa-unlock-alt" />
                                </span>
                              </div>
                              <input
                                type="password"
                                className="form-control"
                                name="password"
                                placeholder="Password"
                                onChange={(e) =>
                                  this.setState({ password: e.target.value })
                                }
                                required={true}
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <div className="input-group">
                              <div className="input-group-prepend">
                                <span className="input-group-text">
                                  <i className="fas fa-unlock-alt" />
                                </span>
                              </div>
                              <input
                                type="password"
                                className="form-control"
                                name="confirmpassword"
                                placeholder="ConfirmPassword"
                                onChange={(e) =>
                                  this.setState({
                                    confirmpassword: e.target.value,
                                  })
                                }
                                required={true}
                              />
                            </div>
                          </div>

                          <div className="form-group">
                            <div className="input-group">
                              <div className="input-group-prepend">
                                <span className="input-group-text">
                                  <i className="fas fa-tty" />
                                </span>
                              </div>
                              <input
                                type="text"
                                className="form-control"
                                name="telephone"
                                placeholder="Telephone"
                                onChange={(e) =>
                                  this.setState({ telephone: e.target.value })
                                }
                                required={true}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-12">
                          <button
                            className="btn btn-bordered w-100 mt-3 mt-sm-4"
                            type="submit"
                          >
                            Sign Up
                          </button>
                          {/* <Link className="btn btn-bordered w-100 mt-3 mt-sm-4" style={{background: "#007bff", borderRadius: "50px"}} to="/signin">Sign In</Link> */}
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="questionAuth">
          <Link to="/signin">Click here to SignIn</Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    //   values: state.auth.login
  };
};

export default connect(mapStateToProps, { signupWithJWT })(Signup);
