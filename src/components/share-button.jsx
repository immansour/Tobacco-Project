import React from "react"
import mainStyles from "../styles/main.module.css"
import { Menu, MenuItem } from "@material-ui/core"
import {
    FacebookShareButton,
    FacebookIcon,
    LinkedinShareButton,
    LinkedinIcon,
    RedditShareButton,
    RedditIcon,
    TumblrShareButton,
    TumblrIcon,
    TwitterShareButton,
    TwitterIcon
  } from "react-share";


export default class ShareButton extends React.Component {
    constructor(props) {
        super()
        this.state = {
          width: 0,
          height: 0,
          anchorEl: null,
          setAnchorEl: null,
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleClose = this.handleClose.bind(this)
    }

    handleClick(event) {
        this.state.ancherEl
            ? this.setState({ anchorEl: null })
            : this.setState({ anchorEl: event.currentTarget })
    }

    handleClose() {
        this.setState({ anchorEl: null })
    }

    render() {
        return (
            <div>
                <button className={mainStyles.shareButton} onClick={this.handleClick}>
                    Share
                </button>
                <Menu
                    anchorEl={this.state.anchorEl}
                    keepMounted
                    open={Boolean(this.state.anchorEl)}
                    onClose={this.handleClose}
                >
                <MenuItem >
                    <FacebookShareButton
                        url={"https://hungry-curran-115f26.netlify.app/"}
                        quote={"The Tobacco Pandemic"}
                    >
                        <FacebookIcon size={32} round />
                    </FacebookShareButton>
                </MenuItem>
                <MenuItem >
                    <TwitterShareButton
                        url={"https://hungry-curran-115f26.netlify.app/"}
                        quote={"The Tobacco Pandemic"}
                    >
                        <TwitterIcon size={32} round />
                    </TwitterShareButton>
                </MenuItem>
                <MenuItem >
                    <LinkedinShareButton
                        url={"https://hungry-curran-115f26.netlify.app/"}
                        quote={"The Tobacco Pandemic"}
                    >
                        <LinkedinIcon size={32} round />
                    </LinkedinShareButton>
                </MenuItem>
                <MenuItem >
                    <RedditShareButton
                        url={"https://hungry-curran-115f26.netlify.app/"}
                        quote={"The Tobacco Pandemic"}
                    >
                        <RedditIcon size={32} round />
                    </RedditShareButton>
                </MenuItem>
                <MenuItem >
                    <TumblrShareButton
                        url={"https://hungry-curran-115f26.netlify.app/"}
                        quote={"The Tobacco Pandemic"}
                    >
                        <TumblrIcon size={32} round />
                    </TumblrShareButton>
                </MenuItem>
            </Menu>
          </div>
            
        ) 
    }
}