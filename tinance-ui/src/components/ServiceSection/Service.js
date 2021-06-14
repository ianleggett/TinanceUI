import React, { Component } from 'react';

class ServiceSection extends Component {
    state = {
        data: {
            "thumb": "./img/credit-mobile.png",
            "serviceData": [
                {
                "id": 1,
                "iconClass": "fas fa-check-double",
                "text": "Collections"
                },
                {
                "id": 2,
                "iconClass": "fas fa-check-double",
                "text": "Charge-offs"
                },
                {
                "id": 3,
                "iconClass": "fas fa-check-double",
                "text": "Inquiries"
                },
                {
                "id": 4,
                "iconClass": "fas fa-check-double",
                "text": "Bankruptcies"
                },
                {
                "id": 1,
                "iconClass": "fas fa-check-double",
                "text": "Names"
                },
                {
                "id": 2,
                "iconClass": "fas fa-check-double",
                "text": "Addresses"
                },
                {
                "id": 3,
                "iconClass": "fas fa-check-double",
                "text": "Balances"
                },
                {
                "id": 4,
                "iconClass": "fas fa-check-double",
                "text": "Late Payments"
                }
            ]
        }
    }
    componentDidMount(){
    }
    render() {
        return (
            <section id="service" className="section service-area overflow-hidden ptb_100">
                <div className="container">
                    <div className="row justify-content-between">
                    <div className="col-12 col-lg-6 order-2 order-lg-1" style={{display : "flex", alignItems : "center"}}>
                        {/* Service Text */}
                        <div className="service-text pt-4 pt-lg-0">
                        <h2 className="text-capitalize mb-4">Repair your credit by fixing inaccuracies</h2>
                        {/* Service List */}
                        <ul className="service-list row">
                            {this.state.data.serviceData.map((item, idx) => {
                                return(
                                    <div key={`so_${idx}`} className="col-12 col-md-6">
                                        {/* Single Service */}
                                        <li className="single-service media py-2">
                                            <div className="service-icon pr-4">
                                                <span><i className={item.iconClass} /></span>
                                            </div>
                                            <h4>{item.text}</h4>
                                        </li>
                                    </div>
                                );
                            })}
                        </ul>
                        </div>
                    </div>
                    <div className="col-12 col-lg-6 order-1 order-lg-2 d-none d-lg-block">
                        {/* Service Thumb */}
                        <div className="service-thumb mx-auto">
                        <img src={this.state.data.thumb} alt="" />
                        </div>
                    </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default ServiceSection;