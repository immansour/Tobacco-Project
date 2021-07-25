import React from "react"
import startGameStyles from "../styles/start-game.module.css"
import { Link } from "gatsby"
import Typing from "react-typing-animation"


const textOptions = [
    <Typing
        speed={30}
        hideCursor={false}>HEY YOU, YOU'RE THE NEW CEO OF THIS COMPANY (Press 'Next' to continue)</Typing>,
    "WE ARE A TOBACCO COMPANY, AND YOUR JOB IS TO MAKE OUR PROFITS GO UP, NO MATTER THE HARM OR COST.",
    "YOU HAVE 40 DAYS. YOU BETTER GET OUR MARKET SHARE TO 70% BEFORE THEN.",
    "OR ELSE ... FIRED.",
    "YOU ALSO BETTER NOT GET A 0% MARKET SHARE.",
    "OR ELSE ... FIRED",
    "NOW GET A MOVE ON. I DON'T HAVE ALL DAY."
]

export default class StartGame extends React.Component {

    constructor(props) {
        super(props);
        this.state = ({
            currentTextIndex: 0,
        })
    }

    render() {
        return (
                <div className={startGameStyles.background}>
                    {this.state.currentTextIndex > 5? 
                        <Link className={startGameStyles.mainOption} to="/game-play-w/">
                            <div>
                                Start Game
                            </div>
                        </Link>: 
                        <button className={startGameStyles.mainOption} onClick={() => { let copy = this.state; copy.currentTextIndex += 1; this.setState(copy)}}>
                            Next
                        </button>}
                    <div className={startGameStyles.textBox}>
                        {textOptions[this.state.currentTextIndex]}
                    </div>
                    
                </div>)
    }
}