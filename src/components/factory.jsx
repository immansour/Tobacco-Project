import React from "react"
import scienceDataJSON from "../data/scienceData.json"
import factoryData from "../data/factoryData.json"
import factoryDesign from "../styles/factory.module.css"
import hexButton from "../styles/hex-button.module.css"
import "reactjs-popup/dist/index.css"
import Popup from "reactjs-popup"
import { withAlert } from "react-alert"
import { BsFillXCircleFill, BsInfoCircle, BsChevronLeft } from "react-icons/bs"
import FactoryIntro from "./factory-intro"
import { Link } from "gatsby"
import Image from "../components/image"
import Tooltip from "@material-ui/core/Tooltip"

function FactoryButton(props) {
  return (
    <div className={hexButton.fullBox}>
      <div
        className={
          props.itemPurchased[props.itemIndex]
            ? hexButton.buttonP
            : hexButton.button
        }
      >
        <svg
          // minWidth="80%"
          // maxWidth="80vh"
          height="21vh"
          strokeWidth="1%"
          viewBox="-5 -5 130 130"
          preserveAspectRatio="none"
        >
          <a onClick={props.onClick}>
            <path
              d="M 30 0
                                L 90 0
                                L 120 60
                                L 90 120
                                L 30 120
                                L 0 60
                                Z"
              fill={props.itemPurchased[props.itemIndex] ? "red" : props.color}
              stroke={props.itemPurchased[props.itemIndex] ? "red" : "white"}
            />
            <text
              fontSize="9"
              x="60"
              y="55"
              fill="#FFFFFF"
              textAnchor="middle"
              alignmentBaseline="middle"
            >
              {props.name}
            </text>
          </a>
        </svg>
      </div>
      {props.buttonState ? (
        <div></div>
      ) : (
        <div className={(hexButton.button, hexButton.locked)}>
          <Image className={hexButton.lockedImage} filename="redx.png" />
        </div>
      )}
    </div>
  )
}

class Factory extends React.Component {
  constructor(props) {
    super(props)

    let scientists = scienceDataJSON.scientists.slice(0, 3)
    let ingredients = scienceDataJSON.ingredients.slice(0, 6)
    let flavors = scienceDataJSON.flavors.slice(0, 12)
    // let ingredients = scienceDataJSON.ingredients.sort(() => 0.5 - Math.random()).slice(0, 3)
    // let flavors = scienceDataJSON.flavors.sort(() => 0.5 - Math.random()).slice(0, 3)

    let newFactoryData = scientists.concat(ingredients).concat(flavors)

    console.log("fefefe", newFactoryData)

    this.state = {
      info:
        'Welcome to the Factories and Chemicals page! Click on any of the buttons to purchase an upgrade or click "Build Factory" to build a new factory!',
      buttonColor: Array(9).fill("black"),
      pickedUpgradeIndex: -1,
      pickedFactoryIndex: -1,
      scienceData: newFactoryData,
      flavorList: 0,
      ingrList: 0,
      unlocked: this.props.getGameState("unlocked"),
      itemPurchased: this.props.getGameState("itemPurchased"),
      factoryPurchased: this.props.getGameState("factoryPurchased"),
    }
    this.purchaseUpgrade = this.purchaseUpgrade.bind(this)
    this.purchaseFactory = this.purchaseFactory.bind(this)
    this.finishFactory = this.finishFactory.bind(this)
    this.changeFlavors = this.changeFlavors.bind(this)
    this.changeIngredient = this.changeIngredient.bind(this)
  }

  handleClick(i) {
    this.state.buttonColor = Array(9).fill("black")
    this.state.buttonColor[i] = "gray"

    this.setState({
      info: this.state.scienceData[i].description,
      buttonColor: this.state.buttonColor,
      pickedUpgradeIndex: i,
      pickedFactoryIndex: -1,
    })
  }

  handleFactoryClick(i) {
    const copy = this.state
    copy.pickedFactoryIndex = i
    this.setState(copy)
  }

