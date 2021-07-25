import { Link } from "gatsby"
import React from "react"
import styles from "../styles/about.module.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import ImageBackground from '../components/image'
import Image from '../components/image'
import Text from "react"
import { navigate } from "gatsby";

export default function About() {
    return  <> 
                <div className = {styles.aboutBackground}>
                    <ImageBackground filename="about_background.png"> </ImageBackground>
                </div>

                <div className={styles.aboutTitle}>
                    ABOUT
                </div>

                <div className={styles.buttonWrapper}>
                      <button
                        className={styles.buttonBack}
                        onClick={() => navigate(-1)}
                      > Back 
                      </button>
                </div>
                
                <div className={styles.aboutText}>
                    This game was created for the Bay Area Community Resources by De Anza's Competitive Programming Club. It serves as an educational tool for people to learn about the lesser-known practices of the tobacco industry. 
                    <br/><br/><br/><br/>
                    Email: <a target="_blank" href="mailto:api-chat@bacr.org">
                    api-chat@bacr.org
                    </a>
                    <br/><br/>
                    <a target="_blank" href="https://bacr.org/">
                        Bay Area Community Resources
                    </a>
                    <br/><br/>
                    <a target="_blank" href="https://www.instagram.com/bacr_api_chat/?hl=en">
                        Instagram
                    </a> 
                    <br/><br/>
                    <a target="_blank" href="https://www.facebook.com/APICHATsmokefree">
                        Facebook
                    </a>
                    <br/><br/><br/><br/>
                    If you have any suggestions/feedback for the game, please fill out the following form: <a target="_blank" href="https://forms.gle/kNP4WX2xoydtnzgc7">Feedback Form </a>
                </div>
            </>
}


/*
class About extends React.Component {
    constructor(props) {
        super(props);
        this.setGameState=this.setGameState.bind(this);
        this.getGameState=this.getGameState.bind(this);
    }

    setGameState(key, value) {
        let copy = this.state.gameState;
        copy[key] = value;
        this.setState({gameState: copy});
    }

    getGameState(key) {
        return this.state.gameState[key];
    }

    render() {
        return (
            <div className={styles.aboutTitle}>
                ABOUT
                <div className={styles22.enjoycss}>
                    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                    <Link to="https://bacr.org/api-chat">
                        BACR
                    </Link>
                </div>
            </div>
            //                 <BsChevronRight className={gamePlayStyles.icon}></BsChevronRight>
            // <div className={gamePlayStyles.map}>
            //     <Image className={gamePlayStyles.mapPicture} filename="map.PNG"></Image>
            //     <div className={gamePlayStyles.healthContainer}>
            //         <p className={gamePlayStyles.quantityTitle}>Average Health</p>
            //         <div className={gamePlayStyles.healthScore}><ProgressBar label={`${this.state.gameState.health}%`} variant="danger" now={this.state.gameState.health} className="healthScore"/></div>
            //     </div>
            //     <button className={gamePlayStyles.nextDayContainer} onClick={() => { this.nextDay();  }}>
            //         <div>
            //             <BsChevronRight className={gamePlayStyles.icon}></BsChevronRight>
            //             Next Day
            //         </div>
            //     </button>
            //     <button className={gamePlayStyles.courtLauncher} onClick={() => this.setState({ isPaneOpenCourt: true })}>
            //         <Image filename="courtIcon.png"></Image>
            //     </button>
            // </div>
        )
    }
}

export default (About)

*/