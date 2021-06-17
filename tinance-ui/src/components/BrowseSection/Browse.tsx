import React, { Component } from 'react';

import HeroSection from '../HeroSection/Hero';
import Offer from '../Offersection/Offer';


/* Plugins */
import ScrollUp from "../Plugins/ScrollUp";


class BrowseSection extends Component {
    render() {
        return (
            <>  
                <div className="welcome-page">
                    <ScrollUp />
                    <div className="main">
                        <HeroSection />
                        <Offer />
                        
                    </div>
                </div>
            </>
        );
    }
}
export default BrowseSection;