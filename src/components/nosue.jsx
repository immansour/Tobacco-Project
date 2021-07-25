import React from "react"
import newspaperstyles from "../styles/newspaper.module.css"
import Image from '../components/image'
import { BsChevronLeft } from "react-icons/bs"




export default function NoSue(props) {
  return (
    <div>
      <button
         className={newspaperstyles.noSueBackToMapButton} onClick={props.closePane}>
        <BsChevronLeft /> Back To Map
      </button>
      <div className={newspaperstyles.noSueTitle}>No Court Cases</div>
      <p style={{fontSize: "20px"}}>Nobody is suing you at the moment. As such, you are free to go. Our court analysts predict that you will be sued every five days, so you better get ready for another case soon.</p>
      <Image className={newspaperstyles.noSueBackground} filename={"noSue.png"}></Image>
    </div>
  )
}