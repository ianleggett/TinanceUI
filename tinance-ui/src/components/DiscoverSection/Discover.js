import React, { Component } from 'react';

class DiscoverSection extends Component {
    state = {
        data: {
            "thumbTwo": "/img/credit-pc.png",
            "discoverData": [
                {
                    "id": 1,
                    "iconClass": "fas fa-check",
                    "text": "Combined with a handful of model sentence structures looks reasonable."
                },
                {
                    "id": 2,
                    "iconClass": "fas fa-check",
                    "text": "Contrary to popular belief, Lorem Ipsum is not simply random text."
                },
                {
                    "id": 3,
                    "iconClass": "fas fa-check",
                    "text": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium."
                },
                {
                    "id": 4,
                    "iconClass": "fas fa-check",
                    "text": "All the Lorem Ipsum generators on the Internet tend to repeat necessary."
                }
            ],
            "discoverIcon": [
                {
                    "id": 1,
                    "iconClass": "fas fa-bell"
                },
                {
                    "id": 2,
                    "iconClass": "fas fa-envelope-open"
                },
                {
                    "id": 3,
                    "iconClass": "fas fa-video"
                }
            ]
        }
    }
    componentDidMount(){
    }
    render() {
        return (
            <section id="discover" className="section discover-area bg-gray overflow-hidden ptb_100">
                <div className="container">
                    <div className="row align-items-center justify-content-between">
                    <div className="col-12 col-lg-6 order-2 order-lg-1">
                        {/* Discover Thumb */}
                        <div className="service-thumb discover-thumb mx-auto pt-5 pt-lg-0">
                            <img src="/img/credit-pc.png" alt="" />
                        </div>
                    </div>
                    <div className="col-12 col-lg-6 order-1 order-lg-2">
                        {/* Discover Text */}
                        <div className="discover-text pt-4 pt-lg-0">
                        <h2 className="pb-4">Our Glorious, Risk-Free Guarantee</h2>
                        {/* Check List */}
                        <ul className="check-list">
                            {this.state.data.discoverData.map((item, idx) => {
                                return(
                                    <div key={`do_${idx}`}>
                                        <li className="py-2">
                                            {/* List Box */}
                                            <div className="list-box media">
                                                <span className="icon align-self-center"><i className={item.iconClass} /></span>
                                                <span className="media-body pl-2">{item.text}</span>
                                            </div>
                                        </li>
                                    </div>
                                );
                            })}
                        </ul>
                        <div className="icon-box d-flex mt-3">
                            {this.state.data.discoverIcon.map((item, idx) => {
                                return(
                                    <div key={`il_${idx}`} className="service-icon pr-3">
                                        <span><i className={item.iconClass} /></span>
                                    </div>
                                );
                            })}
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default DiscoverSection;