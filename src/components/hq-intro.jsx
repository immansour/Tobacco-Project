import React from "react"
import Image from "./image"
import introStyles from "../styles/intro-styles.module.css"
import Typing from "react-typing-animation"

const textOptions = [
  <Typing speed={30} hideCursor={false}>
    Welcome to Headquarters. Here, you can set up some of your company's
    initiatives and set a strategy.{" "}
  </Typing>,
  "To set up a specific initiative, tap on the white container corresponding to that initiative. Then, purchase it.",
  "If you decide not to purchase anything, you may press the 'Pass' button in the top-right corner, which will allow you to skip a day.",
  "You may also switch to the Lobbying section by pressing the 'Lobbying' button in the top-left corner.",
  "If you want to learn more about Headquarters/Lobbying, press the flashing info button near the top of the screen.",
  "Here. Try it!",
]

export default class HQIntro extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentTextIndex: 0,
    }
  }

  render() {
    return (
      <div className={introStyles.mapIntro}>
        <Image
          className={introStyles.robotImage}
          filename={"robotPic.png"}
        ></Image>
        <div className={introStyles.hqText}>
          <div>{textOptions[this.state.currentTextIndex]}</div>
          <button
            className={introStyles.mainOption}
            onClick={() => {
              let copy = this.state
              copy.currentTextIndex += 1
              this.setState(copy)
              if (this.state.currentTextIndex === 6) {
                this.props.setGameState("isFirstHQ", false)
              }
            }}
          >
            {this.state.currentTextIndex === 5 ? "Continue" : "Next"}
          </button>
        </div>
      </div>
    )
  }
}
