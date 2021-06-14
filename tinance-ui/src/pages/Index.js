import React, { Component } from 'react';

import HeroSection from '../components/HeroSection/Hero';
import FeatureSection from '../components/Features/Feature';
import ServiceSection from '../components/ServiceSection/Service';
import DiscoverSection from '../components/DiscoverSection/Discover';
import Work from '../components/WorkSection/Work';
import FaqSection from '../components/FaqSection/Faq';
import Subscribe from '../components/SubscribeSection/Subscribe';
import Team from '../components/TeamSection/Team';
import ContactSection from '../components/ContactSection/Contact';
import Testimonial from '../components/Plugins/Testimonial';

/* Plugins */
import ScrollUp from "../components/Plugins/ScrollUp";


class Welcome extends Component {
    render() {
        return (
            <>  
                <div className="welcome-page">
                    <ScrollUp />
                    <div className="main">
                        <HeroSection />
                        <FeatureSection />
                        <Work />
                        <Testimonial />
                        <ServiceSection />
                        <DiscoverSection />
                        <FaqSection />
                        <Subscribe />
                        <Team />
                       <ContactSection />
                    </div>
                </div>
            </>
        );
    }
}
export default Welcome;