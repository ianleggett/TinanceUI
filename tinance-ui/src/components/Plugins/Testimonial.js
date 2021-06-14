import React  from "react";
import "./assets/scss/Testimonial.scss";

const initData = {
    preHeading: "TESTIM",
    preHeadingspan: "ONIALS",
    heading: "We eliminate friction by increasing transparency & saving time",
    headingText: "",
}

class Testimonial extends React.Component {
    state = {
        testimonialData : [
            {
                avatar : "/img/Testimonials/01.jpg",
                name : "Reduce absenteeism by 20%",
                content : "People are the most important asset of any company, and the most important asset for employees is their time. We aspire to a work environment that has no frictions."
            },
            {
                avatar : "/img/Testimonials/02.jpg",
                name : "Save up to 86% in presence management",
                content : "People are the most important asset of any company, and the most important asset for employees is their time. We aspire to a work environment that has no frictions."
            },
            {
                avatar : "/img/Testimonials/03.jpg",
                name : "100% Adaptable",
                content : "People are the most important asset of any company, and the most important asset for employees is their time. We aspire to a work environment that has no frictions."
            },
            // {
            //     avatar : "/img/Testimonials/04.jpg",
            //     name : "Jinchemin && Wangdu",
            //     content : "Competently disintermediate goal-oriented interfaces after cross-unit action items. Compellingly fabricate accurate architectures via timely products. Credibly administrate prospective paradigms vis-a-vis virtual manufactured products. Conveniently redefine premium supply chains before cross-platform meta-services."
            // },
            // {
            //     avatar : "/img/Testimonials/05.jpg",
            //     name : "Vpapayan && Golya",
            //     content : "Competently disintermediate goal-oriented interfaces after cross-unit action items. Compellingly fabricate accurate architectures via timely products. Credibly administrate prospective paradigms vis-a-vis virtual manufactured products. Conveniently redefine premium supply chains before cross-platform meta-services."
            // },
            // {
            //     avatar : "/img/Testimonials/06.jpg",
            //     name : "Perpeson && Oxana",
            //     content : "Competently disintermediate goal-oriented interfaces after cross-unit action items. Compellingly fabricate accurate architectures via timely products. Credibly administrate prospective paradigms vis-a-vis virtual manufactured products. Conveniently redefine premium supply chains before cross-platform meta-services."
            // }
        ],
        initData: {},
        backImg: '/img/Testimonials/bg.png'
    }
    componentDidMount(){
        this.initTestimonial();
        this.setState({
            initData: initData
        })
    }
    componentDidUpdate(){
        this.initTestimonial();
    }
    initTestimonial(){
        var	testim = document.getElementById("testim"),
            testimDots = Array.prototype.slice.call(document.getElementById("testim-dots").children),
            testimContent = Array.prototype.slice.call(document.getElementById("testim-content").children),
            testimLeftArrow = document.getElementById("left-arrow"),
            testimRightArrow = document.getElementById("right-arrow"),
            testimSpeed = 4500,
            currentSlide = 0,
            currentActive = 0,
            testimTimer,
                touchStartPos,
                touchEndPos,
                touchPosDiff,
                ignoreTouch = 30;
        ;
        function playSlide(slide) {
            for (var k = 0; k < testimDots.length; k++) {
                testimContent[k].classList.remove("active");
                testimContent[k].classList.remove("inactive");
                testimDots[k].classList.remove("active");
            }
            if (slide < 0) {
                slide = currentSlide = testimContent.length-1;
            }
            if (slide > testimContent.length - 1) {
                slide = currentSlide = 0;
            }
            if (currentActive !== currentSlide) {
                testimContent[currentActive].classList.add("inactive");            
            }
            testimContent[slide].classList.add("active");
            testimDots[slide].classList.add("active");
            currentActive = currentSlide;
            clearTimeout(testimTimer);
            testimTimer = setTimeout(function() {
                playSlide(currentSlide += 1);
            }, testimSpeed)
        }
        testimLeftArrow.addEventListener("click", function() {
            playSlide(currentSlide -= 1);
        })
        testimRightArrow.addEventListener("click", function() {
            playSlide(currentSlide += 1);
        })    
        for (var l = 0; l < testimDots.length; l++) {
            testimDots[l].addEventListener("click", function() {
                var currentSlide = testimDots.indexOf(this);
                playSlide(currentSlide);
            })
        }
        playSlide(currentSlide);
        // keyboard shortcuts
        document.addEventListener("keyup", function(e) {
            switch (e.keyCode) {
                case 37:
                    testimLeftArrow.click();
                    break;
                    
                case 39:
                    testimRightArrow.click();
                    break;

                default:
                    break;
            }
        })
        testim.addEventListener("touchstart", function(e) {
                touchStartPos = e.changedTouches[0].clientX;
        })
        testim.addEventListener("touchend", function(e) {
                touchEndPos = e.changedTouches[0].clientX;
            
                touchPosDiff = touchStartPos - touchEndPos;
                if (touchPosDiff > 0 + ignoreTouch) {
                        testimLeftArrow.click();
                } else if (touchPosDiff < 0 - ignoreTouch) {
                        testimRightArrow.click();
                } else {
                    return;
                }
        })
    }
    render() {
        return (
            <section id="testim" className="testim ptb_100 container" style={{backgroundColor: "#052b53", maxWidth: "100%"}}>
                <div className="custom-div"><div></div></div>
                <div className="m-auto" style={{paddingTop: "150px"}}>
                    <div className="row justify-content-center text-center m-0">
                        <div className="col-12 col-md-10 col-lg-6">
                            <div className="section-heading">
                            {/* <span className="d-inline-block rounded-pill shadow-sm fw-5 px-4 py-2 mb-3">
                                <i className="far fa-lightbulb text-heading mr-1" />
                                <span className="text-heading">{this.state.initData.preHeading}</span>
                                {this.state.initData.preHeadingspan}
                            </span> */}
                            <h4 style={{color: "white"}}>{this.state.initData.heading}</h4>
                            <p className="d-none d-sm-block mt-4">{this.state.initData.headingText}</p>
                            </div>
                        </div>
                    </div>
                    <span id="right-arrow" className="arrow right fa fa-chevron-right" style={{visibility : "hidden"}}></span>
                    <span id="left-arrow" className="arrow left fa fa-chevron-left " style={{visibility : "hidden"}}></span>
                    <div className="row m-0">
                        <div className="col-12 col-md-6" style={{margin: "10px 0"}}>
                            <img src="/img/Testimonials/story.png" alt="" />
                        </div>
                        <div className="col-12 col-md-6">
                            <div id="testim-content" className="cont">
                                {this.state.testimonialData.length >= 1 ? this.state.testimonialData.map((item, idx) => {
                                    return(
                                        <div key={idx} className={idx === 0 ? "active" : ""}>
                                            <div className="img"><img src={item.avatar} alt="" /></div>
                                            <h2>{item.name}</h2>
                                            <p>❝ {item.content} ❞</p>                    
                                        </div>
                                    )
                                }) : <div className="active"></div>}
                            </div>
                            <ul id="testim-dots" className="dots" style={{position: "unset"}}>
                                {this.state.testimonialData.length >= 1 ? this.state.testimonialData.map((item, idx) => {
                                    return(
                                        <li key={"dot_" + idx} className={idx === 0 ? "dot active" : "dot"}></li>
                                    )
                                }) : <li className="active"></li>}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
        )
    }
}

export default Testimonial;