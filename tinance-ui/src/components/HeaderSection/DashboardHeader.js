import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Collapse, Dropdown, DropdownMenu, DropdownToggle, Form, Nav, Navbar, NavbarToggler, NavItem } from "reactstrap"
import { connect } from 'react-redux';
import { sessionCheck, logOut } from '../../redux/actions/auth/loginActions';
import { Input } from 'antd';

class DashboardHeader extends Component {
    constructor(params) {
        super(params);
        this.state = {
            dropdownOpen: false,
            isOpen: false
        }
    }

    componentDidMount = () => {
        this.props.sessionCheck();
    }

    toggle = () => {
        this.setState({
            dropdownOpen : !this.state.dropdownOpen
        })
    }

    navToggle = () => {
    }

    render() {
        return (
            <header className="navbar dashboard-navbar position-absolute top-0">
                <div className="dashboard-logo">
                    <h2 className="m-0"><Link to="/dashboard">{this.props.auth.companyData ? this.props.auth.companyData.company_name : "TIMECLICK360"}</Link></h2>
                </div>
                <div className="dashboard-search d-flex">
                    <Form>
                        <Input type="text" placeholder="Search Employee" />
                    </Form>
                </div>
                <div className="dashboard-user-navbar">
                    <button className="btn btn-bordered news-button"><i className="fas fa-gift mr-1"></i>New Arrivals<span>(10)</span></button>
                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                        <DropdownToggle caret className="user-dropdown-button">
                            {this.props.auth.authData ? this.props.auth.authData.first_name : ""}
                        </DropdownToggle>
                        <DropdownMenu right>
                            <div className="user-dropdown-item"><i className="fas fa-user mr-2"></i>My profile</div>
                            <div className="user-dropdown-item"><i className="fas fa-gift mr-2"></i>New arrivals</div>
                            <div className="user-dropdown-item"><i className="fas fa-info-circle mr-2"></i>Help center</div>
                            <div className="user-dropdown-item" onClick={()=> this.props.logOut()}><i className="fas fa-power-off mr-2"></i>Log out</div>
                        </DropdownMenu>
                    </Dropdown>
                </div>
                <Navbar color="light" light expand="md" className="dashboard-header-bar">
                    <NavbarToggler onClick={this.navToggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="mr-auto" navbar>
                            <NavItem>
                                <NavLink to="/dashboard" activeClassName="dash-nav-active">Dashboard</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/dashboard-calendar" activeClassName="dash-nav-active">Calendario</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/dashboard-requests" activeClassName="dash-nav-active">Solicitudes</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/dashboard-presence" activeClassName="dash-nav-active">Presencia</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/dashboard-documents" activeClassName="dash-nav-active">Documentos</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/dashboard-team" activeClassName="dash-nav-active">Equipo</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/dashboard-reports" activeClassName="dash-nav-active">Informes</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink to="/dashboard-setting" activeClassName="dash-nav-active">Configuración</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
                </Navbar>
            </header>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth.login
    }
}

export default connect(mapStateToProps, { sessionCheck, logOut })(DashboardHeader);