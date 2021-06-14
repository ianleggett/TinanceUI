import React, { Component } from 'react';
import { Col, Collapse, Form, FormGroup, Input, Row, Table } from 'reactstrap';
import { connect } from 'react-redux';
import { sessionCheck } from '../../../redux/actions/auth/loginActions';

class Coporate extends Component {
    constructor(params) {
        super();
        this.state = {
            "no_message" : "/img/Dashboard/no_message.svg",
            collapseIsOpen : true
        }
    }
    collapseToggle = () => {
        this.setState({
            collapseIsOpen : !this.state.collapseIsOpen
        })
    }
    render() {
        return (
            <div id="dashboard-coporate">
                <Row>
                    <Col md="8">
                        <div className="d-flex flex-column first-block">
                            <div className="request-list">
                                <div className="request-list-header">
                                    <h5>0 Awaitng requests</h5>
                                    <div className="select-options">
                                        <FormGroup>
                                            <Input type="select" className="dashboard-select" name="selectRequests" id="selectRequests">
                                                <option>All requests</option>
                                                <option>Holidays</option>
                                                <option>Absence</option>
                                                <option>Presence</option>
                                            </Input>
                                        </FormGroup>
                                        <FormGroup>
                                            <Input type="select" className="dashboard-select" name="selectDepartments" id="selectDepartments">
                                                <option>All the departments</option>
                                                <option>My team</option>
                                            </Input>
                                        </FormGroup>
                                    </div>
                                </div>
                            </div>
                            <div className="bulletin-board">
                                <div className="bulletin-board-header">
                                    <h5>Bulletin board</h5>
                                    <span>New message</span>
                                </div>
                                <div className="bulletin-board-body">
                                    <div className="no_message">
                                        <img alt="no message" src={this.state.no_message} />
                                        <p>You have no message</p>
                                        <p>Communicate with the company creating a <span>new message</span></p>
                                    </div>
                                </div>
                            </div>
                            <div className="vocation-report">
                                <div className="collapse-title" onClick={()=>this.collapseToggle()}>
                                    <h5>Vacation report by person in charge</h5>
                                    {
                                        this.state.collapseIsOpen === false ? <i className="fas fa-chevron-down"></i> : <i className="fas fa-chevron-up"></i>
                                    }
                                </div>
                                <div className="collapse-body">
                                    <Collapse isOpen={this.state.collapseIsOpen}>
                                        <Table className="vocation-report-table">
                                            <thead>
                                                <tr>
                                                    <th>RESPONSIBLE</th>
                                                    <th>SLOPES</th>
                                                    <th>OVERDUE</th>
                                                    <th>ACCEPTED</th>
                                                    <th>REJECTED</th>
                                                    <th>
                                                        <span className="accepted"><i></i>ACCEPTED</span>
                                                        <span className="slopes"><i></i>ACCEPTED</span>
                                                        <span className="available"><i></i>ACCEPTED</span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <th className="d-flex flex-column">
                                                        <h4>{this.props.auth.authData ? this.props.auth.authData.first_name + " " + this.props.auth.authData.last_name : ""}</h4>
                                                        <h6>Dept: </h6>
                                                    </th>
                                                    <td>0</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                    <td>0</td>
                                                    <td className="text-center">24</td>
                                                </tr>
                                            </tbody>
                                        </Table>
                                    </Collapse>
                                </div>
                            </div>
                        </div>
                    </Col>
                    <Col md="4">
                        <div className="second-block d-flex flex-column">
                            <div className="team">
                                <div className="title">
                                    <h4>Team</h4>
                                    <Form>
                                        <input type="text" className="form-control" style={{height: "40px"}} placeholder="Search by telecommuting, employee, position ..." />
                                    </Form>
                                </div>
                                <div className="body">
                                    <div className="action-component">
                                        <FormGroup>
                                            <Input type="select" className="dashboard-select" name="selectRequests" id="selectRequests">
                                                <option>All(1)</option>
                                                <option>Available(0)</option>
                                                <option>They have not signed(1)</option>
                                                <option>Not available(0)</option>
                                                <option>Not working today(0)</option>
                                            </Input>
                                        </FormGroup>
                                        <i className="fas fa-sync" style={{fontSize: "25px", alignSelf: "center"}}></i>
                                    </div>
                                    <div className="text-center">
                                        <h6 className="mt-5">No one is available at this time</h6>
                                    </div>
                                </div>
                            </div>
                            <div className="notice">
                                <div className="title">
                                    <h4>Notice</h4>
                                </div>
                                <div className="body">
                                    <h6>There is no data</h6>
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

export default connect(mapStateToProps, { sessionCheck })(Coporate);