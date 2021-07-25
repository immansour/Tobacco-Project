import React from "react"
import lawyerdata from "../data/lawyersData.JSON"
import lawyerstyles from "../styles/lawyers.module.css"
import 'reactjs-popup/dist/index.css';
import Popup from 'reactjs-popup';
import Image from '../components/image'
import { withAlert } from 'react-alert'
import { BsChevronLeft } from "react-icons/bs"


/*export default function Lawyer() {
    const [state, setState] = useState({
      isPaneOpenNoSue: false,
    })
  
    return state.isPaneOpenNoSue ? (
  
      <NoSue />
    ) : (*/
 class Lawyer extends React.Component {
    constructor(props) {
        super(props);
        this.state = ({
            neg_range : [this.random(3000000, 4000000), this.random(2000000, 3000000), this.random(1000000, 2000000)],
            winning_per : [this.random(25,40), this.random(45,70), this.random(75,99)],
            rate : [1000000, 2500000, 4000000],
            showPopup: false,
            isPaneOpenHQ: false,
            result: this.random(0, 100),
            sueCost: 0
        });
        this.court=this.court.bind(this);
    }
    togglePopup() {  
        this.setState({  
             showPopup: !this.state.showPopup });  
    }

    random(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
      }
     court(perc)
     {
        return (this.random(0,100) <= perc)
     }
     purchaseLawyer(value) {
        const currentCash = this.props.getGameState("cash");  

        if (value > currentCash) {
            this.props.setGameState("cash", 0);
            this.props.setGameState("marketShare", this.props.getGameState("marketShare") - 1.0)
            this.props.alert.show(`You lost all your money for buying the lawyer since the court had to pay for them (since you did not have enough money), as well as recieved a 1.0% market share reduction for not having enough money`, {type: "error", timeout: 12000});
        } else {
            this.props.setGameState("cash", currentCash -  value);

            this.props.alert.show("Your option has been purchased", {type: "success"});
        }
    }

    loseCase() {
        const currentCash = this.props.getGameState("cash");  
        if (currentCash < (100 * this.props.getGameState("health"))) {
            this.props.setGameState("cash", 0);
            this.props.setGameState("marketShare", this.props.getGameState("marketShare") - 1.0)
            this.props.alert.show(`You lost all your money for losing your court case, since the fee was greater than your net worth, as well as recieved a 1.0% market share reduction for not having enough money`, {type: "error", timeout: 12000});
            this.state.sueCost = currentCash;
        } 
        else {
            this.props.setGameState("cash", currentCash - (100 * this.props.getGameState("health")));
            this.props.alert.show(`You lost ${(100 * this.props.getGameState("health"))} dollars for losing your court case`, {type: "error"});
            this.state.sueCost = (100 * this.props.getGameState("health"));
        }
    }
    render() {
        return (
            <div className={lawyerstyles.background}>
                <button
                    className={lawyerstyles.backToMapButton} onClick={this.props.closePane}>
                    <BsChevronLeft /> Back To Map
                </button>
                
                <h1 className={lawyerstyles.title}>Select a Lawyer</h1>

                {lawyerdata.map((option, index) => (
                    <Popup trigger={<div className={lawyerstyles.buttonWrapper}>
                        <button className={lawyerstyles.optionContainer}>
                            <p className={lawyerstyles.optionTitle}>{option.name}</p>
                            <p className={lawyerstyles.shortDescription}>{option.shortDescription}</p>
                            <div className={lawyerstyles.statsContainer}>
                                <p className={lawyerstyles.optionCost}>Negotiation Range: {option.costRating}</p>
                                <p className={lawyerstyles.optionRisk}>% of winning: {option.riskRating}</p>
                                <p className={lawyerstyles.optionHealthEffects}>Cost: {option.cost.toLocaleString()}</p>
                            </div>
                        </button>
                    </div>}
                        modal
                        nested
                        >
                        {close => (
                            <div className={lawyerstyles.popupWrapper}>
                                <button className={lawyerstyles.close} onClick={close}>
                                  &times; {/*&times = x symbol*/}
                                </button>
                                <p className={lawyerstyles.optionTitle}>{option.name}</p>
                                <p className={lawyerstyles.shortDescription}>The {option.name} lawyer was able to negotiate a total of ${this.state.neg_range[index].toLocaleString()} to walk away freely, without dealing with the court </p>
                                <div className={lawyerstyles.statsContainer} >
                                    <p className={lawyerstyles.optionRiskDesc}>Your lawyer has a {this.state.winning_per[index]}% of winning, if you go to court.</p>
                                </div>
                                
                                <Popup trigger=
                                {
                                    <div className = {lawyerstyles.buttonWrapper}>
                                        <button className={lawyerstyles.buttonRed} onClick={() => {this.purchaseLawyer(this.state.rate[index]); if (this.state.winning_per[index] < this.state.result) { this.loseCase(); }}}>Go To Court </button> </div>

                                }
                                    modal
                                    nested>
                                    {
                                        lawyerClose =>
                                        (
                                            <div className = {lawyerstyles.popupLawyerWrapper}>
                                            <div>
                                                {(this.state.winning_per[index] < this.state.result) ? 
                                            <div>
                                                <Image filename= "oogway.jpg" className={lawyerstyles.lawyerImage}></Image>
                                                <p style={{fontSize:"18px"}}>Becuase you lost the case, you had to pay ${this.state.sueCost} to the plaintiff</p>    
                                            </div> 
                                            : <Image filename= "innocent.jpg" lassName={lawyerstyles.lawyerImage}></Image>}
                                            </div>

                
                    
                                            <button className={lawyerstyles.buttonRedg} onClick={() => {lawyerClose(); close(); this.props.setGameState("isCourtCase", false);}}>Go home </button>
                                            </div>
                                                                                            



                                        )
                                    }
                                </Popup>
                                <div className = {lawyerstyles.buttonWrapper}>
                                    <button className={lawyerstyles.buttonGreen} onClick={() => {this.purchaseLawyer(this.state.neg_range[index] + this.state.rate[index]); this.props.setGameState("isCourtCase", false);  }}>Accept offer </button> 
                                </div>


                            </div>
                        )}
                    </Popup>
                ))}
            </div>
        )
    }
}

export default withAlert()(Lawyer)