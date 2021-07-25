import React, { useState } from "react"
import newspaperstyles from "../styles/newspaper.module.css"
import newspaperdata from "../data/newspaperData.json"
import Lawyer from "./lawyer.jsx"
import NoSue from "./nosue.jsx"
import CourtIntro from "./court-intro"
import { BsInfoCircleFill, BsChevronLeft } from "react-icons/bs"
import Popup from "reactjs-popup"



export default function SupremeCourt(props) {
  const [state, setState] = useState({
    isPaneOpenLawyer: false,
  })

  let isSue = props.getGameState("isCourtCase");
  let courtIndex = props.getGameState("courtIndex");

  return (<div>
     {props.getGameState("isFirstCourt")? <CourtIntro setGameState={props.setGameState} getGameState={props.getGameState} /> : <div />}
    <div className={props.getGameState("isFirstCourt")? newspaperstyles.opac: newspaperstyles.nonOpac}>{(!isSue? <NoSue closePane={props.closePane}/>: state.isPaneOpenLawyer ? (

    <Lawyer closePane={props.closePane} getGameState={props.getGameState} setGameState={props.setGameState}/>
  ) : (
    <div>
      <button
        className={newspaperstyles.nextbutton}
        onClick={() => setState({ isPaneOpenLawyer: true })}
      >
        All Done? Select a Lawyer
      </button>
      <div>
 <button 
      onClick={()=> window.open(newspaperdata[courtIndex].Link, "_blank")} className={newspaperstyles.readmore}>
        Click here to read the official ruling
        </button>
      </div>
      <button
            className={newspaperstyles.backToMapButton} onClick={props.closePane}>
            <BsChevronLeft /> Back To Map
      </button>

      <div className={newspaperstyles.head}>

        <div>

          <div className={newspaperstyles.weatherforecastbox}>

            <p className={newspaperstyles.optionweather}>
              Wind: 7km/h SSE; Ther: 21°C; Hum: 82%
              <Popup trigger={<button className={newspaperstyles.infoButton}>
                                                  <BsInfoCircleFill />
                                              </button>}
                                  modal
                                  nested
                                  >
                                  {close => (
                                      <div style={{padding: "20px", fontSize:"1.5vh"}}>
                                        <button className={newspaperstyles.close} onClick={close}> 
                                          &times;
                                        </button>
                                        Welcome. You have found the court section of this game.
                                        <br/><br/>


                                        The following are official and real life court cases of individuals that have lost
                                         friends and families due to the negligence and lack of responsibility from 
                                         well-known tobacco companies. Some of these court cases are on the local level,
                                          while some have gone all the way to the Supreme Court of the United States. 
                                          However, one thing that they share in common is the suffering that the victims,
                                           their families, and their families have all endured.
                                           <br/><br/>


                                        In this section you will be in charge of defending yourself in court. Start off
                                         by reading about the court case. If you want to know more about the court case
                                          click the blue button. To continue, click the green button to hire a lawyer.
                                           The better the lawyer the lower the negotiation costs and the higher chance you
                                            have of winning. However, the better the lawyer, the more expensive they will be. 

                                        Once again, although you might find this section entertaining at times, please 
                                        note that these are real people that had a name, a family, and people that cared
                                         about them. Their losses--emotionally, financially, and physically--could have 
                                         been avoided if the tobacco companies presented here were more cautious and 
                                         transparent about their marketing techniques(which you will learn about in 
                                         another section)

                                      </div>
                                  )}
                              </Popup>
            </p>

          </div>

          <header>New York Post</header>
        </div>
        <div className={newspaperstyles.subhead}>{newspaperdata[courtIndex].Date}</div>

        <div classname={newspaperstyles.collumn}>
                  <div classname={newspaperstyles.head}>
            <h1 classname={newspaperstyles.headline}>
              {newspaperdata[courtIndex].Name}
            </h1>
          </div>
         {/* { <Image classname = {newspaperstyles.paperImage} filename= {newspaperdata[courtIndex].Image}></Image> } */}

          <div className = {newspaperstyles.desc}>
            {newspaperdata[courtIndex].Description}
          </div>
        </div>
      </div>
    </div>
  ))}</div></div>)
}
