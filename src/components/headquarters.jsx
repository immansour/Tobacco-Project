import React from "react"
import headquartersData from "../data/headquartersData.json"
import lobbyingStyles from "../styles/lobbying.module.css"
import headquartersStyles from "../styles/headquarters.module.css"
import "reactjs-popup/dist/index.css"
import Popup from "reactjs-popup"
import {
  BsArrowLeftRight,
  BsPlus,
  BsDash,
  BsFillXCircleFill,
  BsInfoCircleFill,
  BsInfoCircle,
  BsChevronLeft,
} from "react-icons/bs"
import Image from "../components/image"
import { withAlert } from "react-alert"
import HQIntro from "./hq-intro"
import { Link } from "gatsby"

class Headquarters extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isHeadquarters: true,
      senateDonation: 0,
      congressDonation: 0,
      totalDonated: 0,
    }
    this.setState({ congressDonation: 0 })
    this.setState({ senateDonation: 0 })

    this.makeSenateDonation = this.makeSenateDonation.bind(this)
    this.makeCongressDonation = this.makeCongressDonation.bind(this)
    this.puchaseHQ = this.puchaseHQ.bind(this)
  }

  finishHQ() {
    this.props.alert.show("You have completed the HQ round", {
      type: "success",
    })
    this.props.setGameState("headquarterFinished", true)
  }

  makeSenateDonation() {
    if (this.state.senateDonation) {
      if (this.state.totalDonated >= 5000000) {
        this.props.alert.show(
          "You have already reached the donation limit for today (which is $5,000,000)",
          { type: "error" }
        )
        return
      }
      if (this.state.senateDonation > 0) {
        if (this.props.getGameState("cash") >= this.state.senateDonation) {
          this.props.setGameState(
            "marketShare",
            this.props.getGameState("marketShare") +
              0.0000005 * this.state.senateDonation
          )
          this.props.setGameState(
            "cash",
            this.props.getGameState("cash") - this.state.senateDonation
          )
          this.setState({
            totalDonated: this.state.totalDonated + this.state.senateDonation,
          })

          this.props.alert.show("Your donation has been made", {
            type: "success",
          })
          this.finishHQ()
        } else {
          this.props.alert.show(
            "You do not have enough money for this donation",
            { type: "error" }
          )
        }
      }
    }
  }

  makeCongressDonation() {
    if (this.state.congressDonation) {
      if (this.state.totalDonated >= 5000000) {
        this.props.alert.show(
          "You have already reached the donation limit for today (which is $5,000,000)",
          { type: "error" }
        )
        return
      }
      if (this.state.congressDonation > 0) {
        if (this.props.getGameState("cash") >= this.state.congressDonation) {
          this.props.setGameState(
            "marketShare",
            this.props.getGameState("marketShare") +
              0.0000005 * this.state.congressDonation
          )
          this.props.setGameState(
            "cash",
            this.props.getGameState("cash") - this.state.congressDonation
          )
          this.setState({
            totalDonated: this.state.totalDonated + this.state.congressDonation,
          })
          this.props.alert.show("Your donation has been made", {
            type: "success",
          })
          this.finishHQ()
        } else {
          this.props.alert.show(
            "You do not have enough money for this donation",
            { type: "error" }
          )
        }
      }
    }
  }

  puchaseHQ(cost, death, marketShare, close) {
    if (this.props.getGameState("cash") >= cost) {
      if (this.props.getGameState("isHQPurchased")) {
        this.props.alert.show(
          "You can only purchase one option from Headquarters each day.",
          { type: "error" }
        )
        return
      }
      this.props.setGameState("cash", this.props.getGameState("cash") - cost)
      this.props.setGameState(
        "health",
        this.props.getGameState("health") + death
      )
      this.props.setGameState(
        "marketShare",
        this.props.getGameState("marketShare") + marketShare
      )
      this.props.alert.show("Your purchase has been made", { type: "success" })
      close()
      this.finishHQ()
      this.props.setGameState("isHQPurchased", true)
    } else {
      this.props.alert.show(
        "You do not have enough money to purchase this option",
        { type: "error" }
      )
      close()
    }
  }

  render() {
    return (
      <div>
        {this.props.getGameState("isFirstHQ") ? (
          <HQIntro
            setGameState={this.props.setGameState}
            getGameState={this.props.getGameState}
          />
        ) : (
          <div />
        )}
        <div
          className={
            this.props.getGameState("isFirstHQ")
              ? headquartersStyles.opac
              : headquartersStyles.nonOpac
          }
        >
          {this.state.isHeadquarters ? (
            <div className={headquartersStyles.background}>
              <button
                className={headquartersStyles.backToMapButton}
                onClick={this.props.closePane}
              >
                <BsChevronLeft /> Back To Map
              </button>
              <h1 className={headquartersStyles.title}>
                Headquarters
                <Popup
                  trigger={
                    <button className={headquartersStyles.infoButton}>
                      <BsInfoCircleFill />
                    </button>
                  }
                  modal
                  nested
                >
                  {close => (
                    <div style={{ padding: "20px", fontSize: "12px" }}>
                      <button
                        className={headquartersStyles.close}
                        onClick={close}
                      >
                        &times;
                      </button>
                      The options shown are just some of the ways tobacco
                      companies use to gain an advantage. Oftentimes, these
                      practices are morally unethical, and sometimes illegal.
                      For example, in 2015, the BBC uncovered documents of
                      British American Tobacco (BAT) bribing officials in
                      Rwanda, Burundi and the Comoros Islands in relation to the
                      WHO Framework Convention on Tobacco Control.<sup>1</sup>{" "}
                      Tobacco's influence also extends to sports. In Formula 1,
                      tobacco companies have spent $4.5 billion over the decades
                      ($115 million in 2020) to advertise their brands and
                      products.<sup>2</sup> Nowadays, they advertise in more
                      discreet ways often without mentioning any products, only
                      branding/initiatives (e.g. "A Better Tomorrow" or "Mission
                      Winnow"). Another tactic used by tobacco companies are
                      denigrating campaigns against anti-tobacco. One example of
                      these initiatives was Project Sunrise by PMI, which aimed
                      to "divide and conquer" anti-tobacco groups and
                      intitatives (antis). It was a long term game and involved
                      pitting antis against each other, decreasing their
                      funding, and portraying them as extremists.<sup>3</sup>{" "}
                      Some governments have enacted high minimum prices for
                      tobacco productsto discourage people from buying them.
                      Over the years, tobacco companies have lobbied these
                      governments to decrease or eliminate these laws that
                      helped protect consumers.<sup>4</sup> Another strategy
                      tobacco companies use is targetting low-income
                      neighborhoods. Researches have found that there is a much
                      higher density of tobacco retailers in these areas.
                      <sup>5</sup> These communities often have the least access
                      to resources and the least information about the hazards
                      of tobacco. Often, tobacco companies will also use mail-in
                      coupons or discount coupons, as well as free cigarettes
                      and coupons with food stamps to further appeal to this
                      demographic.<sup>5</sup> <sup>6</sup> They also advertise
                      menthol cigarettes and products more heavily in Black
                      communities.<sup>7</sup> Menthol cigarettes suppress the
                      cough reflex, which makes it even more addictive to some.
                      <br />
                      <br />
                      <sup>1</sup>{" "}
                      <Link to="https://www.bbc.com/news/business-34944702">
                        {" "}
                        https://www.bbc.com/news/business-34944702{" "}
                      </Link>{" "}
                      <br />
                      <sup>2</sup>{" "}
                      <Link to="https://exposetobacco.org/wp-content/uploads/Tobacco-Sponsorship-in-Formula-One.pdf?utm_source=exposetobacco&utm_medium=landingpage&utm_campaign=f1-driving-addiction">
                        {" "}
                        https://exposetobacco.org/wp-content/uploads/Tobacco-Sponsorship-in-Formula-One.pdf?utm_source=exposetobacco&utm_medium=landingpage&utm_campaign=f1-driving-addiction{" "}
                      </Link>{" "}
                      <br />
                      <sup>3</sup> summary with references:{" "}
                      <Link to="https://tobaccotactics.org/wiki/project-sunrise/">
                        {" "}
                        https://tobaccotactics.org/wiki/project-sunrise/
                      </Link>{" "}
                      <br />
                      <sup>4</sup>{" "}
                      <Link to="https://escholarship.org/content/qt7wv479vp/qt7wv479vp.pdf?t=q56ias">
                        {" "}
                        https://escholarship.org/content/qt7wv479vp/qt7wv479vp.pdf?t=q56ias
                      </Link>{" "}
                      <br />
                      <sup>5</sup> summary with references:{" "}
                      <Link to="https://www.cdc.gov/tobacco/disparities/low-ses/index.htm">
                        {" "}
                        https://www.cdc.gov/tobacco/disparities/low-ses/index.htm
                      </Link>{" "}
                      <br />
                      <sup>6</sup> summary with links:{" "}
                      <Link to="https://truthinitiative.org/research-resources/targeted-communities/tobacco-social-justice-issue-low-income-communities">
                        {" "}
                        https://truthinitiative.org/research-resources/targeted-communities/tobacco-social-justice-issue-low-income-communities
                      </Link>{" "}
                      <br />
                      <sup>7</sup> article with study link:{" "}
                      <Link to="https://sph.unc.edu/sph-news/study-finds-menthol-cigarette-marketing-targets-african-americans/">
                        {" "}
                        https://sph.unc.edu/sph-news/study-finds-menthol-cigarette-marketing-targets-african-americans/
                      </Link>{" "}
                      <br />
                    </div>
                  )}
                </Popup>
              </h1>

              <div className={headquartersStyles.buttonChoiceWrapper}>
                <button
                  className={headquartersStyles.switchButton}
                  onClick={() => {
                    this.setState({ isHeadquarters: false })
                  }}
                >
                  <BsArrowLeftRight />
                  <span> </span>
                  Lobbying
                </button>

                <button
                  className={headquartersStyles.finishButton}
                  onClick={() => {
                    this.finishHQ()
                    this.props.closePane()
                  }}
                >
                  <BsFillXCircleFill />
                  <span> </span>
                  Pass
                </button>
              </div>

              {headquartersData
                .map(a => ({ sort: Math.random(), value: a }))
                .sort((a, b) => a.sort - b.sort)
                .map(a => a.value)
                .map((option, index) => (
                  <Popup
                    trigger={
                      <div className={headquartersStyles.buttonWrapper}>
                        <button className={headquartersStyles.optionContainer}>
                          <p className={headquartersStyles.optionTitle}>
                            {option.name}
                          </p>
                          <p className={headquartersStyles.shortDescription}>
                            {option.shortDescription}
                          </p>
                          <p> </p>
                          <div className={headquartersStyles.statsContainer}>
                            <div className={headquartersStyles.columnStats}>
                              <div className={headquartersStyles.optionCost}>
                                Cost
                              </div>
                              <div className={headquartersStyles.optionCost}>
                                {option.costRating}
                              </div>
                            </div>
                            <div className={headquartersStyles.columnStats}>
                              <div className={headquartersStyles.optionRisk}>
                                Death Increase
                              </div>
                              <div className={headquartersStyles.optionRisk}>
                                {option.riskRating}
                              </div>
                            </div>
                            <div className={headquartersStyles.columnStats}>
                              <div
                                className={
                                  headquartersStyles.optionHealthEffects
                                }
                              >
                                Market Share
                              </div>
                              <div
                                className={
                                  headquartersStyles.optionHealthEffects
                                }
                              >
                                {option.marketShareRating}
                              </div>
                            </div>
                          </div>
                        </button>
                      </div>
                    }
                    modal
                    nested
                  >
                    {close => (
                      <div className={headquartersStyles.popupWrapper}>
                        <button
                          className={headquartersStyles.close}
                          onClick={close}
                        >
                          &times; {/*&times = x symbol*/}
                        </button>
                        <p className={headquartersStyles.optionTitle}>
                          {option.name}
                        </p>
                        <div className={headquartersStyles.popupContentWrapper}>
                          <div className={headquartersStyles.shortDescription}>
                            {option.longDescription}
                          </div>
                        </div>
                        <p> </p>
                        <div className={headquartersStyles.statsContainer}>
                          <p className={headquartersStyles.optionCost}>
                            Cost: ${option.cost.toLocaleString()}
                          </p>
                          <p className={headquartersStyles.optionRisk}>
                            Death Increase: {500 * option.risk}
                          </p>
                          <p className={headquartersStyles.optionHealthEffects}>
                            Market Share: {option.marketShare}%
                          </p>
                        </div>
                        <div className={headquartersStyles.buttonWrapper}>
                          <button
                            className={headquartersStyles.buttonRed}
                            onClick={close}
                          >
                            {" "}
                            Cancel{" "}
                          </button>
                          {/*<button onClick={close}>
                                              Cancel
                                          </button>*/}
                          <button
                            className={headquartersStyles.buttonGreen}
                            onClick={() => {
                              this.puchaseHQ(
                                option.cost,
                                option.risk * 500,
                                option.marketShare,
                                close
                              )
                            }}
                          >
                            {" "}
                            Purchase{" "}
                          </button>
                          {/*<button onClick={() => {}}>
                                              Purchase
                                          </button>*/}
                        </div>
                      </div>
                    )}
                  </Popup>
                ))}
            </div>
          ) : (
            <div className={lobbyingStyles.background}>
              <button
                  className={headquartersStyles.backToMapButtonLobbying}
                  onClick={this.props.closePane}
                >
                  <BsChevronLeft /> Back To Map
                </button>
                <h1 className={lobbyingStyles.title}>
                
                Lobbying
                <Popup
                  trigger={
                    <button className={headquartersStyles.infoButtonL}>
                      <BsInfoCircle />
                    </button>
                  }
                  modal
                  nested
                >
                  {close => (
                    <div style={{ padding: "16vh", fontSize: "12px" }}>
                      <button
                        className={headquartersStyles.close}
                        onClick={close}
                      >
                        &times;
                      </button>
                      Another important tool that is utilized is lobbying. By
                      using lobbyists, tobacco companies can influence laws
                      directly by making campaign contributions to lawmakers or
                      indirectly via "independent" groups.<sup>1</sup> According
                      to the Center for Responsive Politics, this equaled
                      roughly $28 million was spent on tobacco lobbying in 2019.
                      <sup>2</sup> In some cases, tobacco companies often use
                      "revolving doors". In exchange for passing favorable laws,
                      politicians can expect to land a high-paying job or even
                      become lobbyists themselves in these same companies once
                      they leave office.
                      <sup>3</sup> <sup>4</sup>
                      <br />
                      <br />
                      <sup>1</sup> summary with references:{" "}
                      <Link to="https://tobaccotactics.org/wiki/Lobbying-Decision-Makers/">
                        {" "}
                        https://tobaccotactics.org/wiki/Lobbying-Decision-Makers/{" "}
                      </Link>{" "}
                      <br />
                      <sup>2</sup> statistics:{" "}
                      <Link to="https://www.opensecrets.org/federal-lobbying/industries/summary?cycle=2019&id=A02">
                        {" "}
                        https://www.opensecrets.org/federal-lobbying/industries/summary?cycle=2019&id=A02{" "}
                      </Link>{" "}
                      <br />
                      <sup>3</sup> explanation with references:{" "}
                      <Link to="https://tobaccotactics.org/wiki/revolving-door/">
                        {" "}
                        https://tobaccotactics.org/wiki/revolving-door/{" "}
                      </Link>{" "}
                      <br />
                      <sup>4</sup> examples:{" "}
                      <Link to="https://tobaccotactics.org/topics/revolving-door/">
                        {" "}
                        https://tobaccotactics.org/topics/revolving-door/{" "}
                      </Link>{" "}
                      <br />
                    </div>
                  )}
                </Popup>
              </h1>
              <div className={headquartersStyles.buttonChoiceWrapper}>
                <button
                  className={lobbyingStyles.switchButton}
                  onClick={() => {
                    this.setState({ isHeadquarters: true })
                  }}
                >
                  <BsArrowLeftRight />
                  <span> </span>
                  Headquarters
                </button>
                <button
                  className={headquartersStyles.finishButtonL}
                  onClick={() => {
                    this.finishHQ()
                    this.props.closePane()
                  }}
                >
                  <BsFillXCircleFill />
                  <span> </span>
                  Pass
                </button>
              </div>
              {
                <div className={lobbyingStyles.lobbyingWrapper}>
                  <div className={lobbyingStyles.repContainer}>
                    <Image
                      className={lobbyingStyles.congressWrapper}
                      filename="congressPeople.png"
                    />
                    <p className={lobbyingStyles.govTitle}>Senate Lobbyists</p>
                    <div className={lobbyingStyles.purchaseWrapper}>
                      <button
                        className={lobbyingStyles.xContainer}
                        onClick={() => {
                          this.setState({
                            senateDonation:
                              this.state.senateDonation &&
                              this.state.senateDonation >= 500000
                                ? this.state.senateDonation - 500000
                                : 0,
                          })
                        }}
                      >
                        <BsDash className={lobbyingStyles.x} />
                      </button>
                      <div className={lobbyingStyles.moneyWrapper}>
                        ${this.state.senateDonation.toLocaleString()}
                      </div>
                      <button
                        className={lobbyingStyles.plusContainer}
                        onClick={() => {
                          this.setState({
                            senateDonation: this.state.senateDonation
                              ? this.state.senateDonation +
                                  this.state.totalDonated >=
                                5000000
                                ? this.state.senateDonation
                                : this.state.senateDonation + 500000
                              : 500000,
                          })
                        }}
                      >
                        <BsPlus className={lobbyingStyles.plus} />
                      </button>
                    </div>
                    <button
                      className={lobbyingStyles.updateContainer}
                      onClick={this.makeSenateDonation}
                    >
                      Make Donation
                    </button>
                  </div>
                  <div className={lobbyingStyles.repContainer}>
                    <Image
                      className={lobbyingStyles.congressWrapper}
                      filename="senatePeople.png"
                    />
                    <p className={lobbyingStyles.govTitle}>
                      House of Rep. Lobbyists
                    </p>
                    <div className={lobbyingStyles.purchaseWrapper}>
                      <button
                        className={lobbyingStyles.xContainer}
                        onClick={() => {
                          this.setState({
                            congressDonation:
                              this.state.congressDonation &&
                              this.state.congressDonation >= 500000
                                ? this.state.congressDonation - 500000
                                : 0,
                          })
                        }}
                      >
                        <BsDash className={lobbyingStyles.x} />
                      </button>
                      <div className={lobbyingStyles.moneyWrapper}>
                        ${this.state.congressDonation.toLocaleString()}
                      </div>
                      <button
                        className={lobbyingStyles.plusContainer}
                        onClick={() => {
                          this.setState({
                            congressDonation: this.state.congressDonation
                              ? this.state.congressDonation +
                                  this.state.totalDonated >=
                                5000000
                                ? this.state.congressDonation
                                : this.state.congressDonation + 500000
                              : 500000,
                          })
                        }}
                      >
                        <BsPlus className={lobbyingStyles.plus} />
                      </button>
                    </div>
                    <button
                      className={lobbyingStyles.updateContainer}
                      onClick={this.makeCongressDonation}
                    >
                      Make Donation
                    </button>
                  </div>
                </div>
              }
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default withAlert()(Headquarters)