  purchaseFactory() {
    if (this.state.factoryPurchased[this.state.pickedFactoryIndex]) {
      this.props.alert.show("Already purchased", { type: "error" })
      return
    }
    if (this.state.pickedFactoryIndex >= 0) {
      const currentCash = this.props.getGameState("cash")
      const currentMarketShare = this.props.getGameState("marketShare")

      if (factoryData[this.state.pickedFactoryIndex].cost > currentCash) {
        this.props.alert.show(
          "You do not have enough money to purchase this option",
          { type: "error" }
        )
      } else {
        if (this.props.getGameState("isFactoryPurchased")) {
          this.props.alert.show(
            "You can only purchase one option from the Factory each day.",
            { type: "error" }
          )
          return
        }

        this.props.setGameState(
          "health",
          this.props.getGameState("health") +
            10 * factoryData[this.state.pickedFactoryIndex].risk
        )

        this.props.setGameState(
          "cash",
          currentCash - factoryData[this.state.pickedFactoryIndex].cost
        )
        this.props.setGameState(
          "marketShare",
          currentMarketShare +
            factoryData[this.state.pickedFactoryIndex].marketShare
        )

        this.props.alert.show("Your purchase has been made", {
          type: "success",
        })
        this.props.setGameState("isFactoryPurchased", true)

        this.state.factoryPurchased[this.state.pickedFactoryIndex] = true

        this.finishFactory()
      }
    }
    this.props.setGameState("factoryPurchased", this.state.factoryPurchased)
  }

  purchaseUpgrade() {
    if (this.state.itemPurchased[this.state.pickedUpgradeIndex]) {
      this.props.alert.show("Already purchased", { type: "error" })
    } else if (this.state.pickedUpgradeIndex >= 0) {
      const currentCash = this.props.getGameState("cash")
      const currentMarketShare = this.props.getGameState("marketShare")

      if (
        this.state.scienceData[this.state.pickedUpgradeIndex].cost > currentCash
      ) {
        this.props.alert.show(
          "You do not have enough money to purchase this option",
          { type: "error" }
        )
      } else {
        if (this.props.getGameState("isFactoryPurchased")) {
          this.props.alert.show(
            "You can only purchase one option from the Factory each day.",
            { type: "error" }
          )
          return
        }

        this.state.itemPurchased[this.state.pickedUpgradeIndex] = true

        this.props.setGameState(
          "health",
          this.props.getGameState("health") +
            10 * this.state.scienceData[this.state.pickedUpgradeIndex].risk
        )

        this.props.setGameState(
          "cash",
          currentCash -
            this.state.scienceData[this.state.pickedUpgradeIndex].cost
        )
        this.props.setGameState(
          "marketShare",
          currentMarketShare +
            this.state.scienceData[this.state.pickedUpgradeIndex].marketShare
        )

        this.props.alert.show("Your purchase has been made", {
          type: "success",
        })
        this.props.setGameState("isFactoryPurchased", true)
        this.finishFactory()

        if (this.state.pickedUpgradeIndex == 0) {
          this.state.unlocked[1] = true
          this.state.unlocked[3] = true
          this.state.unlocked[6] = true
          this.state.unlocked[9] = true
          this.state.unlocked[12] = true
          this.state.unlocked[15] = true
        } else if (this.state.pickedUpgradeIndex == 1) {
          this.state.unlocked[2] = true
          this.state.unlocked[4] = true
          this.state.unlocked[7] = true
          this.state.unlocked[10] = true
          this.state.unlocked[13] = true
          this.state.unlocked[16] = true
        } else if (this.state.pickedUpgradeIndex == 2) {
          this.state.unlocked[3] = true
          this.state.unlocked[5] = true
          this.state.unlocked[8] = true
          this.state.unlocked[11] = true
          this.state.unlocked[14] = true
          this.state.unlocked[17] = true
        }
      }
    }
    this.props.setGameState("unlocked", this.state.unlocked)
    this.props.setGameState("itemPurchased", this.state.itemPurchased)
  }

  finishFactory() {
    this.props.alert.show("You have completed the Factory round", {
      type: "success",
    })
    this.props.setGameState("factoryFinished", true)
  }

  renderButton(i, buttonName) {
    if (!this.state.unlocked[0]) {
      this.state.unlocked[0] = true
      this.props.setGameState("unlocked", this.state.unlocked)
    }

    return (
      <FactoryButton
        name={buttonName}
        onClick={
          this.state.itemPurchased[i] ? () => {} : () => this.handleClick(i)
        }
        color={this.state.buttonColor[i]}
        buttonState={this.state.unlocked[i]}
        itemIndex={i}
        itemPurchased={this.state.itemPurchased}
      />
    )
  }

