import React from "react"
import gamePlayData from "../data/gamePlayData.json"
import popUpStyles from "../styles/popup.module.css"
import { BsCaretRightFill } from "react-icons/bs"


export default class Fact extends React.Component {
    render() {
        return (
            <div className={popUpStyles.factWrapper}>
                <h1 className={popUpStyles.title}>Did you know?</h1>
                <p className={popUpStyles.fact}>{gamePlayData.facts[this.props.factIndex]}</p>
                <button className={popUpStyles.nextButton} onClick={() => {this.props.setGameState("factsIndex", -1)}}>
                    Begin Day
                    <BsCaretRightFill></BsCaretRightFill>
                </button>
            </div>
        ) 
    }
}