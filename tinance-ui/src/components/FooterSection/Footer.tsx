import React, { Component } from 'react';

class FooterSection extends Component {
    state = {
        data: {
            "image": "/img/logo.png",
            "iconList": [
                {
                    "id": 1,
                    "link": "facebook",
                    "iconClass": "fab fa-facebook-f"
                },
                {
                    "id": 2,
                    "link": "twitter",
                    "iconClass": "fab fa-twitter"
                },
                {
                    "id": 3,
                    "link": "google-plus",
                    "iconClass": "fab fa-google-plus-g"
                },
                {
                    "id": 4,
                    "link": "vine",
                    "iconClass": "fab fa-vine"
                }
            ],
            "footerList_1": [
                {
                    "id": 1,
                    "text": "`Design is not just what it looks like and feels like. Design is how it works`"
                },
            ],
            "footerList_2": [
                {
                    "id": 1,
                    "text": "1st Floor Dallas Texas : United State"
                },
                {
                    "id": 2,
                    "text": "info@doityourself.com"
                },
                {
                    "id": 3,
                    "text": "+1 723 847 842"
                },
                {
                    "id": 4,
                    "text": "+1 786 384 784"
                }
            ],
            "footerList_3": [
                {
                    "id": 1,
                    "image": "/img/Download/google-play-black.png"
                },
                {
                    "id": 2,
                    "image": "/img/Download/app-store-black.png"
                }
            ],
            "footerList_4": [
                {
                    "id": 1,
                    "href" : "/features",
                    "text": "FEATURES"
                },
                {
                    "id": 2,
                    "href" : "/clients",
                    "text": "CLIENTS"
                },
                {
                    "id": 3,
                    "href" : "/prices",
                    "text": "PRICES"
                },
                {
                    "id": 4,
                    "href" : "/about",
                    "text": "ABOUT"
                },
                {
                    "id": 5,
                    "href" : "/aboutus",
                    "text": "ABOUT US"
                },
                {
                    "id": 6,
                    "href" : "/resources",
                    "text": "RESOURCES"
                },
            ]
        }
    }
    render() {
        return (
            <footer id="footer" className="footer-area">
                {/* <div className="seperate-line container">
                    <img src="/img/favicon.png" alt="" />
                </div> */}
                {/* Footer Top */}
                <div className="footer-top ptb_100">
                    <div className="container">
                        <div className="row">
                            {/* <img src="/img/footergirl.png" id="footerImage" alt="123" /> */}
                            <div className="col-12 col-sm-6 col-lg-3">
                                <div className="footer-items">
                                    <h3 className="footer-title mb-2">ABOUT US</h3>
                                    <hr className="hr1" />
                                    <hr className="hr2" />
                                    <p className="mt-2 mb-3">We are committed to providing innovative software solutions to the retirement benefits marketplace</p>

                                    {/* Logo */}
                                    <a className="navbar-brand" href="/#">
                                        <img className="logo" src="/img/logo2.png" alt="" />
                                    </a>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6 col-lg-3">
                                {/* Footer Items */}
                                <div className="footer-items">
                                    {/* Footer Title */}
                                    <h3 className="footer-title mb-2">QUICK LINKS</h3>
                                    <hr className="hr1" />
                                    <hr className="hr2" />
                                    <ul>
                                        {this.state.data.footerList_4.map((item, idx) => {
                                            return(
                                                <li key={`flo_${idx}`} className="py-2"><a href="/#">{item.text}</a></li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6 col-lg-3">
                                {/* Footer Items */}
                                <div className="footer-items">
                                    {/* Footer Title */}
                                    <h3 className="footer-title mb-2">FAVORITE QUOTE</h3>
                                    <hr className="hr1" />
                                    <hr className="hr2" />
                                    <ul>
                                        {this.state.data.footerList_1.map((item, idx) => {
                                            return(
                                                <li key={`flo_${idx}`} className="py-2"><a href="/#">{item.text}</a></li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </div>
                            <div className="col-12 col-sm-6 col-lg-3">
                                {/* Footer Items */}
                                <div className="footer-items">
                                    {/* Footer Title */}
                                    <h3 className="footer-title mb-2">GET IN TOUCH</h3>
                                    <hr className="hr1" />
                                    <hr className="hr2" />
                                    <ul>
                                        {this.state.data.footerList_2.map((item, idx) => {
                                            return(
                                                <li key={`flt_${idx}`} className="py-2"><a href="/#">{item.text}</a></li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="seperate-line container">
                    <a href="https://www.facebook.com/systechafrica">
                        <span style={{paddingLeft : "30px"}}><i className="fab fa-facebook-square"></i></span>
                    </a>
                    <a href="https://twitter.com/Systech_Ltd">
                        <span><i className="fab fa-twitter-square"></i></span>
                    </a>
                    <a href="http://www.linkedin.com/company/5049397">
                        <span><i className="fab fa-google-plus-square"></i></span>
                    </a>
                    <a href="http://plus.google.com/115976292984421142673">
                        <span style={{paddingRight : "30px"}}><i className="fab fa-linkedin"></i></span>
                    </a>
                </div>
                {/* Footer Bottom */}
                <div className="footer-bottom">
                    <div className="row" style={{width : "100%"}}>
                        <div className="col-12">
                            {/* Copyright Area */}
                            <div className="copyright-area py-4">
                                © Copyright 2018. All Rights Reserved by Do it yourself
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}

export default FooterSection;