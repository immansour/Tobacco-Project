import React from "react"
import Image from './image'
import introStyles from '../styles/intro-styles.module.css'
import Typing from "react-typing-animation"


const textOptions = [
    <Typing
        speed={30}
        hideCursor={false}>Welcome to Factory. Here, you will be able to set up all your company's industrial and scientific initiatives</Typing>,
        "To purchase an option, tap the corresponding Hexagon. After that, you will be able to view a description of the option, as well as its risk, cost, and market share on the right side of your screen",
        "If you decide to purchase this option, simply press the green `Purchase` button",
        "To unlock the first set of options, you must purchase the a Tier 1 Scientist, and so on",
        "After you purchase an option, you won't be able to purchase it again",
        "You may also Build a Factory by pressing the grey `Build Factory` button. There, you will also be able to select an option, view the statistics concerning it, and purchase it",
        "If you decide not to purchase anything from Factory, simply press the `Pass` button to continue on to the next day",
        "To learn more about the chemicals and industrial tactics tobacco businesses use, press the flashing info button that is next to the `Pass` button",
        "Here, try it out for yourself, good luck!"
]

export default class FactoryIntro extends React.Component {

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
                            if (this.state.currentTextIndex === 9) {
                                this.props.setGameState("isFirstFactory", false);
                            }
                        }}>
                        {this.state.currentTextIndex === 8? "Continue": "Next"}
                    </button>
               </div>
            </div>
        ) 
    }
}