import React, { Component } from 'react';
import Slider from "react-slick";

class BrandingSection extends Component {
    
    state = {
        brandingData : [
            {
                img_path : "/img/Mentioned/brand_thumb_1.png",
                title : "brand1"
            },
            {
                img_path : "/img/Mentioned/brand_thumb_2.png",
                title : "brand2"
            },
            {
                img_path : "/img/Mentioned/brand_thumb_3.png",
                title : "brand3"
            },
            {
                img_path : "/img/Mentioned/brand_thumb_4.png",
                title : "brand4"
            },
            {
                img_path : "/img/Mentioned/brand_thumb_5.png",
                title : "brand5"
            },
            {
                img_path : "/img/Mentioned/brand_thumb_6.png",
                title : "brand6"
            },
        ],
        settings : {
            dots: false,
            infinite: true,
            speed: 500,
            arrows : false,
            autoplay : true,
            autoplaySpeed : 2000,
            slidesToShow: 4,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 1400,
                    settings: {
                      slidesToShow: 4,
                      slidesToScroll: 3,
                      infinite: true,
                      dots: false
                    }
                },
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: false
                  }
                },
                {
                  breakpoint: 600,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                    dots: false
                  }
                },
                {
                  breakpoint: 480,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    dots: false
                  }
                }
            ]
        }
    }

    render() {
        return (
            <section id="branding" className="branding-area ptb_100">
                <div className="container">
                    <div className="title_brand row justify-content-center">
                        <div className="col-12 col-md-10 col-lg-8">
                            {/* Section Heading */}
                            <div className="section-heading text-center">
                            <h2>OUR BEST CLIENTS</h2>
                            <p className="d-none d-sm-block mt-4">TRUSTED BY BIG NAMES AROUND THE GLOBE</p>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <Slider {...this.state.settings} style={{width : "100%"}}>
                            {this.state.brandingData.map((item, idx) => {
                                return(
                                    <div key={"brading" + idx}>
                                        <img src={item.img_path} alt={item.title} />
                                    </div>
                                )
                            })}
                        </Slider>
                    </div>
                </div>
            </section>
        );
    }
}

export default BrandingSection;