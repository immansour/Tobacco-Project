import React from "react"
import { Link } from "gatsby"
import gameFinishedStyles from "../styles/game-finished.module.css"


export default class GameFinished extends React.Component {
    render() {
        return (
            <div className={gameFinishedStyles.gameFinishedWrapper}>
               <h1 className={gameFinishedStyles.gameFinishedTitle}>Game Finished</h1>
               <div className={gameFinishedStyles.gameFinishedContent}>You finished the game! In the end, {this.props.isWon? `you were able to get 70% of the market share for your business. But what did it take to get there? Along the way, ${this.props.totalDeaths.toLocaleString()} people lost their lives due to your buisness. These people lost their lives for no other reason, than due to the tobacco products your company produced. For the tobacco companies living in real-life, this is a mere disregard. Their products cause harm on a daily basis, and the companies don't care. For them, those people are a simple hurdle in the way to their number one goal: profit. It is our duty to continue to spread awareness about this troubling issue, and make sure that not one more person dies due to tobacco products.`:
                                                                                                                             `you were not able to get 70% of the market share for your business, and were thus fired. But what happened along the way? Along the way, ${this.props.totalDeaths.toLocaleString()} people lost their lives due to your business. These people lost their lives for no other reason, than due to the tobacco products your company produced. For the tobacco companies living in real-life, this is a mere disregard. Their products cause harm on a daily basis, and the companies don't care. For them, those people are a simple hurdle in the way to their number one goal: profit. It is our duty to continue to spread awareness about this troubling issue, and make sure that not one more person dies due to tobacco products.`}</div>
               <Link to="/">
                <div className={gameFinishedStyles.mainOption}>
                  Main Menu
                </div>
              </Link>
            
              <Link to="/resources/">
                <div className={gameFinishedStyles.mainOption}>
                  Resources
                </div>
              </Link>

              <Link to="/about/">
                <div className={gameFinishedStyles.mainOption}>
                  About
                </div>
              </Link>
            </div>
        ) 
    }
}