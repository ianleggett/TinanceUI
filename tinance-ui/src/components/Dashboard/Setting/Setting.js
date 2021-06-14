import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, NavItem, TabContent, TabPane } from 'reactstrap';
import Personal from './Personal/';
import Company from './Company/';
import { connect } from 'react-redux';
import {
    addCalendarData,
    getCalendarData,
    addScheduleData,
    getScheduleData,
    addAgreementsData,
    getAgreementsData,
    addCenterData,
    getCenterData,
    addChargeData,
    getChargeData,
    addEmployeeSkillData,
    getEmployeeSkillData,
    addEmployeeAttrData,
    getEmployeeAttrData
} from '../../../redux/actions/superAdmin/';

class Setting extends Component {
    constructor() {
        super();
        this.state = {
            activeTab: "1",
            calendarData: [],
            scheduleData: [],
            agreementsData: [],
            centersData: [],
            chargesData: [],
        }
    }

    toggle = tab => {
        if(this.state.activeTab !== tab) this.setState({activeTab: tab});
    }

    UNSAFE_componentWillMount = () => {
        this.props.getCalendarData()
        this.props.getScheduleData()
        this.props.getAgreementsData()
        this.props.getCenterData()
        this.props.getChargeData()
        this.props.getEmployeeSkillData()
        this.props.getEmployeeAttrData()
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps !== this.props) {
            this.setState({
                calendarData: this.props.calendarData,
                scheduleData: this.props.scheduleData,
                agreementsData: this.props.agreementsData,
                centersData: this.props.centersData,
                chargesData: this.props.chargesData,
                employeeSkillsData: this.props.employeeSkillsData,
                employeeAttrsData: this.props.employeeAttrsData,
            })
        }
    }

    render() {
        return (
            <div className="dashboard-bg-gray dashboard" id="dashboard-setting">
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={this.state.activeTab === "1" ? "active-tab" : ""}
                            onClick={() => { this.toggle('1'); }}
                            to="#"
                        >
                            Personalizar
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={this.state.activeTab === "2" ? "active-tab" : ""}
                            onClick={() => { this.toggle('2'); }}
                            to="#"
                        >
                            Empresa
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <Personal actions={this.props} data={this.state} />
                    </TabPane>
                    <TabPane tabId="2">
                        <Company actions={this.props} data={this.state} />
                    </TabPane>
                </TabContent>
            </div>
        );
    }
}

const mapToDisPatch = {
    addCalendarData,
    getCalendarData,
    addScheduleData,
    getScheduleData,
    addAgreementsData,
    getAgreementsData,
    addCenterData,
    getCenterData,
    addChargeData,
    getChargeData,
    addEmployeeSkillData,
    getEmployeeSkillData,
    addEmployeeAttrData,
    getEmployeeAttrData
}

const load = state => {
    return {
        calendarData: state.superAdmin.superAdmin.calendarData,
        scheduleData: state.superAdmin.superAdmin.scheduleData,
        agreementsData: state.superAdmin.superAdmin.agreementsData,
        centersData: state.superAdmin.superAdmin.centersData,
        chargesData: state.superAdmin.superAdmin.chargesData,
        employeeSkillsData: state.superAdmin.superAdmin.employeeSkillsData,
        employeeAttrsData: state.superAdmin.superAdmin.employeeAttrsData,
    }
}

export default connect(load, mapToDisPatch)(Setting);