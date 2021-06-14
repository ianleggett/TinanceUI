import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { Nav, NavItem, TabContent, TabPane } from 'reactstrap';
import Coporate from './Coporate';
import Personal from './Personal';

class Dashboard extends Component {
    constructor(params) {
        super(params)
        this.state = {
            activeTab: "1",
        }
    }

    toggle = tab => {
        if(this.state.activeTab !== tab) this.setState({activeTab: tab});
    }
    
    render() {
        return (
            <section id="dashboard" className="dashboard-bg-gray dashboard">
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={this.state.activeTab === "1" ? "active-tab" : ""}
                            onClick={() => { this.toggle('1'); }}
                            to="#"
                        >
                            Corporate
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={this.state.activeTab === "2" ? "active-tab" : ""}
                            onClick={() => { this.toggle('2'); }}
                            to="#"
                        >
                            Personal
                        </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <Coporate />
                    </TabPane>
                    <TabPane tabId="2">
                        <Personal />
                    </TabPane>
                </TabContent>
            </section>
        );
    }
}

export default Dashboard;