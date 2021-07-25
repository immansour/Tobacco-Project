import { Link } from "gatsby"
import React from "react"
import styles from "../styles/about.module.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import ImageBackground from '../components/image'
import { navigate } from "gatsby";

export default function Resources() {
    return  <>
                
                <div className = {styles.aboutBackground}>
                    <ImageBackground filename="about_background.png"> </ImageBackground>
                </div>

                <div className={styles.aboutTitle}>
                    RESOURCES
                </div>

                <div className={styles.buttonWrapper}>
                      <button
                        className={styles.buttonBack}
                        onClick={() => navigate(-1)}
                      > Back 
                      </button>
                </div>
                
                <div className={styles.aboutText}>
                    <Link to="https://www.instagram.com/bacr_api_chat/">
                        API-CHAT Instagram
                    </Link>
                    <br/><br/>
                    Help:
                    <br/><br/>
                    <Link to="https://www.nobutts.org">
                        California Smokers' Helpline
                    </Link>
                    <br/><br/>
                    <Link to="https://www.novapes.org/">
                        California Smokers' Helpline (Vaping)
                    </Link>
                    <br/><br/>
                    <Link to="https://www.nobutts.org">
                        California Smokers' Helpline
                    </Link>
                    <br/><br/><br/>
                    Educational: 
                    <br/><br/>
                    <Link to="https://tobaccotactics.org/">
                        Tobacco Tactics and Strategy
                    </Link>: Comprehensive research and articles by the University of Bath detailing the different strategies and plays of Big Tobacco, including leaked documents, and past court cases.
                    <br/><br/>
                    <Link to="https://www.thetruth.com/">
                        Truth®
                    </Link>: largest national educational campaign for youth, also exposes Big Tobacco's practices
                    <br/><br/>
                    <Link to="https://truthinitiative.org/what-we-do/youth-smoking-prevention-education/">
                        Youth smoking prevention and education
                    </Link> 
                    <br/><br/>
                    <Link to="https://therealcost.betobaccofree.hhs.gov/">
                        The Real Cost
                    </Link>: informational campaign by the US Food and Drug Adminstration 
                    
                </div>
            </>
}