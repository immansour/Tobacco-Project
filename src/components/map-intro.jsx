import React from "react"
import Image from "./image"
import introStyles from "../styles/intro-styles.module.css"
import Typing from "react-typing-animation"

const textOptions = [
  <Typing speed={30} hideCursor={false}>
    Hello, I am Neo, your personal robot assistant. I will be guiding you
    throughout your new job.
  </Typing>,
  "To help you, I've prepared a few things you need to know.",
  "To view your current market share, look at the bottom-middle of the screen. To view the current day, take a look at the top-left of your screen.",
  "You should also keep track of the number of deaths in the bottom-right of your screen. The more deaths your company causes, the more likely you'll get sued. It's just the cost of doing business.",
  "The more deaths there are, the less money you will receive each day and the less market share you'll have.",
  "You will also have to spend money to expand the business. To see how much money you have, look at the bottom-left of the screen.",
  "You can perform actions by pressing each of the glowing icons on the map. Once you complete all of them, press 'Next Day' to start a new day.",
  "You're all set up! Good luck!",
]

export default class MapIntro extends React.Component {
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
        <div className={introStyles.mapText}>
          <div>{textOptions[this.state.currentTextIndex]}</div>
          <button
            className={introStyles.mainOption}
            onClick={() => {
              let copy = this.state
              copy.currentTextIndex += 1
              this.setState(copy)
              if (this.state.currentTextIndex === 7) {
                this.props.setGameState("isFirstMap", false)
              }
            }}
          >
            {this.state.currentTextIndex === 6 ? "Start Game" : "Next"}
          </button>
        </div>
      </div>
    )
  }
}
