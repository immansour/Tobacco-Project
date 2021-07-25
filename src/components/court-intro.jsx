import React from "react"
import Image from './image'
import introStyles from '../styles/intro-styles.module.css'
import Typing from "react-typing-animation"


const textOptions = [
    <Typing
        speed={30}
        hideCursor={false}>Welcome to Court. Here, you will be able to fight against people suing you</Typing>,
        "Our algorithims predict that someone will sue you every 5 days. Once they sue, you can either pay them to walk away or take them to trial",
        "If you take them to trial, you will risk losing your case, which will cost you a lot of money. If you win, however, you won't have to pay anything",
        "If you pay them to walk away, you will not risk anything, but you will lose the money you paid them",
        "You will be able to select from three types of lawyers. Depending on their rating, you may have a higher/lower chance of winning the case",
        "If you do not take care of a court case for one day, and decide to move onto the next day, the judge will shut down sale of your products for one day",
        "If this happens, your market share will decrease by 1.0%",
        "Well, it seems like we have just recieved our first court case, go take care of it!"
]

export default class CourtIntro extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({
            currentTextIndex: 0,
        })
    }

    render() {
        return (
            <div className={introStyles.mapIntro}>
               <Image className={introStyles.robotImage} filename={"robotPic.png"}></Image>
               <div className={introStyles.hqText}>
                    <div>{textOptions[this.state.currentTextIndex]}</div>
                    <button className={introStyles.mainOption} onClick={() => { 
                            let copy = this.state; copy.currentTextIndex += 1; this.setState(copy);
                            if (this.state.currentTextIndex === 8) {
                                this.props.setGameState("isFirstCourt", false);
                            }
                        }}>
                        {this.state.currentTextIndex === 7? "Continue": "Next"}
                    </button>
               </div>
            </div>
        ) 
    }
}