import { Link } from "gatsby"
import React from "react"
import "../styles/global.css"
import mainStyles from "../styles/main.module.css"
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import ShareButton from "../components/share-button"

const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE
}

export default function Home() {
  return (
    <div className={mainStyles.pageWrapper}>
        <AlertProvider template={AlertTemplate} {...options}>
              <div className={mainStyles.gameTitle}>
                The Tobacco Pandemic
              </div>
              <Link to="/start-game/">
                <div className={mainStyles.mainOption}>
                  Start Game
                </div>
              </Link>
            
              <Link to="/game-instructions/">
                <div className={mainStyles.mainOption}>
                  Instructions
                </div>
              </Link>
            
              <Link to="/resources/">
                <div className={mainStyles.mainOption}>
                  Resources
                </div>
              </Link>

              <Link to="/about/">
                <div className={mainStyles.mainOption}>
                  About
                </div>
              </Link>
              <ShareButton />

          </AlertProvider>
          </div>
          )
}