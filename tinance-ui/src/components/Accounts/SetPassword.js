import React, { Component } from 'react';
import { store } from 'react-notifications-component';
import { setPassword } from '../../redux/actions/auth/loginActions';
import { connect } from 'react-redux';

class SetPassword extends Component {
    constructor() {
        super();
        this.state = {
            user_id: '',
            password: '',
            confirmPassword: '',
        }
    }

    componentDidMount = () => {
        this.setState({
            user_id: this.props.location.pathname.split(":")[1]
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        if (this.state.password.length < 6) {
            store.addNotification({
                title: "Oops!",
                message: "La validación de la contraseña tiene al menos 6 caracteres!",
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__lightSpeedInRight"],
                animationOut: ["animate__animated", "animate__lightSpeedOutRight"],
                dismiss: {
                    duration: 5000,
                    onScreen: true,
                    pauseOnHover: true,
                    showIcon : true
                }
            });

            return;
        }
        if (this.state.password !== this.state.confirmPassword) {
            store.addNotification({
                title: "Oops!",
                message: "Contraseña incorrecta!",
                type: "danger",
                insert: "top",
                container: "top-right",
                animationIn: ["animate__animated", "animate__lightSpeedInRight"],
                animationOut: ["animate__animated", "animate__lightSpeedOutRight"],
                dismiss: {
                    duration: 5000,
                    onScreen: true,
                    pauseOnHover: true,
                    showIcon : true
                }
            });

            return;
        }

        this.props.setPassword({user_id: this.state.user_id, password: this.state.password});
    }

    render() {
        return (
            <div className="accounts inner-pages h-100">
                <div className="main h-100">
                    <section id="signIn" className="section welcome-area h-100 bg-overlay d-flex align-items-center overflow-auto">
                        <div className="container">
                            <div className="row align-items-center justify-content-center">
                                <div className="col-12 col-md-8 col-lg-5">
                                    {/* Contact Box */}
                                    <div className="contact-box bg-white text-center rounded p-4 p-sm-5 shadow-lg">
                                        <form id="contact-form" autoComplete="off" onSubmit={(e) => this.handleSubmit(e)}>
                                            <div className="contact-top">
                                                <img src="/img/logo.png" alt="TimeClick360" />
                                            </div>
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className="form-group">
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"><i className="fas fa-unlock-alt" /></span>
                                                            </div>
                                                            <input type="password" className="form-control" name="password" placeholder="Contraseña" onChange={(e) => this.setState({ password : e.target.value})} required />
                                                        </div>
                                                    </div>
                                                    <div className="form-group">
                                                        <div className="input-group">
                                                            <div className="input-group-prepend">
                                                                <span className="input-group-text"><i className="fas fa-unlock-alt" /></span>
                                                            </div>
                                                            <input type="password" className="form-control" name="password" placeholder="Confirmar contraseña" onChange={(e) => this.setState({ confirmPassword : e.target.value})} required />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-12">
                                                    <button className="btn btn-bordered w-100 mt-3 mt-sm-4" type="submit">Configurar la clave</button>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

export default connect(null, { setPassword })(SetPassword);