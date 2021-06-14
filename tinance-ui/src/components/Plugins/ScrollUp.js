import React from "react";

class ScrollUp extends React.Component{
    componentDidMount(){
        document.addEventListener("scroll", this.toggleScrollTop);
    }
    componentWillUnmount(){
        document.removeEventListener("scroll", this.toggleScrollTop);
    }
    scrollTo(){
        window.scrollTo({ top : 0, behavior : 'smooth'});
    }
    toggleScrollTop(){
        let offset = 300;
        if (document.documentElement.scrollTop > offset) {
            try{
                document.querySelector("#scrollUp").classList.remove("animate__animated", "animate__zoomOutDown")
                document.querySelector("#scrollUp").classList.add("animate__animated", "animate__zoomInRight")
            } catch (err){
                console.log(err.response)
            }
        } else {
            try{
                document.querySelector("#scrollUp").classList.remove("animate__animated", "animate__zoomInRight")
                document.querySelector("#scrollUp").classList.add("animate__animated", "animate__zoomOutDown")
            } catch (err){
                console.log(err.response)
            }
        }
    }
    render(){
        return(
            <div href="#" id="scrollUp" onClick={() => this.scrollTo()}>
                <a href="#section08">
                    <span></span>
                    <span></span>
                    <span></span>
                </a>
            </div>
        )
    }
}
export default ScrollUp;