import React from "react"
import gamePlayData from "../data/gamePlayData.json"
import popUpStyles from "../styles/popup.module.css"
import { BsCaretRightFill } from "react-icons/bs"
import Image from './image'


export default class MarketShareUp extends React.Component {
    render() {
        return (
            <div className={popUpStyles.factWrapper}>
                <h1 className={popUpStyles.title}>Market Share Update</h1>
                <p className={popUpStyles.fact}>{gamePlayData.marketShareUp[this.props.marketShareUpIndex].title}</p>
                <p className={popUpStyles.healthUp}>Market Share Change: {Math.ceil(this.props.previousMarketShare * 100) / 100}% <span className={popUpStyles.arrow}>{'->'}</span> {Math.ceil(this.props.currentMarketShare * 100) / 100}%</p>
                <Image className={popUpStyles.healthImage} filename={gamePlayData.marketShareUp[this.props.marketShareUpIndex].image}></Image>
                <button className={popUpStyles.nextButton} onClick={() => { 
                        this.props.setGameState("marketShareUpIndex", -1);
                        const nextSeen =  this.props.getGameState(this.props.nextView + "Seen"); 
                        this.props.setGameState(this.props.nextView + "Index", nextSeen[nextSeen.length - 1]);
                    }}>
                        
                    Next
                    <BsCaretRightFill></BsCaretRightFill>
                </button>
            </div>
        ) 
    }
}