import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import CompanySetting from './CompanySetting';
import Centers from './Centers';
import Charges from './Charges';
import EmployeeSkills from './EmployeeSkills';
import EmployeeAttribute from './EmployeeAttribute';

class Company extends Component {
    render() {
        return (
            <div>
                <Row>
                    <Col>
                        <div className="dashboard-card">
                            <CompanySetting />
                        </div>
                        <div className="dashboard-card">
                            <Centers submit={this.props.actions.addCenterData} data={this.props.data} />
                        </div>
                        <div className="dashboard-card">
                            <EmployeeSkills submit={this.props.actions.addEmployeeSkillData} data={this.props.data} />
                        </div>
                    </Col>
                    <Col>
                        <div className="dashboard-card">
                            <Charges submit={this.props.actions.addChargeData} data={this.props.data} />
                        </div>
                        <div className="dashboard-card">
                            <EmployeeAttribute submit={this.props.actions.addEmployeeAttrData} data={this.props.data} />
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Company;