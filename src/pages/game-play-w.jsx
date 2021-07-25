import React from "react"
import GamePlay from "../components/game-play"
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'



const options = {
    position: positions.TOP_RIGHT,
    timeout: 2500,
    offset: '30px',
    transition: transitions.FADE
  }

export default class GamePlayWrapper extends React.Component {
    render() {
        return (
                <AlertProvider template={AlertTemplate} {...options}>
                    <div>
                        <GamePlay />
                    </div>
                </AlertProvider>
            
        )
    }
}