  changeFlavors(direction) {
    let newIndex = this.state.flavorList + direction
    if (newIndex < 0 || newIndex > 2) {
      newIndex = this.state.flavorList
    }
    this.setState({
      flavorList: newIndex,
    })
  }

  changeIngredient(direction) {
    let newIndex = this.state.ingrList + direction
    if (newIndex < 0 || newIndex > 1) {
      newIndex = this.state.ingrList
    }
    this.setState({
      ingrList: newIndex,
    })
  }

  render() {
    return (
      <div className={factoryDesign.factoryPageWrapper}>
        {this.props.getGameState("isFirstFactory") ? (
          <FactoryIntro
            setGameState={this.props.setGameState}
            getGameState={this.props.getGameState}
          />
        ) : (
          <div />
        )}
        <div
          className={
            this.props.getGameState("isFirstFactory")
              ? factoryDesign.opac
              : factoryDesign.nonOpac
          }
        >
          <div className={factoryDesign.leftSection}>
            <button
              className={factoryDesign.backToMapButton}
              onClick={this.props.closePane}
            >
              <BsChevronLeft /> Back To Map
            </button>
            <h1 className={factoryDesign.title}>Factories and Chemicals</h1>
            <div className={factoryDesign.horizontalContainer}>
              <div className={factoryDesign.category}>SCIENTISTS</div>
              <div className={factoryDesign.buttonWrapper}>
                {this.state.scienceData
                  .slice(0, 3)
                  .map((option, index) =>
                    this.renderButton(index, option.name)
                  )}
              </div>
            </div>

            <div className={factoryDesign.leftArrow}>
                <button
                  className={
                    this.state.ingrList == 0
                      ? factoryDesign.flavorButtonDisabled
                      : factoryDesign.flavorButton
                  }
                  onClick={() => {
                    this.changeIngredient(-1)
                  }}
                >
                  ←
                </button>
              </div>

              <div className={factoryDesign.rightArrow}>
                <button
                  className={
                    this.state.ingrList == 1
                      ? factoryDesign.flavorButtonDisabled
                      : factoryDesign.flavorButton
                  }
                  onClick={() => {
                    this.changeIngredient(1)
                  }}
                >
                  →
                </button>
              </div>
            
            <div className={factoryDesign.horizontalContainer}>
              <div className={factoryDesign.category}>CHEMICALS</div>
              <div className={factoryDesign.buttonWrapper}>
                {this.state.scienceData
                  .slice(3 + 3 * this.state.ingrList, 6 + 3 * this.state.ingrList)
                  .map((option, index) =>
                    this.renderButton(3 + this.state.ingrList * 3 + index, option.name)
                  )}
              </div>
            </div>

            
            
              <div className={factoryDesign.leftArrow}>
                <button
                  className={
                    this.state.flavorList == 0
                      ? factoryDesign.flavorButtonDisabled
                      : factoryDesign.flavorButton
                  }
                  onClick={() => {
                    this.changeFlavors(-1)
                  }}
                >
                  ←
                </button>
              </div>

              <div className={factoryDesign.rightArrow}>
                <button
                  className={
                    this.state.flavorList == 2
                      ? factoryDesign.flavorButtonDisabled
                      : factoryDesign.flavorButton
                  }
                  onClick={() => {
                    this.changeFlavors(1)
                  }}
                >
                  →
                </button>
              </div>
            
            
            
            
            
            
            <div className={factoryDesign.horizontalContainer}>
              <div className={factoryDesign.category}>FLAVORS</div>

              


              <div className={factoryDesign.buttonWrapper}>
                {this.state.scienceData
                  .slice(
                    9 + 3 * this.state.flavorList,
                    12 + 3 * this.state.flavorList
                  )
                  .map((option, index) =>
                    this.renderButton(
                      9 + 3 * this.state.flavorList + index,
                      option.name
                    )
                  )}
              </div>
              
              
            </div>

            <Popup
              trigger={
                <div className={factoryDesign.buttonWrapper}>
                  <Tooltip
                    title={
                      "View a popup that will allow you to purchase new factories."
                    }
                    placement="top"
                  >
                    <button className={factoryDesign.buildFactoryButton}>
                      Build Factory
                    </button>
                  </Tooltip>
                </div>
              }
              modal
              nested
            >
              {close => (
                <div className={factoryDesign.factoryPopupWrapper}>
                  <div className={factoryDesign.buttonRow}>
                    <button
                      className={factoryDesign.closeButton}
                      onClick={close}
                    >
                      &times; Close
                    </button>
                    <span className={factoryDesign.factoryInfoBox}>
                      Cash on Hand: $
                      {this.props.getGameState("cash").toLocaleString()}
                    </span>
                    <span className={factoryDesign.factoryInfoBox}>
                      Cost: $
                      {this.state.pickedFactoryIndex === -1
                        ? " ???"
                        : factoryData[
                            this.state.pickedFactoryIndex
                          ].cost.toLocaleString()}
                      <br></br>
                      Market Share:{" "}
                      {this.state.pickedFactoryIndex === -1
                        ? " ???"
                        : factoryData[this.state.pickedFactoryIndex]
                            .marketShare}
                      %<br></br>
                      Death Increase:{" "}
                      {this.state.pickedFactoryIndex === -1
                        ? " ???"
                        : 10 * factoryData[this.state.pickedFactoryIndex].risk}
                    </span>
                    <button
                      className={factoryDesign.factoryBuyButton}
                      onClick={this.purchaseFactory}
                    >
                      Purchase
                    </button>
                  </div>

                  <div>
                    <div className={factoryDesign.buttonRow}>
                      {factoryData.slice(0, 3).map((option, index) => (
                        <button
                          onClick={
                            this.state.factoryPurchased[0 + index]
                              ? () => {}
                              : () => {
                                  this.handleFactoryClick(index)
                                }
                          }
                          className={
                            this.state.factoryPurchased[0 + index]
                              ? factoryDesign.factoryButtonWrapperNotPicked
                              : index === this.state.pickedFactoryIndex
                              ? factoryDesign.factoryButtonWrapperPicked
                              : factoryDesign.factoryButtonWrapper
                          }
                          style={{
                            backgroundImage: `url(${require("../images/" +
                              option.image)})`,
                          }}
                        >
                          {option.name}
                        </button>
                      ))}
                    </div>

                    <div className={factoryDesign.buttonRow}>
                      {factoryData.slice(3, 6).map((option, index) => (
                        <button
                          onClick={
                            this.state.factoryPurchased[3 + index]
                              ? () => {}
                              : () => {
                                  this.handleFactoryClick(index + 3)
                                }
                          }
                          className={
                            this.state.factoryPurchased[3 + index]
                              ? factoryDesign.factoryButtonWrapperNotPicked
                              : index + 3 === this.state.pickedFactoryIndex
                              ? factoryDesign.factoryButtonWrapperPicked
                              : factoryDesign.factoryButtonWrapper
                          }
                          style={{
                            backgroundImage: `url(${require("../images/" +
                              option.image)})`,
                          }}
                        >
                          {option.name}
                        </button>
                      ))}
                    </div>

                    <div className={factoryDesign.buttonRow}>
                      {factoryData.slice(6, 9).map((option, index) => (
                        <button
                          onClick={
                            this.state.factoryPurchased[6 + index]
                              ? () => {}
                              : () => {
                                  this.handleFactoryClick(index + 6)
                                }
                          }
                          className={
                            this.state.factoryPurchased[6 + index]
                              ? factoryDesign.factoryButtonWrapperNotPicked
                              : index + 6 === this.state.pickedFactoryIndex
                              ? factoryDesign.factoryButtonWrapperPicked
                              : factoryDesign.factoryButtonWrapper
                          }
                          style={{
                            backgroundImage: `url(${require("../images/" +
                              option.image)})`,
                          }}
                        >
                          {option.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </Popup>
          </div>

          <div>
            <div className={factoryDesign.rightSection}>
              <div className={factoryDesign.passWrapper}>
                <button
                  className={factoryDesign.finishButton}
                  onClick={() => {
                    this.finishFactory()
                    this.props.closePane()
                  }}
                >
                  <BsFillXCircleFill />
                  <span> </span>
                  Pass
                </button>
                <Popup
                  trigger={
                    <button className={factoryDesign.infoButton}>
                      <BsInfoCircle />
                    </button>
                  }
                  modal
                  nested
                >
                  {close => (
                    <div style={{ padding: "20px", fontSize: "12px" }}>
                      <button className={factoryDesign.close} onClick={close}>
                        &times;
                      </button>
                      <p>
                        Below you will find a variety of ingredients you can add
                        to your product. While nicotine is the most common
                        ingredient discussed in tobacco products due to its
                        addictiveness, there are also many other substances
                        added to increase consumption. One ingredient used by
                        many tobacco companies is menthol. This substance
                        reduces the burn often associated with inhaling tobacco
                        products which lets a consumer increase the amount of
                        tobacco they consume. Another ingredient often included
                        in tobacco is ammonia. This substance allows for a
                        larger percentage of the nicotine to be absorbed which
                        increases a product's addictiveness. All of these
                        substances are added to the product to get more people
                        addicted which in turn increases a company's revenue.
                        Besides nicotine, many other very harmful ingredients
                        are rarely talked about. Don't let the tobacco company's
                        tactics trick you!
                      </p>
                      <p>
                        <Link to="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4363846/">
                          https://www.ncbi.nlm.nih.gov/pmc/articles/PMC4363846/
                        </Link>
                      </p>
                      <p>
                        <Link to="https://www.verywellmind.com/boosting-the-impact-of-nicotine-with-ammonia-2824731">
                          https://www.verywellmind.com/boosting-the-impact-of-nicotine-with-ammonia-2824731
                        </Link>
                      </p>
                      <p>
                        <Link to="https://www.cdc.gov/tobacco/basic_information/tobacco_industry/menthol-cigarettes/index.html">
                          https://www.cdc.gov/tobacco/basic_information/tobacco_industry/menthol-cigarettes/index.html
                        </Link>
                      </p>
                    </div>
                  )}
                </Popup>
              </div>

              <div className={factoryDesign.infoBox}>{this.state.info}</div>
              <div className={factoryDesign.statsBox}>
                Death Increase:{" "}
                {this.state.pickedUpgradeIndex === -1
                  ? "???"
                  : 10 *
                    this.state.scienceData[this.state.pickedUpgradeIndex].risk}
              </div>
              <div className={factoryDesign.hexagonMarketShareBox}>
                Market Share:{" "}
                {this.state.pickedUpgradeIndex === -1
                  ? "???"
                  : this.state.scienceData[this.state.pickedUpgradeIndex]
                      .marketShare}
                %
              </div>
              <div className={factoryDesign.hexagonCostBox}>
                Cost: $
                {this.state.pickedUpgradeIndex === -1
                  ? " ???"
                  : this.state.scienceData[
                      this.state.pickedUpgradeIndex
                    ].cost.toLocaleString()}
              </div>
              <div>
                {this.state.pickedUpgradeIndex > 2 &&
                this.state.pickedUpgradeIndex < 9 ? (
                  <Popup
                    trigger={
                      <button
                        onClick={this.purchaseUpgrade}
                        className={factoryDesign.buyButton}
                      >
                        Purchase
                      </button>
                    }
                    modal
                    nested
                  >
                    {close => (
                      <div className={factoryDesign.sciencePopupWrapper}>
                        <button className={factoryDesign.close} onClick={close}>
                          &times;
                        </button>
                        <div className={factoryDesign.confirmationTitle}>
                          Are you sure you want to make this purchase?
                        </div>
                        <div className={factoryDesign.confirmationInfo}>
                          {
                            this.state.scienceData[
                              this.state.pickedUpgradeIndex
                            ].purchaseConfirmation
                          }
                        </div>
                        <div className={factoryDesign.buttonWrapper}>
                          <button
                            className={factoryDesign.yesButton}
                            onClick={() => {
                              this.purchaseUpgrade()
                              close()
                            }}
                          >
                            Yes I am sure
                          </button>
                          <button
                            className={factoryDesign.noButton}
                            onClick={close}
                          >
                            No, I have grown a conscience
                          </button>
                        </div>
                      </div>
                    )}
                  </Popup>
                ) : (
                  <button
                    onClick={this.purchaseUpgrade}
                    className={this.state.pickedUpgradeIndex == -1? factoryDesign.buyButtonOut: factoryDesign.buyButton}
                  >
                    Purchase
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  } //sadasd sdasd
}

export default withAlert()(Factory)
