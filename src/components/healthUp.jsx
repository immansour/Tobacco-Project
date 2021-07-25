import React from "react"
import gamePlayData from "../data/gamePlayData.json"
import popUpStyles from "../styles/popup.module.css"
import { BsCaretRightFill } from "react-icons/bs"
import Image from './image'


export default class HealthUp extends React.Component {
    render() {
        return (
            <div className={popUpStyles.factWrapper}>
                <h1 className={popUpStyles.title}>Health Update</h1>
                <p className={popUpStyles.fact}>{gamePlayData.healthUp[this.props.healthUpIndex].title}</p>
                <p className={popUpStyles.healthDown}>Health Change: {this.props.previousHealth.toLocaleString()} deaths <span className={popUpStyles.arrow}>{'->'}</span> {this.props.currentHealth.toLocaleString()} deaths</p>
                <Image className={popUpStyles.healthImage} filename={gamePlayData.healthUp[this.props.healthUpIndex].image}></Image>
                <button className={popUpStyles.nextButton} onClick={() => { 
                        this.props.setGameState("healthUpIndex", -1);
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