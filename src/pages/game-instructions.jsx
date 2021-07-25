import React, { Component } from 'react';
import myVideo from "./smoke.mp4";
import instructionDesign from "../styles/instruction-style.module.css";
import Tabs from "../components/Tabs";
import "../styles/App.css";
import { Link } from "gatsby"
import ciggy from "../images/ciggy.jpg"
import Popup from 'reactjs-popup';
import { BsJustify, BsChevronRight } from "react-icons/bs";

function WelcomeVideo() {
    return (
        <section className = {instructionDesign.pageSection}>
            <video controls = {false} autoPlay muted>
                <source src = {myVideo} type="video/mp4"></source>
            </video>

            <h1 className = {instructionDesign.textBox}>
                <span className = {instructionDesign.textSpacing}> Welcome </span>
                <span className = {instructionDesign.textSpacing}> to </span>
                <span className = {instructionDesign.textSpacing}> the </span>
                <span className = {instructionDesign.textSpacing}> instructions </span>
                <span className = {instructionDesign.textSpacing}> page </span>
                <span className = {instructionDesign.textSpacing}> 
                    <marquee behavior="scroll" direction="right" scrollamount = "25">
                        <img src={ciggy} alt="Logo" className={instructionDesign.photo}/>Click to Continue
                    </marquee> 
                </span>
            </h1>

        <Popup trigger={
            <div>
                <BsJustify className={instructionDesign.menuIcon}></BsJustify>
            </div>}
            modal
            nested
        >
        {close => (
            <div className={instructionDesign.popupWrapper}>
                <button className={instructionDesign.close} onClick={close}>&times; {/*&times = x symbol*/}</button>   
                <Link to="/">
                    <div className={instructionDesign.mainOption}>
                        Home
                    </div>
                </Link>
                
                <a target="_blank" href="/resources/">
                    <div className={instructionDesign.mainOption}>
                        Learn More
                    </div>
                </a>
                </div>
            )}
        </Popup>

        </section>
    )
}

function App() {
    return (
      <div className = {instructionDesign.mainInstructions}>
        <Popup trigger={
            <div>
                <BsJustify className={instructionDesign.menuIcon}></BsJustify>
            </div>}
            modal
            nested
        >
        {close => (
            <div className={instructionDesign.popupWrapper}>
                <button className={instructionDesign.close} onClick={close}>&times; {/*&times = x symbol*/}</button>   
                
                <Link to="/">
                    <div className={instructionDesign.mainOption}>
                        Home
                    </div>
                </Link>
                
                <Link to="https://bacr.org/api-chat">
                    <div className={instructionDesign.mainOption}>
                        Learn More
                    </div>
                </Link>
                </div>
            )}
        </Popup>
       <Tabs> 
         <div label="How to Play">
            <p>
                The goal of this game is to achieve 70% of the market share by improving your tobacco product 
                to attract more users. However, do not run out of money or you will go bankrupt and lose! Also 
                be wary of the average health of the population because if it reaches 0%, the government will 
                shut you down!
            </p>
            <p>
                The game functions on a day-by-day basis. As the head of your company, you will need to 
                handle daily affairs over in your company’s headquarters, the Supreme Court, and your 
                factories. Once you deal with all three of them, you can move onto the next day. Here are more 
                specifics about each category.
            </p> 
         </div> 
         
         <div label="Headquarters"> 
            <p>
                This is where you can make executive actions for your company in order to improve your public 
                image. Be aware that each action has its own associated cost, risk, and market share value! 
                You can also find the lobbying section here, where you may donate money to lobbyists for either 
                the Senate and/or House of Representatives to improve Congress’ perception of your company.
            </p>
         </div> 

         <div label="Supreme Court"> 
            <p>
                Your company will have to deal with court cases through which people will try to take down your 
                corporation. It’s your job to hire an appropriate lawyer so that you do not lose the case! If you 
                are found guilty, then the company is sued and loses money. If you win, no action is taken 
                against your company.
            </p> 
         </div>

         <div label="Factories and Chemicals"> 
            <p>
                In order to make your tobacco product more effective, you will need to upgrade both the 
                chemicals and manufacturing factors of your product. Based on which tier scientist you hire, you 
                will be able to increase the concentration of chemicals and strengthen flavors in your company’s 
                product. You can also build new factories to increase production of your product.
            </p>
         </div>

         <div label="Tips"> 
            <p>- You can choose to pass on doing an action within a certain category, but you will need to 
                 decide when you should act or pass!</p>
            <p>- Make sure to keep some cash on hand in case you get sued.</p>
            <p>- Always read how your chemicals will affect not only your product but also the users!</p>
         </div>
        </Tabs> 
      </div>
    );
}

function InstructionScreen() {
    return (
       <App></App>
    )
}

export default class smoke extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            instructions: false,
        }
    }

    showInstructions = () => {
        this.setState({instructions: true});
    };

    render() { 
        return (
            <div onClick={() => this.showInstructions()}>
                {this.state.instructions ? <InstructionScreen></InstructionScreen> : <WelcomeVideo></WelcomeVideo>}
            </div>
        );
    }
}