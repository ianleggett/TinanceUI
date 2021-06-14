import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, NavItem, TabContent, TabPane } from 'reactstrap';
import TeamManage from './TeamManage';
import MassImport from './MassImport';

class Team extends Component {
    constructor() {
        super();
        this.state = {
            activeTab: "1",
        }
    }
    
    toggle = tab => {
        if(this.state.activeTab !== tab) this.setState({activeTab: tab});
    }

    render() {
        return (
            <div className="dashboard-bg-gray dashboard" id="dashboard-team">
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={this.state.activeTab === "1" ? "active-tab" : ""}
                            onClick={() => { this.toggle('1'); }}
                            to="#"
                        >
                            Equipo
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={this.state.activeTab === "2" ? "active-tab" : ""}
                            onClick={() => { this.toggle('2'); }}
                            to="#"
                        >
                            Importación masiva
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <TeamManage />
                    </TabPane>
                    <TabPane tabId="2">
                        <MassImport />
                    </TabPane>
                </TabContent>
            </div>
        );
    }
}

export default Team;