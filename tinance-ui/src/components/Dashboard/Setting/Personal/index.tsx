import React, { Component } from 'react';
import { Col, Row } from 'reactstrap';
import Schedule from "./Schedule"
import Calendar from "./Calendar"
import Agreements from './Agreements';

type PersonalProps = {
    data: any;
    actions: {
      addCalendarData: () => Promise<void>;
      addScheduleData: () => Promise<void>;
      addAgreementsData: () => Promise<void>;
    };
  };

class Personal extends Component<PersonalProps> {

    render() {
        return (
            <div>
                <Row>
                    <Col>
                        <div className="dashboard-card">
                            <Calendar submit={this.props.actions.addCalendarData} data={this.props.data} />
                        </div>
                        <div className="dashboard-card">
                            <Schedule submit={this.props.actions.addScheduleData} data={this.props.data} />
                        </div>
                    </Col>
                    <Col>
                        <div className="dashboard-card">
                            <Agreements submit={this.props.actions.addAgreementsData} data={this.props.data} />
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Personal;