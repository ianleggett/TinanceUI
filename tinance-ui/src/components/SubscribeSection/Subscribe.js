import React, { Component } from 'react';

const initData = {
    heading: "Subscribe to get full account",
    text: "By subscribing you will get newsleter, promotions adipisicing elit. Architecto beatae, asperiores tempore repudiandae saepe aspernatur unde voluptate sapiente quia ex.",
    submitText: "Subscribe"
}

class Subscribe extends Component {
    state = {
        initData: {}
    }
    componentDidMount(){
        this.setState({
            initData: initData
        })
    }
    render() {
        return (
            <section id="subscribe" className="section bg-overlay subscribe-area ptb_100">
                <div className="container">
                    <div className="row justify-content-center">
                    <div className="col-12 col-md-10 col-lg-7">
                        <div className="subscribe-content text-center">
                        <h2>Get started with liquid work!</h2>
                        <p className="my-4">We take care of you so you can take care of your employees</p>
                        {/* Subscribe Form */}
                        <form className="subscribe-form">
                            <button type="submit" className="btn btn-lg btn-block">Start Now</button>
                        </form>
                        </div>
                    </div>
                    </div>
                </div>
            </section>
        );
    }
}

export default Subscribe;