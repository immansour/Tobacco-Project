import React from "react"
import newspaperstyles from "../styles/newspaper.module.css";
import newspaperdata from "../Data/newspaperData.json"



export default class Headquarters extends React.Component {
    render() {
        return (
            <a href = "#" className = {newspaperstyles.nextbutton}>Next</a>
        )
    }
}