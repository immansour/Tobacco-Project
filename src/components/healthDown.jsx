import React from "react"
import gamePlayData from "../data/gamePlayData.json"
import popUpStyles from "../styles/popup.module.css"
import { BsCaretRightFill } from "react-icons/bs"
import Image from './image'


export default class HealthDown extends React.Component {
    render() {
        return (
            <div className={popUpStyles.factWrapper}>
                <h1 className={popUpStyles.title}>Health Update</h1>
                <p className={popUpStyles.fact}>{gamePlayData.healthDown[this.props.healthDownIndex].title}</p>
                <p className={popUpStyles.healthUp}>Health Change: {this.props.previousHealth.toLocaleString()} deaths <span className={popUpStyles.arrow}>{'->'}</span> {this.props.currentHealth.toLocaleString()} deaths</p>
                <Image className={popUpStyles.healthImage} filename={gamePlayData.healthDown[this.props.healthDownIndex].image}></Image>
                <button className={popUpStyles.nextButton} onClick={() => { 
                        this.props.setGameState("healthDownIndex", -1);
                        const factsSeen =  this.props.getGameState("factsSeen"); 
                        this.props.setGameState("factsIndex", factsSeen[factsSeen.length - 1]);
                    }}>
                        
                    Next
                    <BsCaretRightFill></BsCaretRightFill>
                </button>
            </div>
        ) 
    }
}