import React, { Component } from 'react';

class FaqSection extends Component {
    state = {
        data: {
            "faqData": [
                {
                    "id": 1,
                    "title": "How Does the 30 day free trial work?",
                    "content": "Your first month is on us! If you cancel during your 30 day free trial you won't be charged a thing. If you choose to cancel later in the future you will never be charged again, but you're responsible for charges already incurred up until your cancellation."
                },
                {
                    "id": 2,
                    "title": "Are there any startup fees?",
                    "content": "We don't believe in startup fees. We give you everything to run a lucrative scalable business. Our prices are affordable because we want you to stay with us for many years. Your success is our goal."
                },
                {
                    "id": 3,
                    "title": "Is the software fully functional during a free trial?",
                    "content": "Yes, the software is 100% fully functional during the free trial and no features are blocked. Try the software as much as you like for a full month to see if it's right for you. However, the library, premium content, website and other offers are only available to paid-users."
                },
                {
                    "id": 4,
                    "title": "Are there any hidden fees, discounts or secret prices?",
                    "content": "We believe everyone is entitled to the best price we can offer. Our only prices are public, published on our site, and the same no matter who you are."
                },
                {
                    "id": 5,
                    "title": "How long are your contracts?",
                    "content": "There are NO long term contracts or commitments. You can use Do It Yourself month to month, and cancel at any time you'd like!"
                },
                {
                    "id": 6,
                    "title": "Who owns the data / content / subscribers?",
                    "content": "You do! Any content (including your clients and affiliates) are 100% owned by you. Do It Yourself doesn't have permission to use that content or contact your clients or affiliates for any reason. Do It Yourself is just a tool for YOU to run and grow your business (and change lives)!"
                }
            ]
        },
        currentCollapes : 0
    }

    openCollapese = (para) => {
        if(this.state.currentCollapes === para){
            document.getElementById(`collapse_${this.state.currentCollapes}`).classList.toggle("show");
        } else {
            document.getElementById(`collapse_${this.state.currentCollapes}`).classList.remove("show");
            document.getElementById(`collapse_${para}`).classList.add("show");
            this.setState({ currentCollapes : para })
        }
    }

    render() {
        return (
            <section id="faq" className="section faq-area ptb_100" style={{paddingTop : "200px"}}>
                <div className="container">
                    <div className="row justify-content-center">
                    <div className="col-12 col-md-10 col-lg-7">
                        {/* Section Heading */}
                        <div className="section-heading text-center">
                        <h2 className="text-capitalize">Have questions? Look here</h2>
                        <p className="d-none d-sm-block mt-4"> Here is a selection of our most frequently asked questions. </p>
                        <p className="d-block d-sm-none mt-4">If you can’t find the answer you are looking for just go to our Contact page and send your question over or give us a call. We are easy to talk to!</p>
                        </div>
                    </div>
                    </div>
                    <div className="row justify-content-center">
                    <div className="col-12">
                        {/* FAQ Content */}
                        <div className="faq-content">
                        {/* sApp Accordion */}
                        <div className="accordion" id="sApp-accordion">
                            <div className="row justify-content-center">
                                <div className="col-12 col-md-4 col-lg-4">
                                    <img src="/img/footergirl.png" alt="" style={{position : "absolute", height : "650px", bottom : "-110px"}} />
                                </div>
                                <div className="col-12 col-md-8 col-lg-8">
                                    {/* Single Accordion Item */}
                                    {this.state.data.faqData.map((item, idx) => {
                                        return(
                                            <div key={`ft_${idx}`} className="card border-top-0 border-left-0 border-right-0 border-bottom">
                                                {/* Card Header */}
                                                <div className="card-header bg-inherit border-0 p-0">
                                                    <h2 className="mb-0">
                                                    <button className="btn px-0 py-3" type="button" onClick = {()=>this.openCollapese(idx)}>
                                                        {item.title}
                                                    </button>
                                                    </h2>
                                                </div>
                                                <div id={`collapse_${idx}`} className="collapse">
                                                    {/* Card Body */}
                                                    <div className="card-body px-0 py-3">
                                                        {item.content}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default FaqSection;