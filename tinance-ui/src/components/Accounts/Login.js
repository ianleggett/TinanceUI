import React, { Component } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import {loginWithJWT} from "../../redux/actions/auth/loginActions";

class Login extends Component {
    state = {
        username : "",
        password : "",
    }
    handleSubmit = e => {
        e.preventDefault();
        let user = {
            username : this.state.username,
            password : this.state.password,
        }
        this.props.loginWithJWT(user);
    }
    render() {
        return (
            <div className="accounts inner-pages">
                <div className="main">
                    <section id="signIn" className="section welcome-area h-100vh bg-overlay d-flex align-items-center">
                        <div className="container">
                            <div className="row align-items-center justify-content-center">
                                <div className="col-12 col-md-8 col-lg-5">
                                    {/* Contact Box */}
                                    <div className="contact-box bg-white text-center rounded p-4 p-sm-5 mt-5 mt-lg-0 shadow-lg">
                                        {/* Contact Form */}
                                        <form id="contact-form" autoComplete="off" onSubmit={(e) => this.handleSubmit(e)}>
                                            <div className="contact-top">
                                            <img src="/img/logo2.png" style={{width: "150px", height: "50px"}} alt="" />
                                            </div>
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="form-group">
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"><i className="fas fa-user-circle" /></span>
                                                            </div>
                                                            <input type="text" className="form-control" name="username" placeholder="Username" onChange={(e) => this.setState({ username : e.target.value})} required="required" />
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"><i className="fas fa-unlock-alt" /></span>
                                                            </div>
                                                            <input type="password" className="form-control" name="password" placeholder="Password" onChange={(e) => this.setState({ password : e.target.value})} required="required" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <button className="btn btn-bordered w-100 mt-3 mt-sm-4" type="submit">Sign In</button>
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
                    <Link to="/signup">Click here to SignUp</Link>
                </div>
                <div className="gotoBack">
                    <Link to="/"><span><i className="fas fa-arrow-left"></i></span></Link>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        authUser : state.auth.login.authData
    }
}

export default connect(mapStateToProps, { loginWithJWT })(Login)