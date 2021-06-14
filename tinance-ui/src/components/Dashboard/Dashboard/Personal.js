import React, { Component } from 'react';
import { Col, ListGroup, ListGroupItem, Progress, Row } from 'reactstrap';
import { connect } from 'react-redux';
import { sessionCheck } from '../../../redux/actions/auth/loginActions';

class Personal extends Component {
    
    constructor() {
        super();
        this.state = {
            months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        }
    }
    
    render() {
        return (
            <div id="dashboard-personal">
                <div className="personal-page-header">
                    <h3>How are you? {this.props.auth.authData ? this.props.auth.authData.first_name + " " + this.props.auth.authData.last_name : ""}</h3>
                </div>
                <Row>
                    <Col md="6">
                        <div className="profile-block dashboard-card">
                            <div className="dashboard-card-title">
                                <h4>My profile</h4>
                            </div>
                            <div className="dashboard-card-body">
                                <h3>{this.props.auth.authData ? this.props.auth.authData.first_name + " " + this.props.auth.authData.last_name : ""}</h3>
                                <Row>
                                    <Col>
                                        <h6><b>This week</b></h6>
                                        <div className="d-flex flex-column text-center hour-content">
                                            <span><b>0h</b></span>
                                            <p>From <b>40h</b></p>
                                        </div>
                                    </Col>
                                    <Col>
                                        <h6><b>{this.state.months[new Date().getMonth()]}</b></h6>
                                        <div className="d-flex flex-column text-center hour-content">
                                            <span><b>0h</b></span>
                                            <p>From <b>112h</b></p>
                                        </div>
                                    </Col>
                                    <Col>
                                        <h6><b>{new Date().getFullYear()}</b></h6>
                                        <div className="d-flex flex-column text-center hour-content">
                                            <span><b>0h</b></span>
                                            {/* <p>From <b>40h</b></p> */}
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <div className="request-block dashboard-card">
                            <div className="dashboard-card-title">
                                <h4>Requests</h4>
                            </div>
                            <div className="dashboard-card-body">
                                <div className="d-flex justify-content-between request-list">
                                    <h4>HOLIDAYS</h4>
                                    <h4>24DAYS</h4>
                                </div>
                                <button className="btn btn-dashboard btn-primary">New request</button>
                            </div>
                        </div>
                    </Col>
                    <Col md="6">
                        <div className="today-block dashboard-card">
                            <div className="dashboard-card-title">
                                <h4>Today</h4>
                            </div>
                            <div className="dashboard-card-body">
                                <div className="event-card your-journey">
                                    <div className="event-card-title">
                                        <i className="fas fa-sign-in-alt"></i>
                                        <h4>Your journey</h4>
                                    </div>
                                    <div className="event-card-body">
                                        <h6 className="text-center p-1 mb-2"><b>no business</b> 8h</h6>
                                        <div className="schedule">
                                            <span>Schedule:</span>
                                            <span><b>09:00:00 - 14:00:00</b></span>
                                            <span><b>15:00:00 - 18:00:00</b></span>
                                        </div>
                                        <div className="center text-center py-2">
                                            <span>Center</span>
                                            <b>no business</b>
                                            <span className="mt-2">Hours worked</span>
                                            <p><b>00:00:00</b></p>
                                            <Progress className="w-75 m-auto" animated value={0} />
                                            <ListGroup className="mb-2">
                                                <ListGroupItem><span>Entry</span><span>18:18:52</span></ListGroupItem>
                                                <ListGroupItem><span>Departure</span><span>18:19:00</span></ListGroupItem>
                                            </ListGroup>
                                            <button className="btn btn-dashboard btn-primary m-auto w-50">Get in</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="event-card company-event mt-3">
                                    <div className="event-card-title">
                                        <i className="fas fa-briefcase"></i>
                                        <h4>Company event</h4>
                                    </div>
                                    <div className="event-card-body">
                                        <span>No company events</span>
                                    </div>
                                </div>
                                <div className="event-card holidays mt-3">
                                    <div className="event-card-title">
                                        <i className="fas fa-sign-in-alt"></i>
                                        <h4>Holidays</h4>
                                    </div>
                                    <div className="event-card-body">
                                        <span>Not festive</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth.login
    }
}

export default connect(mapStateToProps, { sessionCheck })(Personal);