import React, { Component } from 'react';

class Work extends Component {
    state = {
        data: [
            {
                "id": 1,
                "image": "/img/Work/bg1.svg",
                "title": "BEFORE",
                "stitle": "Traditional HR Ways",
                "content": [
                    {
                        "icon" : "/img/Work/client-before-01.png",
                        "title" : "Manual Processes"
                    },
                    {
                        "icon" : "/img/Work/client-before-02.png",
                        "title" : "No company-wide transparency"
                    },
                    {
                        "icon" : "/img/Work/client-before-03.png",
                        "title" : "Rigid access"
                    },
                    {
                        "icon" : "/img/Work/client-before-04.png",
                        "title" : "Wasted hours"
                    },
                ],
                "message" : "Long and tireless processes",
                "description" : "No time to focus on what matters",
                "emoji" : "/img/Work/emoji1.png",
                "type" : "Opacity"
            },
            {
                "id": 2,
                "image": "/img/Work/bg2.svg",
                "title": "NOW",
                "stitle": "Woffu HR Ways",
                "content": [
                    {
                        "icon" : "/img/Work/client-now-01.png",
                        "title" : "Digital Processes"
                    },
                    {
                        "icon" : "/img/Work/client-now-02.png",
                        "title" : "Company-wide transparency"
                    },
                    {
                        "icon" : "/img/Work/client-now-03.png",
                        "title" : "Cloud access"
                    },
                    {
                        "icon" : "/img/Work/client-now-04.png",
                        "title" : "Optimized hours"
                    },
                ],
                "message" : "Automated and easy processes",
                "description" : "A lot of time to focus on what matters",
                "emoji" : "/img/Work/emoji2.png",
                "type" : "Transparency"
            }
        ],
        messageImage : "/img/Work/message.png"
    }
    componentDidMount(){
    }
    render() {
        return (
            <section id="work" className="section work-area overflow-hidden ptb_100">
                <div className="container">
                    <div className="row m-auto" style={{maxWidth: "790px"}}>
                        {
                            this.state.data.map((item, i) => {
                                return (
                                    <div key={i} className="col-lg-6" style={{margin: "50px 0"}}>
                                        <div className="client-item" style={{background: `url(${item.image}) no-repeat 0 0`, backgroundSize: "cover", borderRadius: item.id === 1 ? "50px" : "200px", backgroundPosition: "center"}}>
                                            <h2>{item.title}</h2>
                                            <h5>{item.stitle}</h5>
                                            <ul className="client-content">
                                                {
                                                    item.content.map((content, j) => {
                                                        return (
                                                            <li key={j}>
                                                                <img alt={content.title} src={content.icon} />
                                                                <h6>{content.title}</h6>
                                                            </li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                            <h4 style={{background: `url(${this.state.messageImage}) no-repeat 50% 50%`, backgroundSize: "100% 100%"}}>{item.message}</h4>
                                            <h3>{item.description}</h3>
                                            <div className="client-feeling">
                                                <img alt="" src={item.emoji} />
                                                <h1>{item.type}</h1>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </section>
        );
    }
}

export default Work;