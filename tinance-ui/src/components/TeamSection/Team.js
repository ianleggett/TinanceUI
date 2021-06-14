import React, { Component } from 'react';

class Team extends Component {
    state = {
        data: {
            "teamData": [
                {
                    "id": 1,
                    "image": "./img/Teams/1.jpg",
                    "title": "Rajave Noma",
                    "teamPost": "Founder & CEO"
                },
                {
                    "id": 2,
                    "image": "./img/Teams/2.jpg",
                    "title": "Globejel William",
                    "teamPost": "Co-Founder"
                },
                {
                    "id": 3,
                    "image": "./img/Teams/3.jpg",
                    "title": "Jonatan Ijotob",
                    "teamPost": "Web Developer"
                },
                {
                    "id": 4,
                    "image": "./img/Teams/4.jpg",
                    "title": "Sophie Sonya",
                    "teamPost": "Graphic Designer"
                },
                {
                    "id": 1,
                    "image": "./img/Teams/5.jpg",
                    "title": "Bae Suzy",
                    "teamPost": "Sales Manager"
                },
                {
                    "id": 2,
                    "image": "./img/Teams/6.jpg",
                    "title": "Tajiana Vlniove",
                    "teamPost": "Software Engineer."
                },
                {
                    "id": 3,
                    "image": "./img/Teams/7.jpg",
                    "title": "Moldoban Irpin",
                    "teamPost": "Marketing Manager."
                },
                {
                    "id": 4,
                    "image": "./img/Teams/8.jpg",
                    "title": "A. Dineko",
                    "teamPost": "Data Entry Clerk."
                }
            ],
            "teamIcons": [
                {
                    "id": 1,
                    "iconClass": "fab fa-facebook-f"
                },
                {
                    "id": 2,
                    "iconClass": "fab fa-twitter"
                },
                {
                    "id": 3,
                    "iconClass": "fab fa-google-plus-g"
                },
                {
                    "id": 4,
                    "iconClass": "fab fa-linkedin-in"
                }
            ]
        },
    }   
    componentDidMount(){
    }
    render() {
        return (
            <section id="team" className="section team-area team-style-two overflow-hidden ptb_100">
                <div className="container">
                    <div className="row justify-content-center"> 
                    <div className="col-12 col-md-10 col-lg-6">
                        {/* Section Heading */}
                        <div className="section-heading text-center">
                        <h2 className="text-capitalize">Our Team Experts</h2>
                        <p className="d-none d-sm-block mt-4">Meet our team. Click on the team member to read their bio.</p>
                        </div>
                    </div>
                    </div>
                <div className="row">
                    {this.state.data.teamData.map((item, idx) => {
                        return(
                            <div key={`t_${idx}`} className="col-12 col-sm-6 col-lg-3">
                                <div className="single-team team-thumb d-inline-block position-relative overflow-hidden" style={{width : "100%"}}>
                                    <div>
                                        <img style={{width : "100%"}} src={item.image} alt="" />
                                    </div>
                                    {/* Team Overlay */}
                                    <div className="team-overlay">
                                    <h4 className="team-name text-white">{item.title}</h4>
                                    <h5 className="team-post text-white mt-2 mb-3">{item.teamPost}</h5>
                                    {/* Team Icons */}
                                    <div className="team-icons">
                                        {this.state.data.teamIcons.map((item, idx) => {
                                            return(
                                                <a key={`ti_${idx}`} className="p-2" href="/#"><i className={item.iconClass} /></a>
                                            );
                                        })}
                                    </div>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
                </div>

            </section>
        );
    }
}

export default Team;