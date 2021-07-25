import React from "react"
import Image from './image'
import newspaperdata from "../data/newspaperData.json"
import gamePlayStyles from "../styles/game-play.module.css"
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import Headquarters from "./headquarters";
import { ProgressBar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Factory from "./factory";
import SupremeCourt from "./supremeCourt";
import { BsJustify, BsChevronRight } from "react-icons/bs";
import Popup from 'reactjs-popup';
import { Link } from "gatsby"
import mainStyles from "../styles/main.module.css"
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import gamePlayData from "../data/gamePlayData.json"
import { withAlert } from 'react-alert'
import Tooltip from '@material-ui/core/Tooltip';
import Fact from "./fact";
import HealthUp from "./healthUp";
import HealthDown from "./healthDown";
import MarketShareUp from "./marketShareUp";
import MarketShareDown from "./marketShareDown";
import GameFinished from "./game-finished";
import MapIntro from "./map-intro";



const options = {
    position: positions.TOP_RIGHT,
    timeout: 2500,
    offset: '30px',
    transition: transitions.FADE
  }

class GamePlay extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            isPaneOpenHQ: false,
            isPaneOpenFactory: false,
            isPaneOpenCourt: false,
            previousCash: 50000000,
            previousHealth: 21000,
            previousMarketShare: 0,
            previousPreviousCash: 50000000,
            previousPreviousHealth: 21000,
            previousPreviousMarketShare: 0,
            gameState: {
                isCourtCase: true,
                courtIndex: 0,
                isFirstTurn: true,
                isGameFinished: false,
                totalDeaths: 0,
                cash: 50000000,
                day: 1,
                marketShare: 0,
                health: 21000,
                numCases: 0,
                headquarterFinished: false,
                factoryFinished: false,
                factsSeen: [-1],
                healthUpSeen: [-1],
                healthDownSeen: [-1],
                marketShareUpSeen: [-1],
                marketShareDownSeen: [-1],
                factsIndex: -1,
                healthUpIndex: -1,
                healthDownIndex: -1,
                marketShareUpIndex: -1,
                marketShareDownIndex: -1,
                currentCourtCases: [0],
                isFirstMap: true,
                isFirstHQ: true,
                isFirstFactory: true,
                isFirstCourt: true,
                unlocked: Array(18).fill(false),
                itemPurchased: Array(18).fill(false),
                isHealthDown: false,
                isFactoryPurchased: false,
                isHQPurchased: false,
                factoryPurchased: Array(9).fill(false),
            },
            mapOpacity: Array(9).fill(0),

        });
        this.setGameState=this.setGameState.bind(this);
        this.getGameState=this.getGameState.bind(this);
        this.nextDay=this.nextDay.bind(this);
    }
     
    setGameState(key, value) {
        let copy = this.state.gameState;
        copy[key] = value;
        this.setState({gameState: copy});
    }

    getGameState(key) {
        return this.state.gameState[key];
    }
    nextDay() {

        this.setGameState("marketShareUpIndex", -1);
        this.setGameState("marketShareDownIndex", -1);
        this.setGameState("healthUpIndex", -1);
        this.setGameState("healthDownIndex", -1);

        if ((this.state.gameState["headquarterFinished"] && this.state.gameState["factoryFinished"])) {

            let newMapOpacity = this.state.mapOpacity;
            let marketShareChange = (this.state.gameState.marketShare - this.state.previousMarketShare)/100;

            console.log(marketShareChange);

            for(let i = 0; i < 9; i++) {
                let unlockState = 0.8 // Math.random();
                if(unlockState < 0.5 || this.state.gameState.factoryPurchased[i]) {
                    newMapOpacity[i] = 0.8 // (2 + 2*Math.random())*marketShareChange;
                }
            }
            this.setState ({
                mapOpacity: newMapOpacity,
            });
            console.log(this.state.mapOpacity)
            this.setGameState("isFirstTurn", false)

            if (this.state.gameState.healthUpSeen.length - 1 === gamePlayData["healthUp"].length) {
                this.setGameState("healthUpSeen", [-1]);    
           }
           if (this.state.gameState.healthDownSeen.length - 1 === gamePlayData["healthDown"].length) {
                this.setGameState("healthDownSeen", [-1]);    
           }
           if (this.state.gameState.marketShareUpSeen.length - 1 === gamePlayData["marketShareUp"].length) {
            this.setGameState("marketShareUpSeen", [-1]);    
            }
            if (this.state.gameState.marketShareDownSeen.length - 1=== gamePlayData["marketShareDown"].length) {
                    this.setGameState("marketShareDownSeen", [-1]);    
            }
           if (this.state.gameState.factsSeen.length - 1 === gamePlayData["facts"].length) {
                this.setGameState("factsSeen", [-1]);    
           } 

           var index = -1;
           if (this.state.gameState.health > this.state.previousHealth) {
                index = -1
                while (this.state.gameState.healthUpSeen.includes(index)) {
                    index = Math.floor((Math.random() * gamePlayData["healthUp"].length));
                }
                this.state.gameState.healthUpSeen.push(index);
                this.setGameState("isHealthDown", false)
           }
           else if (this.state.gameState.health <= this.state.previousHealth) {
                index = -1;
                while (this.state.gameState.healthDownSeen.includes(index)) {
                    index = Math.floor((Math.random() * gamePlayData["healthDown"].length)); 
                }
                this.state.gameState.healthDownSeen.push(index);
                this.setGameState("isHealthDown", true)
           }
           if (this.state.gameState.marketShare > this.state.previousMarketShare) {
               index = -1;
                while (this.state.gameState.marketShareUpSeen.includes(index)) {
                    index = Math.floor((Math.random() * gamePlayData["marketShareUp"].length));
                }
                this.state.gameState.marketShareUpSeen.push(index);
                this.setGameState("marketShareUpIndex", index);
            }
            else if (this.state.gameState.marketShare <= this.state.previousMarketShare) {
                index = -1;
                while (this.state.gameState.marketShareDownSeen.includes(index)) {
                    index = Math.floor((Math.random() * gamePlayData["marketShareDown"].length)); 
                }
                this.state.gameState.marketShareDownSeen.push(index);
                this.setGameState("marketShareDownIndex", index);

            }
           index = -1;
           while (this.state.gameState.factsSeen.includes(index)) {
                index = Math.floor((Math.random() * gamePlayData["facts"].length));
           }
           this.state.gameState.factsSeen.push(index);
           this.state.previousPreviousCash = this.state.previousCash;
           this.state.previousPreviousHealth = this.state.previousHealth;
           this.state.previousPreviousMarketShare = this.state.previousMarketShare;
           this.state.previousCash = this.state.gameState.cash;
           this.state.previousHealth = this.state.gameState.health;
           this.state.previousMarketShare = this.state.gameState.marketShare;

           this.setGameState("totalDeaths", this.state.gameState.totalDeaths + this.state.gameState.health)
           this.setGameState("health", this.state.gameState.health - 350);
           this.setGameState("cash", this.state.gameState.cash + 3000000*Math.pow(this.state.gameState.marketShare, 0.5));

        //    this.setGameState("marketShare", this.state.gameState.marketShare - 0.5);
           this.setGameState("marketShare", this.state.gameState.marketShare - this.state.gameState.health / 30000);
           this.setGameState("day", this.state.gameState.day + 1);
           this.setGameState("headquarterFinished", false);
           this.setGameState("factoryFinished", false);
           this.setGameState("isHQPurchased", false);
           this.setGameState("isFactoryPurchased", false);

           if (this.state.gameState["isCourtCase"]) {
            this.setGameState("marketShare", this.state.gameState.marketShare - 1.0);
            this.props.alert.show("Since you did not deal with your current court case, the court stopped the sale of your products, bringing your market share down by 1.0%.", {type: "info", timeout: 20000})
           }
        //    console.log(this.state.gameState["day"], newspaperdata.length, this.state.gameState.courtIndex)
           if (((this.state.gameState["day"] % 5) === 0) && (newspaperdata.length > (this.state.gameState.courtIndex  + 1))) {
               if (!this.state.gameState["isCourtCase"]) {
                    this.setGameState("isCourtCase", true);
                    this.setGameState("courtIndex", this.state.gameState["courtIndex"] + 1)
               } else {
                    this.setGameState("isCourtCase", true);
               }
           }

           if ((this.state.gameState.day >= 40 + 1) || this.state.gameState.marketShare >= 70) {
               this.setGameState("isGameFinished", true);   
           }
        } else {
            this.props.alert.show("You need to finish all your tasks first", {type: "error", timeout: 5000});
        }
        // console.log(this.getGameState("healthDownIndex"), this.getGameState("healthDownSeen"), this.getGameState("healthUpIndex"), this.getGameState("healthUpSeen"))
        this.state.previousCash = this.state.gameState.cash;
        this.state.previousHealth = this.state.gameState.health;
        this.state.previousMarketShare = this.state.gameState.marketShare;
    }

    render() {
        return (
            this.getGameState("isGameFinished")? 
                <GameFinished isWon={this.state.gameState.marketShare >= 70} totalDeaths={this.getGameState("totalDeaths")}>Game Finished</GameFinished> 
                :<div style={{width: "100%", height: "100%"}}>
                    {this.getGameState("isFirstMap")? <MapIntro setGameState={this.setGameState} getGameState={this.getGameState}/>: <div />}
                    <div className={this.getGameState("isFirstMap")? gamePlayStyles.mapOpac: gamePlayStyles.map}>
                    <div className={gamePlayStyles.mapPicture}>
                            <div className={gamePlayStyles.mapMain}>
                                <Image filename="map.PNG"></Image>
                            </div>
                            <div className={gamePlayStyles.mapOverlay} style={{opacity: this.state.mapOpacity[0]}}>
                                <Image filename="mapNorthwest.png"></Image>
                            </div>
                            <div className={gamePlayStyles.mapOverlay} style={{opacity: this.state.mapOpacity[1]}}>
                                <Image filename="mapEastNorthCentral.png"></Image>
                            </div>
                            <div className={gamePlayStyles.mapOverlay} style={{opacity: this.state.mapOpacity[2]}}>
                                <Image filename="mapCentral.png"></Image>
                            </div>
                            <div className={gamePlayStyles.mapOverlay} style={{opacity: this.state.mapOpacity[3]}}>
                                <Image filename="mapWest.png"></Image>
                            </div>
                            <div className={gamePlayStyles.mapOverlay} style={{opacity: this.state.mapOpacity[4]}}>
                                <Image filename="mapWestNorthCentral.png"></Image>
                            </div>
                            <div className={gamePlayStyles.mapOverlay} style={{opacity: this.state.mapOpacity[5]}}>
                                <Image filename="mapNortheast.png"></Image>
                            </div>
                            <div className={gamePlayStyles.mapOverlay} style={{opacity: this.state.mapOpacity[6]}}>
                                <Image filename="mapSouthWest.png"></Image>
                            </div>
                            <div className={gamePlayStyles.mapOverlay} style={{opacity: this.state.mapOpacity[7]}}>
                                <Image filename="mapSouth.png"></Image>
                            </div>
                            <div className={gamePlayStyles.mapOverlay} style={{opacity: this.state.mapOpacity[8]}}>
                                <Image filename="mapSouthEast.png"></Image>
                            </div>

                        </div>                    
                        {this.state.gameState.factsIndex === -1? <div></div>: 
                            <Popup open={true} onClose={() => {this.setGameState("factsIndex", -1)}}>
                                <Fact setGameState={this.setGameState} getGameState={this.getGameState} factIndex={this.state.gameState.factsIndex} />
                            </Popup>}
                        {this.state.gameState.healthUpIndex === -1? <div></div>: 
                            <Popup open={true} onClose={() => {this.setGameState("healthUpIndex", -1)}}>
                                <HealthUp setGameState={this.setGameState} getGameState={this.getGameState} healthUpIndex={this.state.gameState.healthUpIndex} currentHealth={this.state.previousHealth} previousHealth={this.state.previousPreviousHealth}/>
                            </Popup>}
                        {this.state.gameState.healthDownIndex === -1? <div></div>: 
                            <Popup open={true} onClose={() => {this.setGameState("healthDownIndex", -1)}}>
                                <HealthDown setGameState={this.setGameState} getGameState={this.getGameState} healthDownIndex={this.state.gameState.healthDownIndex} currentHealth={this.state.previousHealth} previousHealth={this.state.previousPreviousHealth}/>
                            </Popup>}
                        {this.state.gameState.marketShareUpIndex === -1? <div></div>: 
                            <Popup open={true} onClose={() => {this.setGameState("marketShareUpIndex", -1)}}>
                                <MarketShareUp setGameState={this.setGameState} getGameState={this.getGameState} marketShareUpIndex={this.state.gameState.marketShareUpIndex} currentMarketShare={this.state.previousMarketShare} previousMarketShare={this.state.previousPreviousMarketShare} nextView={this.state.gameState.isHealthDown? "healthDown": "healthUp"}/>
                            </Popup>}
                        {this.state.gameState.marketShareDownIndex === -1? <div></div>: 
                            <Popup open={true} onClose={() => {this.setGameState("marketShareDownIndex", -1)}}>
                                <MarketShareDown setGameState={this.setGameState} getGameState={this.getGameState} marketShareDownIndex={this.state.gameState.marketShareDownIndex} currentMarketShare={this.state.previousMarketShare} previousMarketShare={this.state.previousPreviousMarketShare} nextView={this.state.gameState.isHealthDown? "healthDown": "healthUp"}/>
                            </Popup>}
                        
                        <div className={gamePlayStyles.checklistContainer}>
                            <div className={gamePlayStyles.checklistTitle}>To-Do List</div>
                            {/* <br /> */}
                            <div className={this.getGameState("headquarterFinished")? gamePlayStyles.checklistFinished: gamePlayStyles.checklistNotFinished}>Headquarters</div>
                            <div className={!this.getGameState("isCourtCase")? gamePlayStyles.checklistFinished: gamePlayStyles.checklistNotFinished}>Supreme Court</div>
                            <div className={this.getGameState("factoryFinished")? gamePlayStyles.checklistFinished: gamePlayStyles.checklistNotFinished}>Factory</div>
                            <div className={gamePlayStyles.checklistTitle}>Progress</div>
                            <div>Market Share = {Math.ceil(this.getGameState("marketShare") * 100) / 100}% / 70%</div>
                            <div> Day =  {this.getGameState("day")} / 40</div>
                        </div>
                                        
                        
                        
                        <div className={gamePlayStyles.dayContainer}>
                            <div className={gamePlayStyles.quantityTitle}>Day</div>
                            <p><span className={gamePlayStyles.quantityIcon}>📅</span> <span className={gamePlayStyles.quantityWrapper}>{this.state.gameState.day}</span></p>
                        </div>
                        <div className={gamePlayStyles.profitContainer}>
                            <div className={gamePlayStyles.quantityTitle}>Cash On Hand</div>
                            <p><span className={gamePlayStyles.quantityIcon}>💵</span> <span className={gamePlayStyles.quantityWrapper}>{this.state.gameState.cash.toLocaleString()}</span></p>
                        </div>
                        <Tooltip title={`Market Share: ${this.state.gameState.marketShare}%`} subtitle="fefefe" placement="top">
                            <div className={gamePlayStyles.marketShareContainer}>
                                <p className={gamePlayStyles.quantityTitle}>Market Share</p>
                                <div className={gamePlayStyles.marketShareScore}><ProgressBar variant="success" now={this.state.gameState.marketShare} className="marketShareScore"/></div>
                            </div>
                        </Tooltip>
                        <div className={gamePlayStyles.healthContainer}>
                            <div className={gamePlayStyles.quantityTitle}>Daily Deaths</div>
                            <p><span className={gamePlayStyles.quantityIcon}>☠️</span> <span className={gamePlayStyles.quantityWrapper}>{this.state.gameState.health.toLocaleString()}</span></p>
                        </div>
                        <button className={gamePlayStyles.nextDayContainer} onClick={() => { this.nextDay();  }}>
                            <div>
                                <BsChevronRight className={gamePlayStyles.icon}></BsChevronRight>
                                Next Day
                            </div>
                        </button>
                        <button className={this.state.gameState.headquarterFinished? gamePlayStyles.headquarterLauncher: gamePlayStyles.headquarterActiveLauncher} onClick={() => this.setState({ isPaneOpenHQ: true })}>
                            <Image filename="headquarterIcon.png"></Image>
                        </button>
                        <button className={this.state.gameState.factoryFinished? gamePlayStyles.factoryLauncher: gamePlayStyles.factoryActiveLauncher} onClick={() => this.setState({ isPaneOpenFactory: true })}>
                            <Image filename="factoryIcon.png"></Image>
                        </button>
                        <button className={!this.state.gameState.isCourtCase? gamePlayStyles.courtLauncher: gamePlayStyles.courtActiveLauncher} onClick={() => this.setState({ isPaneOpenCourt: true })}>
                            <Image filename="courtIcon.png"></Image>
                        </button>
                        <Popup trigger={
                            <div>
                                <BsJustify className={gamePlayStyles.menuIcon}></BsJustify>
                            </div>}
                            modal
                            nested
                            >
                            {close => (
                                <div className={gamePlayStyles.popupWrapper}>
                                    <button className={gamePlayStyles.close} onClick={close}>
                                    &times; {/*&times = x symbol*/}
                                    </button>   
                                    <Link to="/">
                                        <div className={mainStyles.mainOption}>
                                            Exit Game
                                        </div>
                                    </Link>
                                    <a href="/game-instructions/" target="_blank">
                                        <div className={mainStyles.mainOption}>
                                            Instructions
                                        </div>
                                    </a>
                                    <a href="/resources/" target="_blank">
                                        <div className={mainStyles.mainOption}>
                                            Learn More
                                        </div>
                                    </a>
                                </div>
                            )}
                        </Popup>
                        <SlidingPane
                            from= "left"
                            isOpen={this.state.isPaneOpenHQ}
                            hideHeader={true}
                            onRequestClose={() => {
                                this.setState({ isPaneOpenHQ: false });
                            }}>
                            <div className={gamePlayStyles.sliderWrapper}>
                                <Headquarters closePane={() => { this.setState({ isPaneOpenHQ: false }); }} setGameState={this.setGameState} getGameState={this.getGameState}/>
                            </div>
                        </SlidingPane>
                        <SlidingPane
                            from="right"
                            isOpen={this.state.isPaneOpenFactory}
                            hideHeader={true}
                            onRequestClose={() => {
                                this.setState({ isPaneOpenFactory: false });
                            }}>
                            <div className={gamePlayStyles.sliderWrapper}>
                                <Factory closePane={() => { this.setState({ isPaneOpenFactory: false }); }}setGameState={this.setGameState} getGameState={this.getGameState}/>
                            </div>
                        </SlidingPane>
                        <SlidingPane
                            from= "right"
                            isOpen={this.state.isPaneOpenCourt}
                            hideHeader={true}
                            onRequestClose={() => {
                                this.setState({ isPaneOpenCourt: false });
                            }}>
                            <div className={gamePlayStyles.sliderWrapper}>
                                <SupremeCourt closePane={() => { this.setState({ isPaneOpenCourt: false }); }} setGameState={this.setGameState} getGameState={this.getGameState}/>
                            </div>
                        </SlidingPane>
                    </div>
                </div>
        )
    }
}

export default withAlert()(GamePlay)