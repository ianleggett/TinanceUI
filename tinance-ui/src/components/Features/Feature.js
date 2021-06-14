import React, { Component } from 'react';

const initData = {
    preHeading: "Best",
    preHeadingspan: "Services",
    heading: "Collaborative Time-Management Platform for HR professionals",
    headingText: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.",
    headingTexttwo: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati."
}

const data = [
    {
        image: "/img/Features/featured_image_1.png",
        title: "Shift",
        content: "View of the entire organization in real-time, better manage employees’ time at work."
    },
    {
        image: "/img/Features/featured_image_2.png",
        title: "Absence",
        content: "The easiest way to request for time-off anytime, anywhere and under any motive."
    },
    {
        image: "/img/Features/featured_image_3.png",
        title: "Presence",
        content: "Reduce your stress. Reach your financial goals you've been aiming for!"
    },
    {
        image: "/img/Features/featured_image_4.png",
        title: "Digital signature",
        content: "Digitize the signature of your HR documents, safely and from anywhere"
    },
    {
        image: "/img/Features/featured_image_5.png",
        title: "Communication",
        content: "Fluid company-wide communication, providing news feed from one single platform."
    },
    {
        image: "/img/Features/featured_image_6.png",
        title: "Document sharing",
        content: "Organize, share, download and manage documents all from one safe place."
    }
]

class FeatureSection extends Component {
    state = {
        initData: {},
        data: []
    }
    componentDidMount(){
        this.setState({
            initData: initData,
            data: data
        })
    }
    render() {
        return (
            <>
                <section id="features" className="section features-area style-two ptb_100">
                    <div className="container">
                        <div className="row justify-content-center text-center">
                            <div className="col-12 col-md-10 col-lg-10">
                                <div className="section-heading">
                                <span className="d-inline-block rounded-pill shadow-sm fw-5 px-4 py-2 mb-3">
                                    <i className="far fa-lightbulb text-heading mr-1" />
                                    <span className="text-heading">{this.state.initData.preHeading}</span>
                                    {this.state.initData.preHeadingspan}
                                </span>
                                <h2>{this.state.initData.heading}</h2>
                                <p className="d-none d-sm-block mt-4">{this.state.initData.headingText}</p>
                                <p className="d-block d-sm-none mt-4">{this.state.initData.headingTexttwo}</p>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            {this.state.data.map((item, idx) => {
                                return(
                                    <div key={`ffd_${idx}`} className="col-12 col-md-6 col-lg-4 my-3">
                                        {/* Image Box */}
                                        <div className="image-box text-center icon-1 p-5 d-flex flex-column justify-content-between">
                                        {/* Featured Image */}
                                        <div className="featureImage">
                                            <img src={item.image} alt="" />
                                        </div>
                                        {/* Icon Text */}
                                        <div className="icon-text">
                                            <div>
                                                <h3 className="mb-2">{item.title}</h3>
                                                <p>{item.content}</p>
                                            </div>
                                        </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </>
        );
    }
}

export default FeatureSection;