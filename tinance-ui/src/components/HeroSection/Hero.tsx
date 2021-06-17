import React, { Component } from 'react';
import HomeSlider from "../Plugins/HomeSlider";

class HeroSection extends Component {
    state = {
        video: "jjijji",
        slider_data: [
            {
                img_path : "/img/Hero/15.jpg",
                title : "Legacy system",
                description : "We have a legacy system using java/jsp that needs converting and extending using React"
            },
            {
                img_path : "/img/Hero/3.jpg",
                title : "React router",
                description : "We have a simple menu with a set of functions which should be replaced by React router"
            },
            {
                img_path : "/img/Hero/18.jpg",
                title : "Single Page App",
                description : "The first task is to get this project working as a React SWP"
            },
            {
                img_path : "/img/Hero/1.jpg",
                title : "JWT Authentication",
                description : "We also have JWT REST architecture inplace, so developing authentication and calls with JWT would be needed"
            }
        ]
    }
    render() {
        return (
            <>
                <section id="home" className="section welcome-area bg-overlay d-flex align-items-center overflow-hidden">
                    <a href="#features" className="scrollDown scroll"><span></span></a>
                    <HomeSlider slides={this.state.slider_data} video={this.state.video} />
                </section>
            </>
        );
    }
}

export default HeroSection;